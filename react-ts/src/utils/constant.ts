import { createMuiTheme } from '@material-ui/core/styles';

/**
 * Tema padrão
 */
const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#474747',
    },
  },
  overrides: {
    MuiInput: {
      underline: {
        '&:hover:not($disabled):not($focused):not($error):before': {
          borderBottomColor: '#474747',
        },
      },
    },
  },
});

export { theme };
