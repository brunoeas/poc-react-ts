import React from 'react';
import ArquivoModel from '../../models/arquivo';
import { Paper } from '@material-ui/core';
import { styles } from './card-file-styles';
import { withStyles } from '@material-ui/core/styles';
import { extractFileExtension } from '../../utils/utils';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import './card-file.css';

const ReactFileIcon = require('react-file-icon');
const FileIcon = ReactFileIcon.default;

type PropsType = { classes: any; file: ArquivoModel; onDelete: () => void };

/**
 * Componente para exibir um Card com os dados de um arquivo
 *
 * @author Bruno Eduardo <bruno.soares@kepha.com.br>
 * @param {PropsType} props - Props
 * @returns {JSX.Element}
 */
function CardFile(props: PropsType): JSX.Element {
  const { file, classes, onDelete } = props;

  const extension = extractFileExtension(file.nmArquivo);

  return (
    <Paper elevation={8} className={'container-geral ' + classes.container}>
      <div className={'container-botao ' + classes.containerDeleteButton}>
        <IconButton onClick={onDelete}>
          <DeleteIcon />
        </IconButton>
      </div>

      <div className={classes.containerIconeArquivo}>
        <FileIcon {...ReactFileIcon.defaultStyles[extension]} extension={extension} size={120} />
      </div>

      <div className={classes.containerNomeArquivo}>
        <div className={classes.nomeArquivo}>{file.nmArquivo}</div>
      </div>
    </Paper>
  );
}

export default withStyles(styles)(CardFile);
