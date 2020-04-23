import SituacaoArquivoEnum from '../enumeration/situacao-arquivo-enum';
import { Canceler } from 'axios';

/**
 * Modelo de um Arquivo
 *
 * @author Bruno Eduardo <bruno.soares@kepha.com.br>
 * @interface Arquivo
 */
interface Arquivo {
  /**
   * ID
   */
  idArquivo: number | null;

  /**
   * Base64
   */
  dsBase64?: string;

  /**
   * Dados do arquivo
   */
  fileData?: File;

  /**
   * Nome
   */
  nmArquivo: string;

  /**
   * Situação do arquivo
   */
  stArquivo?: SituacaoArquivoEnum;

  /**
   * Porcentagem de quanto o arquivo fez upload
   */
  nrLoaded?: number;

  /**
   * Função que cancela a request de upload ou download
   */
  cancelRequest?: Canceler;
}

export default Arquivo;
