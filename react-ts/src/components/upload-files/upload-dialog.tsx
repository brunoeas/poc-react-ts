import React from 'react';
import ArquivoModel from '../../models/arquivo';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import SituacaoArquivoEnum from '../../enumeration/situacao-arquivo-enum';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import ClockIcon from '@material-ui/icons/AccessTime';
import Tooltip from '@material-ui/core/Tooltip';
import ProgressLoading from '../progress-loading/progress-loading';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import CancelIcon from '@material-ui/icons/Cancel';

type PropsType = {
  files: ArquivoModel[];
  dialogIsOpen: boolean;
  onCloseDialog: () => void;
  classes?: any;
};

/**
 * Componente do modal de upload de arquivos
 *
 * @author Bruno Eduardo <bruno.soares@kepha.com.br>
 * @param {PropsType} props
 * @returns {JSX.Element}
 */
function UploadDialog(props: PropsType): JSX.Element {
  const { files, dialogIsOpen, onCloseDialog } = props;

  return (
    <Dialog onClose={onCloseDialog} open={dialogIsOpen}>
      <DialogTitle>Fazendo upload...</DialogTitle>

      <List>
        {files.map((file, i) => (
          <ListItem key={i}>
            <ListItemIcon style={{ display: 'flex', justifyContent: 'center' }}>
              {(() => {
                if (file.stArquivo === SituacaoArquivoEnum.FAZENDO_UPLOAD) {
                  return <ProgressLoading loaded={file.nrLoaded || 0} />;
                }

                if (file.stArquivo === SituacaoArquivoEnum.UPLOAD_CONCLUIDO_SUCESSO) {
                  return (
                    <Tooltip title='Upload concluído com sucesso'>
                      <div style={{ fontSize: 35, color: '#4CAF50' }}>
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
                    <Tooltip title='Erro ao fazer upload'>
                      <div style={{ fontSize: 35 }}>
                        <ErrorIcon fontSize='inherit' color='error' />
                      </div>
                    </Tooltip>
                  );
                }

                if (file.stArquivo === SituacaoArquivoEnum.AGUARDANDO_PARA_UPLOAD) {
                  return (
                    <Tooltip title='Aguardando para fazer upload'>
                      <div style={{ fontSize: 35 }}>
                        <ClockIcon fontSize='inherit' />
                      </div>
                    </Tooltip>
                  );
                }

                return <div />;
              })()}
            </ListItemIcon>

            <ListItemText primary={file.nmArquivo} />

            {file.stArquivo === SituacaoArquivoEnum.FAZENDO_UPLOAD && file.cancelRequest && (
              <ListItemSecondaryAction>
                <IconButton onClick={() => file.cancelRequest && file.cancelRequest()} edge='end'>
                  <CancelIcon />
                </IconButton>
              </ListItemSecondaryAction>
            )}
          </ListItem>
        ))}
      </List>
    </Dialog>
  );
}

export default UploadDialog;
