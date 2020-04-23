import React from 'react';
import Sweetalert, { SweetAlertOptions, SweetAlertResult } from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { theme } from './constant';
import CircularProgress, { CircularProgressProps } from '@material-ui/core/CircularProgress';
import '../assets/styles/styles.css';

const Swal = withReactContent(Sweetalert);

type LoadingSwalParams = {
  configs?: SweetAlertOptions;
  circularProgressProps?: CircularProgressProps;
};

/**
 * Abre um modal do SweetAlert2 com configurações para um loading
 *
 * @author Bruno Eduardo <bruno.soares@kepha.com.br>
 * @param {LoadingSwalParams} [props={}] - Props opcionais para customização
 * @returns {Promise<SweetAlertResult>} - Promise para caso o modal tenha confirmação, por padrão não é necessário
 */
async function LoadingSwal(props: LoadingSwalParams = {}): Promise<SweetAlertResult> {
  const { configs = {}, circularProgressProps = {} } = props;

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
      title: 'container-swal',
      ...configs.customClass,
    },
  });
}

export default LoadingSwal;
