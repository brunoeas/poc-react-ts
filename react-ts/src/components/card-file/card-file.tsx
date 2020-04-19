import React from 'react';
import ArquivoModel from '../../models/arquivo';
import { Paper } from '@material-ui/core';
import { styles } from './card-file-styles';
import { withStyles } from '@material-ui/core/styles';
import { extractFileExtension } from '../../utils/utils';

const reactFileIcon = require('react-file-icon');
const FileIcon = reactFileIcon.default;

type PropsType = { file: ArquivoModel; classes: any };

/**
 * Componente para exibir um Card com os dados de um arquivo
 *
 * @author Bruno Eduardo <bruno.soares@kepha.com.br>
 * @param {PropsType} props - Props
 * @returns {JSX.Element}
 */
function CardFile(props: PropsType): JSX.Element {
  const { file, classes } = props;

  const extension = extractFileExtension(file.nmArquivo);

  return (
    <Paper elevation={8} className={classes.container}>
      <div className={classes.containerIconeArquivo}>
        <FileIcon {...reactFileIcon.defaultStyles[extension]} extension={extension} size={120} />
      </div>

      <div className={classes.containerNomeArquivo}>
        <div className={classes.nomeArquivo}>{file.nmArquivo}</div>
      </div>
    </Paper>
  );
}

export default withStyles(styles)(CardFile);
