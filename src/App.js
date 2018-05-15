// Logarithm to find x, y position of mouse relative to canvas
// x = evt.clientX - cvs.getBoundingClientRect().x
// y = evt.clientY - cvs.getBoundingClientRect().y

// TODO: Add player position calculation (above) to renderCanvas method
// TODO: Create canvas component and move render logic into there

import React, { Component } from 'react';
import initializeSocket from './socket.js';
import './App.css';
import Canvas from './canvas'

class App extends Component {
  constructor() {
    super()
  }

  componentWillMount() {
    initializeSocket((store) => {
      store.subscribe(() => console.log(store.getState))
    })
  }

  componentDidMount() {
    // this.renderCanvas()
  }

  componentWillUpdate() {
    // Redraw canvas here
  }

  componentWillUnmount() {
    // Destroy socket
  }


  render() {
    return (
      <div className="App d-flex">
        <div className="d-flex flex-column justify-content-center">
          <input type="text"/>
          <button className="btn btn-primary joiner">Join</button>
        </div>

        {/* <div className="canvasContainer" onMouseMove={this.handleMouseMove}>
          <canvas ref="canvas" width="400" height="400"></canvas>
        </div> */}

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
