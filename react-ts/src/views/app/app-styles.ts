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
    boxSizing: 'border-box'
  },
  title: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30
  },
  container: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    overflow: 'hidden',
    overflowY: 'auto',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    maxHeight: 'calc(100vh - 105px)'
  }
};

export { styles };
