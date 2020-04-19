import { Styles } from '@material-ui/styles/withStyles';
import { Theme } from '@material-ui/core/styles/createMuiTheme';

/**
 * Styles
 */
const styles: Styles<Theme, {}, string> = {
  container: {
    width: '100vw',
    height: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(204, 204, 204, 0.7)',
    position: 'fixed',
    zIndex: 9,
  },
  card: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '50vw',
    height: '50vh',
    backgroundColor: 'white',
    border: '1px dashed #AAAAAA',
    borderRadius: 15,
    padding: 30,
    boxSizing: 'border-box',
  },
  uploadGif: {
    maxHeight: '40vh',
    maxWidth: '40vw',
  },
  text: {
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'center',
    height: '100%',
    fontSize: '1.5rem',
    color: '#444444',
  },
};

export { styles };
