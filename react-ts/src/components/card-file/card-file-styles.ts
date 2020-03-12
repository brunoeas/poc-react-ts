import { Styles } from '@material-ui/styles/withStyles';
import { Theme } from '@material-ui/core/styles/createMuiTheme';

/**
 * Styles
 */
const styles: Styles<Theme, {}, string> = {
  container: {
    width: 200,
    height: 200,
    margin: 15
  },
  nomeArquivo: {
    maxWidth: 200,
    height: 30,
    top: 'calc(100% - 30px)'
  }
};

export { styles };
