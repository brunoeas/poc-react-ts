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
   * @returns {Promise<AxiosResponse<ArquivoModel>>} - Promise com a resposta da request com o objeto do arquivo salvo
   */
  public async saveFile({
    body,
    onUploadProgress,
  }: AxiosRequestParamsType): Promise<AxiosResponse<ArquivoModel>> {
    const data = new FormData();
    data.append('file', body.fileData, body.nmArquivo);
    return axios.post(`${this.API}/${body.nmArquivo}`, data, { onUploadProgress });
  }

  /**
   * Chama o endpoint para buscar uma lista de tamanho pré definido de arquivos
   *
   * @param {AxiosRequestParamsType} - Objeto com as definições do tamanho da lista
   * @returns {Promise<AxiosResponse<ArquivoModel[]>>} - Promise com a resposta da request com a lista de arquivos
   */
  public async findPartOfFiles(
    params: AxiosRequestParamsType = { body: { firstIndex: 0, qtdMaxItens: 20 } }
  ): Promise<AxiosResponse<ArquivoModel[]>> {
    const { firstIndex, qtdMaxItens } = params.body;
    return axios.get(`${this.API}?firstIndex=${firstIndex}&qtdMaxItens=${qtdMaxItens}`);
  }
}

export default FileApi;
