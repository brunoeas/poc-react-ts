import React, { Component } from 'react';
import { styles } from './app-styles';
import { withStyles } from '@material-ui/core/styles';
import ArquivoModel from '../../models/arquivo';
import CardFile from '../../components/card-file/card-file';
import SituacaoArquivoEnum from '../../enumerations/situacao-arquivo-enum';
import UploadFiles from '../../components/upload-files/upload-files';
import { Paper } from '@material-ui/core';
import IconUpload from '@material-ui/icons/CloudUpload';
import DropFilesModal from '../../components/drop-files-modal/drop-modal';
import FileApi from '../../resources/file-api';
import LinearProgress from '@material-ui/core/LinearProgress';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import InfiniteScroll from 'react-infinite-scroller';
import Sweetalert from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import LoadingSwal from '../../utils/loading-swal';

const Swal = withReactContent(Sweetalert);

type PropsType = { classes: any };
type StateType = {
  files?: ArquivoModel[];
  filesToUpload?: ArquivoModel[];
  draggingFile?: boolean;
  loading?: boolean;
  page?: number;
  countTotal?: number;
};

/**
 * Quantidade de arquivos que vão ser exibidos por página
 */
const qtdItensParPage = 25;

/**
 * Única e principal tela do App
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
    this.findFiles = this.findFiles.bind(this);
    this.hasMoreItems = this.hasMoreItems.bind(this);
    this.refresh = this.refresh.bind(this);
    this.deleteFile = this.deleteFile.bind(this);
    this.downloadArquivoById = this.downloadArquivoById.bind(this);
  }

  /**
   * State
   */
  public state: StateType = {
    files: [],
    filesToUpload: [],
    draggingFile: false,
    loading: true,
    page: 0,
    countTotal: 0,
  };

  /**
   * Propriedade que marca se o componente está montado
   */
  private _isMounted = false;

  /**
   * API dos arquivos
   */
  private fileApi = new FileApi();

  /**
   * Referência do input de arquivos
   */
  private inputFilesRef: HTMLInputElement | null = null;

  /**
   * Marca o componente como montado e faz a primeira busca dos arquivos
   */
  public componentDidMount() {
    this._isMounted = true;
    this.findFiles();
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
   * Recebe o evento de upload de arquivos e inicia o upload para o servidor
   *
   * @param {React.DragEvent<HTMLDivElement> | React.ChangeEvent<HTMLInputElement>} e - Evento
   * @param {FileList} files - Lista de arquivos
   */
  private async onAddFiles(
    e: React.DragEvent<HTMLDivElement> | React.ChangeEvent<HTMLInputElement>,
    files: FileList | null
  ) {
    if (!files || files.length === 0) return;
    e.preventDefault();

    const auxFiles: ArquivoModel[] = Array.from(files).map((file, i) => ({
      idArquivo: null,
      nmArquivo: file.name,
      fileData: file,
      stArquivo:
        i === 0 ? SituacaoArquivoEnum.FAZENDO_UPLOAD : SituacaoArquivoEnum.AGUARDANDO_PARA_UPLOAD,
      nrLoaded: i === 0 ? 0 : undefined,
    }));

    this.safeSetState({ draggingFile: false, filesToUpload: auxFiles });
  }

  /**
   * Busca os arquivos na base de dados com as configurações de paginação
   *
   * @param {number} [firstIndex=0] - Primeiro index da lista
   * @param {number} [qtdMaxItens=qtdItensParPage] - Quantidade máxima de items
   * @param {number} [page=this.state.page || 0] - Página atual
   */
  private findFiles(
    firstIndex: number = 0,
    qtdMaxItens: number = qtdItensParPage,
    page: number = this.state.page || 0
  ) {
    this.safeSetState({ loading: true, page }, () =>
      this.fileApi
        .findPartOfFiles({ params: { firstIndex, qtdMaxItens } })
        .then((res) => {
          const concatenedData = this.state.files?.concat(res.data.listData);
          if (!concatenedData) return;

          this.safeSetState({
            files: concatenedData,
            countTotal: res.data.countTotal,
            loading: false,
          });
        })
        .catch((err) =>
          this.safeSetState({ loading: false }, () =>
            console.error('> Ocorreu um erro ao buscar os arquivos: ', err)
          )
        )
    );
  }

  /**
   * Deleta um arquivo pelo seu ID
   *
   * @param {number} id - ID do arquivo
   */
  private async deleteFile(id: number) {
    await new Promise((resolve) =>
      this.safeSetState({ loading: true }, () => LoadingSwal({ configs: { onOpen: resolve } }))
    );

    this.fileApi
      .deleteArquivoById({ params: { id } })
      .then(() =>
        Swal.fire({
          title: 'Sucesso!',
          text: 'Arquivo excluído com sucesso',
          icon: 'success',
        })
      )
      .catch((err) =>
        Swal.fire({
          title: 'Erro!',
          text: 'Ocorreu um erro ao excluír o arquivo',
          icon: 'error',
          onBeforeOpen: () => console.error('> Ocorreu um erro ao excluir um arquivo: ', err),
        })
      )
      .finally(this.refresh);
  }

  /**
   * Atualiza os arquivos na página e na quantidade que estavam
   */
  private refresh() {
    this.safeSetState({ filesToUpload: [], files: [] }, () =>
      this.findFiles(0, ((this.state.page || 0) + 1) * qtdItensParPage)
    );
  }

  /**
   * @returns true - se há mais dados ainda para serem buscados da API; false - caso não;
   */
  private hasMoreItems(): boolean {
    return this.state.files !== undefined && this.state.files.length < (this.state.countTotal || 0);
  }

  private downloadArquivoById(id: number) {
    this.fileApi
      .downloadFileById({
        params: { id },
        onDownloadProgress: (e) => console.log('onDownloadProgress: ', e),
      })
      .then((res) => console.log('acabo: ', res))
      .catch((err) => console.error('Erro: ', err));
  }

  render() {
    const { classes } = this.props;

    return (
      <>
        <DropFilesModal
          show={this.state.draggingFile || false}
          onDragLeave={() => this.state.draggingFile && this.safeSetState({ draggingFile: false })}
          onDrop={(e) => this.onAddFiles(e, e.dataTransfer.files)}
        />

        {this.state.loading && <LinearProgress className={classes.loadingLinear} />}

        <UploadFiles filesToUpload={this.state.filesToUpload || []} onUploadEnd={this.refresh} />

        <div
          className={classes.main}
          onDragOver={(e) => {
            e.preventDefault();
            !this.state.draggingFile && this.safeSetState({ draggingFile: true });
          }}
        >
          <Grid container className={classes.containerHeader}>
            <Grid item xs={2} className={classes.contador}>
              {`${this.state.files?.length} arquivos de ${this.state.countTotal}`}
            </Grid>

            <Grid item xs={3} />

            <Grid item xs={3} className={classes.containerTitle}>
              <div className={classes.title}>Meu banco de arquivos</div>
            </Grid>

            <Grid item xs={3} />

            <Grid item xs={1}>
              <Button
                onClick={this.refresh}
                variant={this.state.loading ? undefined : 'outlined'}
                color='primary'
                className={classes.refreshButton}
              >
                {this.state.loading ? <CircularProgress size={25} /> : 'Refresh'}
              </Button>
            </Grid>
          </Grid>

          <hr className={classes.linhaSeparadora} />

          <input
            accept='*'
            className={classes.inputFile}
            multiple
            type='file'
            ref={(ref) => (this.inputFilesRef = ref)}
            onChange={(e) => this.onAddFiles(e, e.target.files)}
          />

          <div
            style={{ overflowY: this.state.loading ? 'hidden' : 'auto' }}
            className={classes.containerScroll}
          >
            <InfiniteScroll
              className={classes.container}
              pageStart={0}
              loadMore={(page) =>
                this.hasMoreItems() && this.findFiles(page * qtdItensParPage, qtdItensParPage, page)
              }
              hasMore={this.state.files && this.state.files.length < (this.state.countTotal || 0)}
              loader={
                this.state.loading ? (
                  <div style={{ width: '100%', textAlign: 'center' }} key={0}>
                    Carregando mais arquivos...
                  </div>
                ) : (
                  <div key={0} />
                )
              }
              useWindow={false}
              initialLoad={false}
              threshold={100}
            >
              <Paper
                onClick={() => this.inputFilesRef && this.inputFilesRef.click()}
                elevation={8}
                className={classes.containerItemUpload}
              >
                <div className={classes.iconeItemUpload}>
                  <IconUpload fontSize='inherit' color='inherit' />
                </div>

                <div className={classes.textoItemUpload}>
                  Clique aqui ou arraste os arquivos para fazer o upload
                </div>
              </Paper>

              {(this.state.files || []).map((file, i) => (
                <CardFile
                  key={i}
                  file={file}
                  onDownload={() => this.downloadArquivoById(file.idArquivo || -1)}
                  onDelete={() => this.deleteFile(file.idArquivo || -1)}
                />
              ))}
            </InfiniteScroll>
          </div>
        </div>
      </>
    );
  }
}

export default withStyles(styles)(App);
