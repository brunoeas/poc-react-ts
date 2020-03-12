import React, { Component } from 'react';
import { styles } from './app-styles';
import { withStyles } from '@material-ui/core/styles';
import FileModel from '../../models/file';
import { fileToBase64 } from '../../utils/utils';
import CardFile from '../../components/card-file/card-file';

/**
 * Unica e principal tela do App
 *
 * @author Bruno Eduardo <bruno.soares@kepha.com.br>
 * @class App
 * @extends {Component}
 */
class App extends Component<{ classes: any }, { files: FileModel[] }> {
  public state = {
    files: [
      {
        idFile: null,
        nmFile: 'Arquivo 1',
        dsBase64: '',
        stFile: true
      },
      {
        idFile: null,
        nmFile: 'Arquivo 1',
        dsBase64: '',
        stFile: true
      },
      {
        idFile: null,
        nmFile: 'Arquivo 1',
        dsBase64: '',
        stFile: true
      },
      {
        idFile: null,
        nmFile: 'Arquivo 1',
        dsBase64: '',
        stFile: true
      },
      {
        idFile: null,
        nmFile: 'Arquivo 1',
        dsBase64: '',
        stFile: true
      },
      {
        idFile: null,
        nmFile: 'Arquivo 1',
        dsBase64: '',
        stFile: true
      },
      {
        idFile: null,
        nmFile: 'Arquivo 1',
        dsBase64: '',
        stFile: true
      },
      {
        idFile: null,
        nmFile: 'Arquivo 1',
        dsBase64: '',
        stFile: true
      },
      {
        idFile: null,
        nmFile: 'Arquivo 1',
        dsBase64: '',
        stFile: true
      },
      {
        idFile: null,
        nmFile: 'Arquivo 1',
        dsBase64: '',
        stFile: true
      },
      {
        idFile: null,
        nmFile: 'Arquivo 1',
        dsBase64: '',
        stFile: true
      }
    ]
  };

  public async onAddFiles(e: React.DragEvent<HTMLDivElement>) {
    const files = e.dataTransfer.files;

    if (files.length === 0) return;
    e.preventDefault();

    const auxFiles: FileModel[] = [...this.state.files];

    const promises = Array.from(files).map(
      async file =>
        await fileToBase64(file).then(dsBase64 =>
          dsBase64 !== null
            ? auxFiles.push({
                idFile: null,
                nmFile: file.name,
                dsBase64: dsBase64.split(';base64,')[1],
                stFile: true
              })
            : null
        )
    );

    await Promise.all(promises);

    this.setState({ files: auxFiles });
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.main} onDrop={this.onAddFiles} onDragOver={e => e.preventDefault()}>
        <div className={classes.title}>Meu banco de arquivos</div>

        <div className={classes.container}>
          {this.state.files.map(file => (
            <CardFile file={file} />
          ))}
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(App);
