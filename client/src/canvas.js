//TODO: Look into using requestAnimationFrame usage to fix flicker problem

import React, {Component} from 'react'
import CONF from './config'

class Canvas extends Component{
  constructor() {
    super()
    this.renderCanvas = this.renderCanvas.bind(this)
    this.handleMouseMove = this.handleMouseMove.bind(this)
  }

  componentDidMount() {
    const cvs = this.refs.canvas
    this.ctx = cvs.getContext("2d")
    this.renderCanvas(this.ctx, this.props.leftPlayer, this.props.rightPlayer, this.props.ball)
  }

  componentDidUpdate() {
    this.renderCanvas(this.ctx, this.props.leftPlayer, this.props.rightPlayer, this.props.ball)
  }

  handleMouseMove(evt) {
    // Not being played
    if(!this.props.game) {
      return
    }

    let leftPaddle
    let rightPaddle
    let movedPlayer = {}

    // Calculates the coords of paddle
    let _getPaddleXY = (canvasY, containerY, position) => {
      return {
        x: position === 'left' ? CONF.PADDLE_WIDTH : CONF.CANVAS_WIDTH - CONF.PADDLE_WIDTH * 2 ,
        y: (canvasY - containerY) - CONF.PADDLE_HEIGHT / 2
      }
    }

    if(this.props.position === 'left') {
      leftPaddle = _getPaddleXY(evt.clientY, this.refs.canvasContainer.getBoundingClientRect().y, 'left')
      rightPaddle = this.props.rightPlayer
      movedPlayer = Object.assign({}, this.props.leftPlayer, leftPaddle)
    }

    if(this.props.position === 'right') {
      leftPaddle = this.props.leftPlayer
      rightPaddle = _getPaddleXY(evt.clientY, this.refs.canvasContainer.getBoundingClientRect().y, 'right')
      movedPlayer = Object.assign({}, this.props.rightPlayer, rightPaddle)
    }

    this.renderCanvas(this.ctx, leftPaddle, rightPaddle, this.props.ball)
    this.props.movePlayer(movedPlayer)
  }

  renderCanvas(ctx, leftPlayer, rightPlayer, ball) {
    ctx.fillStyle = "rgb(34, 34, 34)"
    ctx.fillRect(0, 0, CONF.CANVAS_WIDTH, CONF.CANVAS_HEIGHT)

    //Divider
    ctx.beginPath();
    ctx.setLineDash([5, 15]);
    ctx.moveTo(300, 5);
    ctx.lineTo(300, 400);
    ctx.strokeStyle = "rgb(246, 223, 14)"
    ctx.stroke();

    // Score
    ctx.font="20px Georgia";
    ctx.fillStyle = 'rgb(255, 255, 255)'
    ctx.fillText(leftPlayer.score, 150, 40);
    ctx.fillText(rightPlayer.score, 450, 40);

    // left player
    ctx.fillStyle = 'rgb(246, 223, 14)'
    ctx.fillRect(leftPlayer.x, leftPlayer.y, CONF.PADDLE_WIDTH, CONF.PADDLE_HEIGHT);

    // right player
    ctx.fillStyle = 'rgb(246, 223, 14)'
    ctx.fillRect(rightPlayer.x, rightPlayer.y, CONF.PADDLE_WIDTH, CONF.PADDLE_HEIGHT);

    // ball
    ctx.fillStyle = "rgb(246, 223, 14)"
    ctx.fillRect(ball.x, ball.y, CONF.BALL_RADIUS, CONF.BALL_RADIUS);
  }

  render() {
    return (
      <div ref="canvasContainer" className="canvasContainer" onMouseMove={this.handleMouseMove}>
        <canvas ref="canvas" width="600" height="400"></canvas>
      </div>
    )
  }
}

export default Canvas
