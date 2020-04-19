import React, { Component } from 'react';
import { styles } from './app-styles';
import { withStyles } from '@material-ui/core/styles';
import ArquivoModel from '../../models/arquivo';
import CardFile from '../../components/card-file/card-file';
import SituacaoArquivoEnum from '../../enumeration/situacao-arquivo-enum';
import UploadFiles from '../../components/upload-files/upload-files';
import { Paper } from '@material-ui/core';
import IconUpload from '@material-ui/icons/CloudUpload';
import DropFilesModal from '../../components/drop-files-modal/drop-modal';
import FileApi from '../../resources/file-api';
import LinearProgress from '@material-ui/core/LinearProgress';

type PropsType = { classes: any };
type StateType = {
  files?: ArquivoModel[];
  filesToUpload?: ArquivoModel[];
  draggingFile?: boolean;
  loading?: boolean;
};

/**
 * Única e principal tela do App
 *
 * @author Bruno Eduardo <bruno.soares@kepha.com.br>
 * @class App
 * @extends {Component}
 */
class App extends Component<PropsType, StateType> {
  public constructor(props: PropsType) {
    super(props);
    this.safeSetState = this.safeSetState.bind(this);
    this.onAddFiles = this.onAddFiles.bind(this);
  }

  /**
   * State
   */
  public state: StateType = {
    files: [
      {
        idArquivo: 11,
        nmArquivo: 'imag-asdasdasjdaasas-da-d-asd-asd-asdasdasd-asd-asd-as-dasdsdae.jpg',
        stArquivo: 2,
      },
    ],
    filesToUpload: [],
    draggingFile: false,
    loading: true,
  };

  /**
   * Propriedade que marca se o componente está montado
   */
  private _isMounted = false;

  /**
   * API dos arquivos
   */
  private fileApi = new FileApi();

  /**
   * Referência do input de arquivos
   */
  private inputFilesRef: HTMLInputElement | null = null;

  /**
   * Marca o componente como montado
   */
  public componentDidMount() {
    this._isMounted = true;

    this.fileApi
      .findPartOfFiles()
      .then((res) => this.safeSetState({ files: res.data, loading: false }))
      .catch((err) =>
        this.safeSetState({ loading: false }, () =>
          console.log('> Ocorreu um erro ao buscar os arquivos: ', err)
        )
      );
  }

  /**
   * Marca o componente como desmontado
   */
  public componentWillUnmount() {
    this._isMounted = false;
  }

  /**
   * Faz um setState sem risco do componente estar desmontado
   *
   * @param state - Herdado do setState normal
   * @param callback - Herdado do setState normal
   */
  private safeSetState(
    state: ((prevState: Readonly<StateType>, props: Readonly<PropsType>) => any) | StateType,
    callback?: () => void
  ) {
    this._isMounted && super.setState(state, callback);
  }

  /**
   * Recebe o evento de upload de arquivos e inicia o upload para o servidor
   *
   * @param {React.DragEvent<HTMLDivElement> | React.ChangeEvent<HTMLInputElement>} e - Evento
   * @param {FileList} files - Lista de arquivos
   */
  private async onAddFiles(
    e: React.DragEvent<HTMLDivElement> | React.ChangeEvent<HTMLInputElement>,
    files: FileList | null
  ) {
    if (!files || files.length === 0) return;
    e.preventDefault();

    const auxFiles: ArquivoModel[] = Array.from(files).map((file, i) => ({
      idArquivo: null,
      nmArquivo: file.name,
      fileData: file,
      stArquivo:
        i === 0 ? SituacaoArquivoEnum.FAZENDO_UPLOAD : SituacaoArquivoEnum.AGUARDANDO_PARA_UPLOAD,
      nrLoaded: i === 0 ? 0 : undefined,
    }));

    this.safeSetState({ draggingFile: false, filesToUpload: auxFiles });
  }

  render() {
    const { classes } = this.props;

    return (
      <>
        <DropFilesModal
          show={this.state.draggingFile || false}
          onDragLeave={() => this.state.draggingFile && this.safeSetState({ draggingFile: false })}
          onDrop={(e) => this.onAddFiles(e, e.dataTransfer.files)}
        />

        {this.state.loading && <LinearProgress />}

        <div
          className={classes.main}
          onDragOver={(e) => {
            e.preventDefault();
            !this.state.draggingFile && this.safeSetState({ draggingFile: true });
          }}
        >
          <div className={classes.title}>Meu banco de arquivos</div>

          <hr className={classes.linhaSeparadora} />

          <div className={classes.container}>
            <input
              accept='*'
              className={classes.inputFile}
              multiple
              type='file'
              ref={(ref) => (this.inputFilesRef = ref)}
              onChange={(e) => this.onAddFiles(e, e.target.files)}
            />

            <Paper
              onClick={() => this.inputFilesRef && this.inputFilesRef.click()}
              elevation={8}
              className={classes.containerItemUpload}
            >
              <div className={classes.iconeItemUpload}>
                <IconUpload fontSize='inherit' color='inherit' />
              </div>

              <div className={classes.textoItemUpload}>
                Clique aqui ou arraste os arquivos para fazer o upload
              </div>
            </Paper>

            {(this.state.files || []).map((file, i) => (
              <CardFile key={i} file={file} />
            ))}
          </div>
        </div>

        <UploadFiles
          filesToUpload={this.state.filesToUpload || []}
          onUploadEnd={(uploadedFiles) =>
            this.safeSetState({
              files: uploadedFiles
                .filter((file) => file.stArquivo === SituacaoArquivoEnum.UPLOAD_CONCLUIDO_SUCESSO)
                .concat(this.state.files || []),
              filesToUpload: [],
            })
          }
        />
      </>
    );
  }
}

export default withStyles(styles)(App);
