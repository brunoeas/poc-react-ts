import React, { useState, useEffect, useCallback } from 'react';
import UploadDialog from './upload-dialog';
import ArquivoModel from '../../models/arquivo';
import SituacaoArquivoEnum from '../../enumeration/situacao-arquivo-enum';
import { cloneArray } from '../../utils/utils';
import FileApi from '../../resources/file-api';

type PropsType = {
  onUploadEnd: () => void;
  filesToUpload: ArquivoModel[];
};

/**
 * Componente responsável por manipular o upload dos arquivos e a exibição do modal com os loadings
 *
 * @author Bruno Eduardo <bruno.soares@kepha.com.br>
 * @param {PropsType} props - props
 * @returns {JSX.Element}
 */
function UploadFiles(props: PropsType): JSX.Element {
  const fileApi = new FileApi();

  const [dialogIsOpen, setDialogIsOpen] = useState(false);
  const [files, setFiles] = useState<ArquivoModel[]>([]);

  /**
   * Manipula o evento de fim/conclusão do upload
   *
   * @param {*} data - Corpo da resposta recebida do upload
   * @param {number} index - Index do arquivo que esta sendo feito upload
   */
  const onUploadEnd = useCallback(
    (data: any, index: number) => {
      const auxFiles: ArquivoModel[] = cloneArray(files);
      auxFiles[index].nrLoaded = undefined;
      auxFiles[index].fileData = undefined;
      auxFiles[index].stArquivo = SituacaoArquivoEnum.UPLOAD_CONCLUIDO_SUCESSO;
      auxFiles[index].idArquivo = data.idArquivo;
      auxFiles[index].dsBase64 = data.dsBase64;
      auxFiles[index].nmArquivo = data.nmArquivo;

      setFiles(auxFiles);
    },
    [files]
  );

  /**
   * Manipula o evento de progresso do upload
   *
   * @param {*} event - Evento de progresso
   * @param {number} index - Index do arquivo que esta sendo feito upload
   * @returns {number} Número representando a porcentagem do progresso do upload
   */
  const onUploadProgress = useCallback(
    (event: any, index: number): number => {
      const percentCompleted = Math.round((event.loaded / event.total) * 100);
      const auxFiles: ArquivoModel[] = cloneArray(files);
      auxFiles[index].nrLoaded = percentCompleted;
      auxFiles[index].stArquivo = SituacaoArquivoEnum.FAZENDO_UPLOAD;
      setFiles(auxFiles);
      return percentCompleted;
    },
    [files]
  );

  /**
   * Faz o upload do arquivo passado por parâmetro com manipulação de eventos de progresso
   *
   * @param {ArquivoModel} arquivo - Arquivo que vai ser feito o upload
   * @param {number} index - Index do arquivo
   */
  const uploadFile = useCallback(
    async (arquivo: ArquivoModel, index: number) => {
      await new Promise((resolve, reject) => {
        if (!arquivo.fileData) {
          reject();
          return;
        }

        fileApi
          .saveFile({
            body: arquivo,
            onUploadProgress: (event) => {
              if (!event.lengthComputable) {
                return;
              }
              onUploadProgress(event, index);
            },
          })
          .then((res) => {
            onUploadEnd(res.data, index);
            resolve();
          })
          .catch(reject);
      });
    },
    [fileApi, onUploadEnd, onUploadProgress]
  );

  /**
   * Tratamento para um eventual erro no upload
   *
   * @param {*} err - Erro
   * @param {number} index - Index do item que deu erro
   */
  const onErrorUploading = useCallback(
    (err: any, index: number) => {
      console.error('> Ocorreu um erro ao fazer o upload: ', err);

      const auxFiles: ArquivoModel[] = cloneArray(files);
      auxFiles[index].nrLoaded = undefined;
      auxFiles[index].stArquivo = SituacaoArquivoEnum.UPLOAD_CONCLUIDO_ERRO;
      setFiles(auxFiles);
    },
    [files]
  );

  /**
   * Faz o upload dos arquivos para o servidor um por vez
   */
  const uploadAllFiles = useCallback(async () => {
    setDialogIsOpen(true);

    /**
     * Função callback do reduce que faz upload dos arquivos um por vez
     *
     * @param previousPromise - Promise anterior do reduce
     * @param currentFile - Arquivo atual do reduce
     * @param index - Index do arquivo
     */
    const reduceFunction = async (
      previousPromise: Promise<void>,
      currentFile: ArquivoModel,
      index: number
    ) => {
      return await previousPromise
        .then(async () => {
          if (currentFile.stArquivo === SituacaoArquivoEnum.UPLOAD_CONCLUIDO_ERRO) {
            return Promise.resolve();
          }

          return await uploadFile(currentFile, index);
        })
        .catch((err) => onErrorUploading(err, index));
    };

    return files.reduce(reduceFunction, Promise.resolve());
  }, [files, onErrorUploading, uploadFile]);

  useEffect(() => {
    setFiles(props.filesToUpload);

    if (files.length > 0 && !dialogIsOpen) {
      uploadAllFiles()
        .then(() => {
          props.onUploadEnd();
          setDialogIsOpen(false);
          setFiles([]);
        })
        .catch((err) => {
          console.error('> Ocorreu um erro desconhecido: ', err);
          setDialogIsOpen(false);
          setFiles([]);
        });
    }
  }, [files, dialogIsOpen, uploadAllFiles, props]);

  return (
    <UploadDialog
      files={files}
      dialogIsOpen={dialogIsOpen}
      onCloseDialog={() => setDialogIsOpen(false)}
    />
  );
}

export default UploadFiles;
