import React, { Component } from 'react';
import { styles } from './app-styles';
import { withStyles } from '@material-ui/core/styles';
import ArquivoModel from '../../models/arquivo';
import CardFile from '../../components/card-file/card-file';
import SituacaoArquivoEnum from '../../enumeration/situacao-arquivo-enum';
import UploadFiles from '../../components/upload-files/upload-files';

type PropsType = { classes: any };
type StateType = {
  files?: ArquivoModel[];
  filesToUpload?: ArquivoModel[];
};

/**
 * Unica e principal tela do App
 *
 * @author Bruno Eduardo <bruno.soares@kepha.com.br>
 * @class App
 * @extends {Component}
 */
class App extends Component<PropsType, StateType> {
  public constructor(props: PropsType) {
    super(props);
    this.safeSetState = this.safeSetState.bind(this);
    this.onAddFiles = this.onAddFiles.bind(this);
  }

  /**
   * State
   */
  public state: StateType = {
    files: [
      {
        idArquivo: 11,
        nmArquivo: 'imag-asdasdasjdaasas-da-d-asd-asd-asdasdasd-asd-asd-as-dasdsdae.png',
        stArquivo: 2,
      },
    ],
    filesToUpload: [],
  };

  /**
   * Propriedade que marca se o componente está montado
   */
  private _isMounted = false;

  /**
   * Marca o componente como montado
   */
  public componentDidMount() {
    this._isMounted = true;
  }

  /**
   * Marca o componente como desmontado
   */
  public componentWillUnmount() {
    this._isMounted = false;
  }

  /**
   * Faz um setState sem risco do componente estar desmontado
   *
   * @param state - Herdado do setState normal
   * @param callback - Herdado do setState normal
   */
  private safeSetState(
    state: ((prevState: Readonly<StateType>, props: Readonly<PropsType>) => any) | StateType,
    callback?: () => void
  ) {
    this._isMounted && super.setState(state, callback);
  }

  /**
   * Recebe o evento de upload de arquivos, convertendo todos para ArquivoModel com seus devidos Base64 e inicia o upload para o servidor
   *
   * @param e - Event
   */
  private async onAddFiles(e: React.DragEvent<HTMLDivElement>) {
    const files = e.dataTransfer.files;

    if (files.length === 0) return;
    e.preventDefault();

    const auxFiles: ArquivoModel[] = Array.from(files).map((file, i) => ({
      idArquivo: null,
      nmArquivo: file.name,
      fileData: file,
      stArquivo:
        i === 0 ? SituacaoArquivoEnum.FAZENDO_UPLOAD : SituacaoArquivoEnum.AGUARDANDO_PARA_UPLOAD,
      nrLoaded: i === 0 ? 0 : undefined,
    }));

    this.safeSetState({ filesToUpload: auxFiles });
  }

  render() {
    const { classes } = this.props;

    return (
      <>
        <div className={classes.main} onDrop={this.onAddFiles} onDragOver={(e) => e.preventDefault()}>
          <div className={classes.title}>Meu banco de arquivos</div>

          <hr />
          {/* TODO: estilizar tag <hr> */}

          <div className={classes.container}>
            {(this.state.files || []).map((file, i) => (
              <CardFile key={i} file={file} />
            ))}
          </div>
        </div>

        <UploadFiles
          filesToUpload={this.state.filesToUpload || []}
          onUploadEnd={(uploadedFiles) =>
            this.safeSetState({ files: this.state.files?.concat(uploadedFiles), filesToUpload: [] })
          }
        />
      </>
    );
  }
}

export default withStyles(styles)(App);
