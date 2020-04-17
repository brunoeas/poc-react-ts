import React from 'react';
import ArquivoModel from '../../models/arquivo';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import CircularProgress from '@material-ui/core/CircularProgress';
import SituacaoArquivoEnum from '../../enumeration/situacao-arquivo-enum';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import ClockIcon from '@material-ui/icons/AccessTime';
import Tooltip from '@material-ui/core/Tooltip';

type PropsType = {
  files: ArquivoModel[];
  dialogIsOpen: boolean;
  onCloseDialog: () => void;
  classes?: any;
};

function UploadDialog(props: PropsType): JSX.Element {
  const { files, dialogIsOpen, onCloseDialog } = props;

  return (
    <Dialog onClose={onCloseDialog} open={dialogIsOpen} aria-labelledby='simple-dialog-title'>
      <DialogTitle>Fazendo upload...</DialogTitle>

      <List>
        {files.map((file, i) => (
          <ListItem button key={i}>
            <ListItemIcon>
              {(() => {
                if (file.stArquivo === SituacaoArquivoEnum.FAZENDO_UPLOAD) {
                  return (
                    <Tooltip title='Carregando...'>
                      <CircularProgress variant='static' value={file.nrLoaded} size={30} />
                    </Tooltip>
                  );
                } else if (file.stArquivo === SituacaoArquivoEnum.UPLOAD_CONCLUIDO_SUCESSO) {
                  return (
                    <Tooltip title='Upload concluído com sucesso'>
                      <div style={{ color: '#4CAF50' }}>
                        <CheckCircleIcon fontSize='large' color='inherit' />
                      </div>
                    </Tooltip>
                  );
                } else if (file.stArquivo === SituacaoArquivoEnum.UPLOAD_CONCLUIDO_ERRO) {
                  return (
                    <Tooltip title='Erro ao fazer upload'>
                      <ErrorIcon fontSize='large' color='error' />
                    </Tooltip>
                  );
                } else if (file.stArquivo === SituacaoArquivoEnum.AGUARDANDO_PARA_UPLOAD) {
                  return (
                    <Tooltip title='Aguardando para fazer upload'>
                      <ClockIcon fontSize='large' />
                    </Tooltip>
                  );
                }

                return <div />;
              })()}
            </ListItemIcon>

            <ListItemText primary={file.nmArquivo} />
          </ListItem>
        ))}
      </List>
    </Dialog>
  );
}

export default UploadDialog;
