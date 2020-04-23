import { Styles } from '@material-ui/styles/withStyles';
import { Theme } from '@material-ui/core/styles/createMuiTheme';

/**
 * Styles
 */
const styles: Styles<Theme, {}, string> = {
  main: {
    width: '100vw',
    height: '100vh',
    padding: 30,
    paddingTop: 20,
    boxSizing: 'border-box',
  },
  title: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  containerScroll: {
    maxHeight: 'calc(100vh - 105px)',
  },
  container: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    overflow: 'hidden',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  linhaSeparadora: {
    height: 1,
    backgroundColor: '#AAAAAA',
    marginBottom: 15,
    marginTop: 15,
  },
  containerItemUpload: {
    width: 200,
    height: 200,
    margin: 15,
    display: 'flex',
    flexDirection: 'column',
    cursor: 'pointer',
  },
  iconeItemUpload: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
    paddingTop: 30,
    fontSize: 100,
    color: '#979797',
  },
  textoItemUpload: {
    marginLeft: 15,
    marginRight: 15,
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingBottom: 10,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  inputFile: {
    display: 'none',
    width: 0,
    height: 0,
  },
  containerHeader: {
    heigth: 40,
    display: 'flex',
    justifyContent: 'center',
  },
  refreshButton: {
    maxWidth: 75,
    height: 40,
  },
  containerTitle: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  loadingLinear: {
    position: 'absolute',
    width: '100%',
    top: 0,
  },
  contador: {
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'flex-start',
    fontSize: '0.9rem',
    marginBottom: 10,
  },
};

export { styles };
