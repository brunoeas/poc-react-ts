import { Styles } from '@material-ui/styles/withStyles';
import { Theme } from '@material-ui/core/styles/createMuiTheme';

/**
 * Styles
 */
const styles: Styles<Theme, {}, string> = {
  container: {
    width: 200,
    height: 200,
    margin: 15,
    display: 'flex',
    flexDirection: 'column',
  },
  nomeArquivo: {
    maxWidth: 170,
    marginLeft: 15,
    marginRight: 15,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingBottom: 10,
  },
  containerIconeArquivo: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
    paddingTop: 30,
  },
};

export { styles };
