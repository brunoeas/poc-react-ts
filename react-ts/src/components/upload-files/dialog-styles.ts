import { Styles } from '@material-ui/styles/withStyles';
import { Theme } from '@material-ui/core/styles/createMuiTheme';

/**
 * Styles
 */
const styles: Styles<Theme, {}, string> = {
  containerItem: {
    height: 60,
  },
  containerItemIcon: {
    display: 'flex',
    justifyContent: 'center',
  },
  itemIcon: {
    fontSize: 35,
  },
  containerCancelButton: {
    width: 45,
    height: 45,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
};

export { styles };
