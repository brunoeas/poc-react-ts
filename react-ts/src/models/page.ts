/**
 * Modelo de uma paginação
 *
 * @author Bruno Eduardo <bruno.soares@kepha.com.br>
 * @interface Page
 * @template T - Tipo dos dados
 */
interface Page<T> {
  /**
   * Lista com dados paginados
   */
  listData: T[];

  /**
   * Número total de dados
   */
  countTotal: number;
}

export default Page;
