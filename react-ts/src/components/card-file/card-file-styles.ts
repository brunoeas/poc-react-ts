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
  containerNomeArquivo: {
    marginLeft: 15,
    marginRight: 15,
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingBottom: 10,
  },
  nomeArquivo: {
    maxWidth: 170,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  containerIconeArquivo: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
    paddingTop: 30,
  },
  containerDeleteButton: {
    position: 'absolute',
    right: 0,
    zIndex: 9,
  },
  containerDownloadButton: {
    position: 'absolute',
    left: 0,
    zIndex: 9,
  },
};

export { styles };
