import React from 'react';
import ArquivoModel from '../../models/arquivo';
import { Paper } from '@material-ui/core';
import { styles } from './card-file-styles';
import { withStyles } from '@material-ui/core/styles';
import { extractFileExtension } from '../../utils/utils';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import './card-file.css';
import Swal from 'sweetalert2';

const ReactFileIcon = require('react-file-icon');
const FileIcon = ReactFileIcon.default;

type PropsType = { classes: any; file: ArquivoModel; onDelete: () => void };
console.log(ReactFileIcon.defaultStyles, ReactFileIcon.defaultStyles['naoexisetr']);

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
  let extensionConfigs = ReactFileIcon.defaultStyles[extension];
  if (extension === 'unknown' || extensionConfigs === undefined) {
    extensionConfigs = ReactFileIcon.defaultStyles['md'];
  }

  return (
    <Paper elevation={8} className={'container-geral ' + classes.container}>
      <div className={'container-botao ' + classes.containerDeleteButton}>
        <IconButton onClick={onClickDelete}>
          <DeleteIcon />
        </IconButton>
      </div>

      <div className={classes.containerIconeArquivo}>
        <FileIcon {...extensionConfigs} extension={extension} size={120} />
      </div>

      <div className={classes.containerNomeArquivo}>
        <div className={classes.nomeArquivo}>{file.nmArquivo}</div>
      </div>
    </Paper>
  );

  /**
   * Abre o modal de confirmação para deletar o arquivo
   */
  function onClickDelete() {
    Swal.fire({
      title: 'Excluir arquivo?',
      text: 'Não sera possível recupera-lo depois disto!',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#D33',
      cancelButtonColor: '#444444',
      confirmButtonText: 'Sim',
      cancelButtonText: 'Não',
    }).then((result) => {
      if (result.value) {
        onDelete();
      }
    });
  }
}

export default withStyles(styles)(CardFile);
