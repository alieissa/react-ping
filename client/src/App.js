import React, { Component } from 'react';
import './App.css';
import Canvas from './canvas'
import {initializeSocket} from './socket.js';
import CONF from './config'

class App extends Component {
  constructor() {
    super()
    this.state = {
      playing: false,
      position: ''
    }

    this.addPlayer = this.addPlayer.bind(this)
    this.removePlayer = this.removePlayer.bind(this)
  }

  addPlayer(position) {
    let paddleY = CONF.CANVAS_HEIGHT / 2 - CONF.PADDLE_HEIGHT / 2
    let paddleX = position === 'left' ? CONF.PADDLE_OFFSET
        : CONF.CANVAS_WIDTH - (CONF.PADDLE_WIDTH + CONF.PADDLE_OFFSET)

    let player = {
      position: position,
      x: paddleX,
      y: paddleY
    }

    this.props.addPlayer(player)

    this.setState({
      position: position,
      playing: true
    })
  }

  removePlayer(position) {
    const removeCandidate =
      position === 'left' ? this.props.leftPlayer : this.props.rightPlayer

    this.props.removePlayer(removeCandidate)

    this.setState({
      playing: false,
      position: position
    })
  }

  // Check if left or right seat are is occupied
  // Note. A game is on if both seats are occupied
  isSeatAvailable(position) {
    const isGameOn = this.state.playing
    const isLeftSeatAvailable = this.props.leftPlayer.id === null
    const isRightSeatAvailable = this.props.rightPlayer.id === null

    const isSeatAvailable = position === 'left' ? isLeftSeatAvailable : isRightSeatAvailable

    return isSeatAvailable && !isGameOn
  }

  // Checks if the user is actually one of the players
  // Note. Used to show Exit button
  isUserPlaying(position) {
    const isGameOn = this.state.playing
    const isUserPlayer = this.state.position === position
    return isGameOn && isUserPlayer
  }

  render() {
    return (
      <div className="App d-flex">
        <div className="d-flex flex-column justify-content-center position-relative">
          <button className="btn btn-primary joiner"
            style={{visibility: this.isSeatAvailable("left") ? "visible" : "hidden"}}
            onClick={() => this.addPlayer("left")}>Join</button>

          <button className="btn btn-primary position-absolute joiner"
            style={{visibility: this.isUserPlaying("left") ? "visible" : "hidden"}}
            onClick={() => this.removePlayer("left")}>Exit</button>
        </div>

        <Canvas
          leftPlayer={this.props.leftPlayer}
          rightPlayer={this.props.rightPlayer}
          position={this.state.position}
          game={this.state.playing}
          ball={this.props.ball}
          movePlayer={this.props.movePlayer}/>

        <div className="d-flex flex-column justify-content-center position-relative">
          <button className="btn btn-primary joiner"
            style={{visibility: this.isSeatAvailable("right") ? "visible" : "hidden"}}
            onClick={() => this.addPlayer("right")}>Join</button>

          <button className="btn btn-primary position-absolute joiner"
              style={{visibility: this.isUserPlaying("right") ? "visible" : "hidden"}}
            onClick={() => this.removePlayer("right")}>Exit</button>
        </div>
      </div>
    );
  }
}

export default App;
