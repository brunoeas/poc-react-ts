import axios, { AxiosResponse } from 'axios';
import ArquivoModel from '../models/arquivo';

type AxiosRequestParamsType = {
  body?: any;
  onUploadProgress?: (e: any) => void;
  onDownloadProgress?: (e: any) => void;
};

/**
 * Controlador da API de arquivos
 *
 * @author Bruno Eduardo <bruno.soares@kepha.com.br>
 * @class FileApi
 */
class FileApi {
  /**
   * URL da API
   */
  private API = 'http://localhost:2210/file';

  /**
   * Chama o endpoint para salvar um arquivo e setta as funções que manipulam os eventos de progresso
   *
   * @param {AxiosRequestParamsType} - Objeto com arquivo que vai ser enviado e funções para manipular os eventos de progresso
   * @returns {Promise<void>}
   */
  public async saveFile({
    body,
    onUploadProgress,
    onDownloadProgress,
  }: AxiosRequestParamsType): Promise<AxiosResponse<ArquivoModel>> {
    const data = new FormData();
    data.append('file', body.fileData, body.nmArquivo);
    return axios.post(`${this.API}/${body.nmArquivo}`, data, { onUploadProgress, onDownloadProgress });
  }

  /**
   * Chama o endpoint para salvar um arquivo e setta as funções que manipulam os eventos de progresso
   *
   * @param {AxiosRequestParamsType} - Objeto com arquivo que vai ser enviado e funções para manipular os eventos de progresso
   * @returns {Promise<ArquivoModel[]>}
   */
  public async findPartOfFiles({
    body: { firstIndex, qtdMaxItens },
    onUploadProgress,
    onDownloadProgress,
  }: AxiosRequestParamsType): Promise<ArquivoModel[]> {
    return axios.get(
      `${this.API}?firstIndex=${firstIndex}${qtdMaxItens ? `&qtdMaxItens=${qtdMaxItens}` : ''}`,
      { onUploadProgress, onDownloadProgress }
    );
  }
}

export default FileApi;
