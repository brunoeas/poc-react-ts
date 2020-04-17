/**
 * Clona o array passado por parâmetro
 *
 * @author Bruno Eduardo <bruno.soares@kepha.com.br>
 * @template T - Tipo do array
 * @param {T[]} [array=[]] - Array que vai ser clonado
 * @returns {T[]} Array clonado
 */
function cloneArray<T>(array: T[] = []): T[] {
  return [...array];
}

function extractFileExtension(fileName: string): string {
  const pointIndex = fileName.lastIndexOf('.');
  return pointIndex > -1 ? fileName.substring(pointIndex + 1, fileName.length) : 'doc';
}

export { cloneArray, extractFileExtension };
