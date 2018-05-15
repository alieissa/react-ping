//TODO: Map user action to dispatch
//TODO: Activate player on join click
//TODO: Logic for Game on/off state
//TODO: Distinguish players from watchers

import React, { Component } from 'react';
import initializeSocket from './socket.js';
import './App.css';
import Canvas from './components/canvas-container'
import {Provider} from 'react-redux'
import {A} from './actions'

class App extends Component {
  constructor() {
    super()

    this.handleJoin = this.handleJoin.bind(this)
  }

  // componentWillMount() {
  // }

  // componentDidMount() {
  //   // this.renderCanvas()
  // }
  //
  // componentWillUpdate() {
  //   // Redraw canvas here
  // }

  // componentWillUnmount() {
  //   // Destroy socket
  // }


  handleJoin() {
    // this.store.dispatch({
    //   type: A.ADD_PLAYER,
    //   payload:{
    //     score: 0,
    //     name: 'test',
    //     x: 10,
    //     y: 20
    //   }
    // })
  }

  render() {
    return (
      <div className="App d-flex">
        <div className="d-flex flex-column justify-content-center">
          <input type="text"/>
          <button className="btn btn-primary joiner" onClick={this.handleJoin}>Join</button>
        </div>

          <Canvas />

        <div className="d-flex flex-column justify-content-center">
          <input type="text"/>
          <button className="btn btn-primary joiner">Join</button>
        </div>
      </div>
    );
  }
}

export default App;
