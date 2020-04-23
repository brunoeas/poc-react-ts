import axios, { AxiosResponse, AxiosInstance, Canceler } from 'axios';
import ArquivoModel from '../models/arquivo';
import PageModel from '../models/page';

const CancelToken = axios.CancelToken;

/**
 * URL da API, hardcoded porque isso é uma POC ¯\_(ツ)_/¯
 */
const URL = 'http://localhost:2210/file';

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
  getCancelFunc?: (cancelFunc: Canceler) => void;
}

/**
 * Controlador da API de arquivos
 *
 * @author Bruno Eduardo <bruno.soares@kepha.com.br>
 * @class FileApi
 */
class FileApi {
  /**
   * Instância da API
   */
  private api: AxiosInstance;

  /**
   * Construtor padrão que cria uma instância da API
   */
  public constructor() {
    this.api = axios.create({ baseURL: URL });
  }

  /**
   * Chama o endpoint para salvar um arquivo e setta as funções que manipulam os eventos de progresso
   *
   * @param {AxiosRequestParamsType<ArquivoModel, void>} - Objeto com arquivo que vai ser enviado e funções para manipular os eventos de progresso
   * @returns {Promise<AxiosResponse<ArquivoModel>>} - Promise com a resposta da request com o objeto do arquivo salvo
   */
  public async saveFile({
    body,
    onUploadProgress,
    getCancelFunc,
  }: AxiosRequestParamsType<ArquivoModel, void>): Promise<AxiosResponse<ArquivoModel>> {
    const data = new FormData();
    data.append('file', body?.fileData || '', body?.nmArquivo);
    return this.api.post(`/${body?.nmArquivo}`, data, {
      onUploadProgress,
      cancelToken: getCancelFunc ? new CancelToken(getCancelFunc) : undefined,
    });
  }

  /**
   * Chama o endpoint para fazer o download de um arquivo pelo ID
   *
   * @param {AxiosRequestParamsType<void, { id: number }>} - Objeto com o ID do arquivo que vai ser feito o download
   * @returns {Promise<AxiosResponse<any>>} - Promise com a resposta da request com o arquivo
   */
  public async downloadFileById(
    args: AxiosRequestParamsType<void, { id: number }>
  ): Promise<AxiosResponse<any>> {
    const { params: { id } = {}, onDownloadProgress, getCancelFunc } = args;
    return this.api.get(`/${id}`, {
      onDownloadProgress,
      cancelToken: getCancelFunc ? new CancelToken(getCancelFunc) : undefined,
    });
  }

  /**
   * Chama o endpoint para buscar uma lista de tamanho pré definido de arquivos
   *
   * @param {AxiosRequestParamsType<void, { firstIndex: number, qtdMaxItens: number }>} - Objeto com as definições do tamanho da lista
   * @returns {Promise<AxiosResponse<PageModel<ArquivoModel>>>} - Promise com a resposta da request com a lista de arquivos
   */
  public async findPartOfFiles(
    args: AxiosRequestParamsType<void, { firstIndex: number; qtdMaxItens: number }>
  ): Promise<AxiosResponse<PageModel<ArquivoModel>>> {
    const { firstIndex, qtdMaxItens } = args.params || {};
    return this.api.get(`?firstIndex=${firstIndex}&qtdMaxItens=${qtdMaxItens}`);
  }

  /**
   * Chama o endpoint para deletar um arquivo pelo ID
   *
   * @param {AxiosRequestParamsType<void, { id: number }>} - Objeto com o ID que vai ser passado como parâmetro na request
   * @returns {Promise<AxiosResponse<void>>} - Promise com a resposta da request
   */
  public async deleteArquivoById(
    args: AxiosRequestParamsType<void, { id: number }>
  ): Promise<AxiosResponse<void>> {
    const { id } = args.params || {};
    return this.api.delete(`/${id}`);
  }
}

export default FileApi;
