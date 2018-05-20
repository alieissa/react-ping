//TODO: Logic for Game on/off state
//TODO: Bring dispatchers here from Canvas component. It is doing too much

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
        <Canvas/>
    );
  }
}

export default App;
