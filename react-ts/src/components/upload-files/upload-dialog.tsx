import React from 'react';
import ReactDOM from 'react-dom';
import ArquivoModel from '../../models/arquivo';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import SituacaoArquivoEnum from '../../enumerations/situacao-arquivo-enum';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import ClockIcon from '@material-ui/icons/AccessTime';
import Tooltip from '@material-ui/core/Tooltip';
import ProgressLoading from '../progress-loading/progress-loading';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import CancelIcon from '@material-ui/icons/Cancel';
import { styles } from './dialog-styles';
import { withStyles } from '@material-ui/core/styles';

type PropsType = {
  files: ArquivoModel[];
  dialogIsOpen: boolean;
  onCloseDialog: () => void;
  classes: any;
};

/**
 * Componente do modal de upload de arquivos
 *
 * @author Bruno Eduardo <bruno.soares@kepha.com.br>
 * @param {PropsType} props
 * @returns {JSX.Element}
 */
function UploadDialog(props: PropsType): JSX.Element {
  const { classes, files, dialogIsOpen, onCloseDialog } = props;

  const component = (
    <Dialog onClose={onCloseDialog} open={dialogIsOpen} disableBackdropClick>
      <DialogTitle>Fazendo upload...</DialogTitle>

      <List>
        {files.map((file, i) => (
          <ListItem key={i} className={classes.containerItem}>
            <ListItemIcon className={classes.containerItemIcon}>
              {(() => {
                if (file.stArquivo === SituacaoArquivoEnum.FAZENDO_UPLOAD) {
                  return <ProgressLoading loaded={file.nrLoaded || 0} />;
                }

                if (file.stArquivo === SituacaoArquivoEnum.UPLOAD_CONCLUIDO_SUCESSO) {
                  return (
                    <Tooltip title='Upload concluído com sucesso'>
                      <div className={classes.itemIcon} style={{ color: '#4CAF50' }}>
                        <CheckCircleIcon fontSize='inherit' color='inherit' />
                      </div>
                    </Tooltip>
                  );
                }

                if (
                  file.stArquivo === SituacaoArquivoEnum.UPLOAD_CONCLUIDO_ERRO ||
                  file.stArquivo === SituacaoArquivoEnum.UPLOAD_CANCELADO
                ) {
                  return (
                    <Tooltip
                      title={
                        file.stArquivo === SituacaoArquivoEnum.UPLOAD_CANCELADO
                          ? 'Upload cancelado'
                          : 'Erro ao fazer upload'
                      }
                    >
                      <div className={classes.itemIcon}>
                        <ErrorIcon fontSize='inherit' color='error' />
                      </div>
                    </Tooltip>
                  );
                }

                if (file.stArquivo === SituacaoArquivoEnum.AGUARDANDO_PARA_UPLOAD) {
                  return (
                    <Tooltip title='Aguardando para fazer upload'>
                      <div className={classes.itemIcon}>
                        <ClockIcon fontSize='inherit' />
                      </div>
                    </Tooltip>
                  );
                }

                return <div />;
              })()}
            </ListItemIcon>

            <ListItemText primary={file.nmArquivo} />

            <ListItemSecondaryAction className={classes.containerCancelButton}>
              {file.stArquivo === SituacaoArquivoEnum.FAZENDO_UPLOAD && file.cancelRequest && (
                <IconButton onClick={() => file.cancelRequest && file.cancelRequest()} edge='end'>
                  <CancelIcon />
                </IconButton>
              )}
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    </Dialog>
  );

  return ReactDOM.createPortal(
    component,
    document.getElementById('root') || document.createElement('div')
  );
}

export default withStyles(styles)(UploadDialog);
