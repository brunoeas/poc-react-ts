/**
 * Converte um File para Base64
 *
 * @author Bruno Eduardo <bruno.soares@kepha.com.br>
 * @param {File} file - File que vai ser convertido
 * @returns {(Promise<string | null>)}
 */
async function fileToBase64(file: File): Promise<string | null> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => (typeof reader.result === 'string' ? resolve(reader.result) : reject(null));
    reader.readAsDataURL(file);
  });
}

export { fileToBase64 };
