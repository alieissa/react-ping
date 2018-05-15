//TODO: Map user action to dispatch
//TODO: Activate player on join click
//TODO: Logic for Game on/off state
//TODO: Distinguish players from watchers

import React, { Component } from 'react';
import {initializeSocket} from './socket.js';
import './App.css';
import Canvas from './components/canvas-container'
import {Provider} from 'react-redux'

class App extends Component {
  constructor() {
    super()
  }

  render() {
    return (
        <Canvas handleJoin={this.handleJoin}/>
    );
  }
}

export default App;
