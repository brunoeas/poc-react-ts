import React from 'react';
import FileModel from '../../models/file';
import { Paper } from '@material-ui/core';
import { styles } from './card-file-styles';
import { withStyles } from '@material-ui/core/styles';

/**
 * Componente para exibir um Card com os dados de um arquivo
 *
 * @author Bruno Eduardo <bruno.soares@kepha.com.br>
 * @param {{ file: FileModel }} props - Props
 * @returns {JSX.Element}
 */
function CardFile(props: { file: FileModel; classes: any }): JSX.Element {
  const { file, classes } = props;

  return (
    <Paper elevation={8} className={classes.container}>
      <div className={classes.nomeArquivo}>{file.nmFile}</div>
    </Paper>
  );
}

export default withStyles(styles)(CardFile);
