import React from 'react';
import { styles } from './progress-loading-styles';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

type PropsType = {
  classes: any;
  loaded: number;
};

/**
 * Componente para o loading com progresso
 *
 * @author Bruno Eduardo <bruno.soares@kepha.com.br>
 * @param {PropsType} props - props
 * @returns {JSX.Element}
 */
function ProgressLoading(props: PropsType): JSX.Element {
  const { classes, loaded } = props;

  return (
    <div className={classes.container}>
      <CircularProgress variant='static' value={loaded} size={35} className={classes.loading} />
      <div className={classes.percentText}>{loaded}%</div>
    </div>
  );
}

export default withStyles(styles)(ProgressLoading);
