import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './views/app/app';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { theme } from './utils/constant';

ReactDOM.render(
  <MuiThemeProvider theme={theme}>
    <App />
  </MuiThemeProvider>,
  document.getElementById('root')
);
