/**
 * Modelo de um File/Arquivo
 *
 * @author Bruno Eduardo <bruno.soares@kepha.com.br>
 * @interface File
 */
interface File {
  /**
   * ID
   */
  idFile: number | null;

  /**
   * Base64
   */
  dsBase64: string | null;

  /**
   * Nome
   */
  nmFile: string | null;

  /**
   * Situação do arquivo: false ou null - arquivo ja salvo; true - arquivo não salvo ainda;
   */
  stFile?: boolean;
}

export default File;
