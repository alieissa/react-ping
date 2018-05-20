//TODO: Clean up game board before rendering new state.
//TODO: Maybe better to have renderer in its own class
//TODO: hydrate local state from localStorage

import React, {Component} from 'react'
import {CONF} from '../config'

class Canvas extends Component{
  constructor() {
    super()

    this.state = {
      playing: false,
      position: ''
    }

    this.renderCanvas = this.renderCanvas.bind(this)
    this.addRightPlayer = this.addRightPlayer.bind(this)
    this.addLeftPlayer = this.addLeftPlayer.bind(this)
    this.handleMouseMove = this.handleMouseMove.bind(this)
    this.removeRightPlayer = this.removeRightPlayer.bind(this)
    this.removeLeftPlayer = this.removeLeftPlayer.bind(this)
  }

  componentWillMount() {

  }

  componentDidMount() {
    this.renderCanvas(this.props.leftPlayer, this.props.rightPlayer, this.props.ball)
  }

  componentWillUpdate() {
    // Clean up game board
  }


  componentDidUpdate() {
    this.renderCanvas(this.props.leftPlayer, this.props.rightPlayer, this.props.ball)
  }

  addRightPlayer() {
    const rightPlayer = {
      id: 1,
      position: 'right',
      x: CONF.CANVAS_WIDTH - CONF.PADDLE_WIDTH,
      y: CONF.CANVAS_HEIGHT / 2 - CONF.PADDLE_HEIGHT / 2
    }
    this.props.addPlayer(rightPlayer)

    this.setState({
      playing: true,
      position: 'right'
    })
  }

  addLeftPlayer() {
    const leftPlayer = {
      id: 0,
      position: 'left',
      x: 0,
      y: CONF.CANVAS_HEIGHT / 2 - CONF.PADDLE_HEIGHT / 2
    }
    this.props.addPlayer(leftPlayer)

    this.setState({
      playing: true,
      position: 'left'
    })
  }

  removeRightPlayer() {
    this.setState({
      playing: false,
      position: 'right'
    })

    const rightPlayer = Object.assign({}, this.props.rightPlayer, {id: null})
    this.props.removePlayer(rightPlayer)
  }

  removeLeftPlayer() {
    this.setState({
      playing: false,
      position: 'left'
    })

    const leftPlayer = Object.assign({}, this.props.leftPlayer, {id: null})
    this.props.removePlayer(leftPlayer)
  }

  handleMouseMove(evt) {
    if(this.state.position === 'left' && this.state.playing) {
      let leftPaddle = {
        x: 0,
        y: (evt.clientY - this.refs.canvasContainer.getBoundingClientRect().y) - CONF.PADDLE_HEIGHT / 2
      }
      this.renderCanvas(leftPaddle, this.props.rightPlayer, this.props.ball)

      this.props.movePlayer(Object.assign(this.props.leftPlayer, leftPaddle))
    }

    if(this.state.position === 'right' && this.state.playing) {
      let rightPaddle = {
        x: CONF.CANVAS_WIDTH - CONF.PADDLE_WIDTH,
        y: (evt.clientY - this.refs.canvasContainer.getBoundingClientRect().y) - CONF.PADDLE_HEIGHT / 2
      }
      this.renderCanvas(this.props.leftPlayer, rightPaddle, this.props.ball)

      this.props.movePlayer(Object.assign(this.props.rightPlayer, rightPaddle))
    }
  }

  isPlaying(side) {
    return this.state.playing && this.state.position===side
  }

  isLeftAvailable() {
    return this.props.leftPlayer.id === null && !this.state.playing
  }

  isRightAvailable() {
    return this.props.rightPlayer.id === null && !this.state.playing
  }


  isRightPlaying() {
    const isPlaying = this.props.rightPlayer.id !== null && this.state.playing && this.state.position === 'right'
    return isPlaying
  }

  isLeftPlaying() {
    const isPlaying = this.props.leftPlayer.id !== null && this.state.playing && this.state.position === 'left'
    return isPlaying
  }

  renderCanvas(leftPlayer, rightPlayer, ball) {
    // Redraw canvas
    const cvs = this.refs.canvas
    const ctx = cvs.getContext("2d")

    ctx.clearRect(0, 0, cvs.width, cvs.height)

    // left player
    ctx.fillStyle = 'green';
    ctx.fillRect(leftPlayer.x, leftPlayer.y, CONF.PADDLE_WIDTH, CONF.PADDLE_HEIGHT);

    // right player
    ctx.fillStyle = 'blue'
    ctx.fillRect(rightPlayer.x, rightPlayer.y, CONF.PADDLE_WIDTH, CONF.PADDLE_HEIGHT);

    // ball
    ctx.fillStyle = "black"
    ctx.fillRect(ball.x, ball.y, CONF.BALL_RADIUS, CONF.BALL_RADIUS);
  }

  render() {
    return (
      <div className="App d-flex">
        <div className="d-flex flex-column justify-content-center">
          <button className="btn btn-primary joiner"
            style={{display: this.isLeftAvailable() ? "block" : "none"}}
            onClick={this.addLeftPlayer}>Join</button>

          <button className="btn btn-primary joiner"
            style={{display: this.isLeftPlaying() ? "block" : "none"}}
            onClick={this.removeLeftPlayer}>Exit</button>
        </div>

        <div ref="canvasContainer" className="canvasContainer" onMouseMove={this.handleMouseMove}>
          <canvas ref="canvas" width="400" height="400"></canvas>
        </div>

        <div className="d-flex flex-column justify-content-center">
          <button className="btn btn-primary joiner"
            style={{display: this.isRightAvailable() ? "block" : "none"}}
            onClick={this.addRightPlayer}>Join</button>

          <button className="btn btn-primary joiner"
            style={{display: this.isRightPlaying() ? "block" : "none"}}
            onClick={this.removeRightPlayer}>Exit</button>
        </div>
      </div>
    )
  }
}

export default Canvas
