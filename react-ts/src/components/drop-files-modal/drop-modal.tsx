import React from 'react';
import UploadCloudGif from '../../assets/images/cloud-upload.gif';
import { styles } from './drop-modal-styles';
import { withStyles } from '@material-ui/core/styles';

type PropsType = {
  classes: any;
  show: boolean;
  onDragLeave: (e: React.DragEvent<HTMLDivElement>) => void;
  onDrop: (e: React.DragEvent<HTMLDivElement>) => void;
};

/**
 * Componente para o modal que aparece quando o usuário está arrastando os arquivos
 *
 * @author Bruno Eduardo <bruno.soares@kepha.com.br>
 * @param {PropsType} props - props
 * @returns {JSX.Element}
 */
function DropFilesModal(props: PropsType): JSX.Element {
  const { classes, show, onDragLeave, onDrop } = props;

  return show ? (
    <div
      onDragLeave={onDragLeave}
      onDrop={onDrop}
      onDragOver={(e) => e.preventDefault()}
      className={classes.container}
    >
      <div className={classes.card}>
        <img src={UploadCloudGif} alt='Upload to cloud' className={classes.uploadGif} />

        <div className={classes.text}>Solte o(s) arquivo(s) para fazer o upload</div>
      </div>
    </div>
  ) : (
    <></>
  );
}

export default withStyles(styles)(DropFilesModal);
