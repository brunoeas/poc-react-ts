import { Styles } from '@material-ui/styles/withStyles';
import { Theme } from '@material-ui/core/styles/createMuiTheme';

/**
 * Styles
 */
const styles: Styles<Theme, {}, string> = {
  container: {
    display: 'flex',
    alignItems: 'center',
    width: 22,
  },
  percentText: {
    fontSize: '0.7rem',
  },
  loading: {
    left: -7,
    position: 'absolute',
  },
};

export { styles };
