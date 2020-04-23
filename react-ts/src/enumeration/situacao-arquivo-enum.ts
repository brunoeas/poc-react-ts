/**
 * Enum de situações do arquivo
 *
 * @enum {number}
 */
enum SituacaoArquivoEnum {
  /**
   * Aguardando para fazer uplaod
   */
  AGUARDANDO_PARA_UPLOAD,

  /**
   * Fazendo upload
   */
  FAZENDO_UPLOAD,

  /**
   * Upload concluido com sucesso
   */
  UPLOAD_CONCLUIDO_SUCESSO,

  /**
   * Upload concluido com erro
   */
  UPLOAD_CONCLUIDO_ERRO,

  /**
   * O upload foi cancelado pelo usuário
   */
  UPLOAD_CANCELADO,
}

export default SituacaoArquivoEnum;
