import React, { Component } from 'react';
import initializeSocket from './socket.js';
import './App.css';

class App extends Component {
  constructor() {
    super()
    this.renderCanvas = this.renderCanvas.bind(this)
    this.handleMouseMove = this.handleMouseMove.bind(this)
  }

  componentWillMount() {
    initializeSocket((store) => {
      console.log('initial state', store.getState());
      store.subscribe(() => console.log(store.getState))
    })
  }

  componentDidMount() {
    // const cvs = this.refs.canvas
    // const ctx = cvs.getContext("2d")

    this.renderCanvas()
  }

  componentWillUpdate() {
    // Redraw canvas here
  }

  componentWillUnmount() {
    // Destroy socket
  }

  handleMouseMove(evt) {
    // Move paddle if user is a player
    // console.log(evt)
  }

  renderCanvas(lPlayer, rPlayer, ball) {
    // Redraw canvas
    const cvs = this.refs.canvas
    const ctx = cvs.getContext("2d")

    // left player
    ctx.fillStyle = 'green';
    ctx.fillRect(0, 10, 20, 100);

    // right player
    ctx.fillStyle = 'blue'
    ctx.fillRect(cvs.width - 10, 10, 10, 100);

    // ball
    ctx.fillStyle = "black"
    ctx.fillRect(cvs.width / 2, cvs.height / 2, 15, 15);
  }

  render() {
    return (
      <div className="App d-flex">
        <div className="d-flex flex-column justify-content-center">
          <input type="text"/>
          <button className="btn btn-primary joiner">Join</button>
        </div>

        <div className="canvasContainer" onMouseMove={this.handleMouseMove}>
          <canvas ref="canvas" width="400" height="400"></canvas>
        </div>

        <div className="d-flex flex-column justify-content-center">
          <input type="text"/>
          <button className="btn btn-primary joiner">Join</button>
        </div>
      </div>
    );
  }
}

export default App;
