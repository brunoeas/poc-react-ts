import React, { Component } from 'react';
import Screens from '../../screens';

/**
 * Componente principal da aplicação que controla as views
 *
 * @author Bruno Eduardo <bruno.soares@kepha.com.br>
 * @class App
 * @extends {Component}
 */
class App extends Component {
  state = {
    screen: Screens
  };

  public changeScreen(screen: Screen) {
    this.setState({ screen });
  }

  render() {
    return <div>Ola</div>;
  }
}

export default App;
