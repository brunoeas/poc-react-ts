import axios, { AxiosResponse } from 'axios';
import ArquivoModel from '../models/arquivo';
import PageModel from '../models/page';

/**
 * Modelo dos parâmetros para as funções que fazem request pelo Axios
 *
 * @interface AxiosRequestParamsType
 * @template B - Tipo do body da request
 * @template P - Tipo dos parâmetros da request
 */
interface AxiosRequestParamsType<B, P> {
  body?: B;
  params?: P;
  onUploadProgress?: (e: any) => void;
  onDownloadProgress?: (e: any) => void;
}

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
   * @param {AxiosRequestParamsType<ArquivoModel, void>} - Objeto com arquivo que vai ser enviado e funções para manipular os eventos de progresso
   * @returns {Promise<AxiosResponse<ArquivoModel>>} - Promise com a resposta da request com o objeto do arquivo salvo
   */
  public async saveFile({
    body,
    onUploadProgress,
  }: AxiosRequestParamsType<ArquivoModel, void>): Promise<AxiosResponse<ArquivoModel>> {
    const data = new FormData();
    data.append('file', body?.fileData || '', body?.nmArquivo);
    return axios.post(`${this.API}/${body?.nmArquivo}`, data, { onUploadProgress });
  }

  /**
   * Chama o endpoint para buscar uma lista de tamanho pré definido de arquivos
   *
   * @param {AxiosRequestParamsType<void, { firstIndex: number, qtdMaxItens: number }>} - Objeto com as definições do tamanho da lista
   * @returns {Promise<AxiosResponse<PageModel<ArquivoModel>>>} - Promise com a resposta da request com a lista de arquivos
   */
  public async findPartOfFiles(
    params: AxiosRequestParamsType<void, { firstIndex: number; qtdMaxItens: number }>
  ): Promise<AxiosResponse<PageModel<ArquivoModel>>> {
    const { firstIndex, qtdMaxItens } = params.params || {};
    return axios.get(`${this.API}?firstIndex=${firstIndex}&qtdMaxItens=${qtdMaxItens}`);
  }

  /**
   * Chama o endpoint para deletar um arquivo pelo ID
   *
   * @param {AxiosRequestParamsType<void, { id: number }>} - Objeto com o ID que vai ser passado como parâmetro na request
   * @returns {Promise<AxiosResponse<void>>} - Promise com a resposta da request
   */
  public async deleteArquivoById(
    param: AxiosRequestParamsType<void, { id: number }>
  ): Promise<AxiosResponse<void>> {
    const { id } = param.params || {};
    return axios.delete(`${this.API}/${id}`);
  }
}

export default FileApi;
