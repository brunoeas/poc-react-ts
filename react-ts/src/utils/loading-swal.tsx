import React from 'react';
import Sweetalert, { SweetAlertOptions, SweetAlertResult } from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { MuiThemeProvider, makeStyles } from '@material-ui/core/styles';
import { theme } from './constant';
import CircularProgress, { CircularProgressProps } from '@material-ui/core/CircularProgress';

const Swal = withReactContent(Sweetalert);

/**
 * Estilos
 */
const useStyles = makeStyles({
  containerSwal: {
    width: 100,
    height: 110,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

type LoadingSwalParams = {
  configs?: SweetAlertOptions;
  circularProgressProps?: CircularProgressProps;
};

/**
 * Abre um modal do SweetAlert2 com configurações para um loading
 *
 * @author Bruno Eduardo <bruno.soares@kepha.com.br>
 * @param {LoadingSwalParams} [props={}] - Props opcionais para customização
 * @returns {Promise<SweetAlertResult>} - Promise para case o modal tenha confirmação, por padrão não é necessário
 */
async function LoadingSwal(props: LoadingSwalParams = {}): Promise<SweetAlertResult> {
  const classes = useStyles();
  const { configs = {}, circularProgressProps } = props;

  return Swal.fire({
    title: (
      <MuiThemeProvider theme={theme}>
        <CircularProgress size={50} {...circularProgressProps} />
      </MuiThemeProvider>
    ),
    allowOutsideClick: false,
    allowEscapeKey: false,
    showCancelButton: false,
    showConfirmButton: false,
    ...configs,
    customClass: {
      title: classes.containerSwal,
      ...configs.customClass,
    },
  });
}

export default LoadingSwal;
