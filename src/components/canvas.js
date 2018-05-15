import React, {Component} from 'react'

class Canvas extends Component{

  constructor() {
    super()

    this.PADDLE_HEIGHT = 100
    this.PADDLE_WIDTH = 10

    this.renderCanvas = this.renderCanvas.bind(this)
    this.handleMouseMove = this.handleMouseMove.bind(this)
  }
  componentWillMount() {

  }

  componentDidMount() {
    this.renderCanvas(this.props.leftPlayer)
  }

  componentWillUpdate() {

  }


  componentDidUpdate() {

  }

  handleMouseMove(evt) {
    const playerLeftPos = {
      x: 0,
      y: evt.clientY - this.refs.canvasContainer.getBoundingClientRect().y
    }

    this.renderCanvas(playerLeftPos, {}, {})
  }

  renderCanvas(lPlayer, rPlayer, ball) {
    // Redraw canvas
    const cvs = this.refs.canvas
    const ctx = cvs.getContext("2d")

    ctx.clearRect(0, 0, cvs.width, cvs.height)

    // left player
    ctx.fillStyle = 'green';
    ctx.fillRect(0, lPlayer.y - this.PADDLE_HEIGHT / 2, 20, 100);

    // right player
    ctx.fillStyle = 'blue'
    ctx.fillRect(cvs.width - 10, 10, 10, 100);

    // ball
    ctx.fillStyle = "black"
    ctx.fillRect(cvs.width / 2, cvs.height / 2, 15, 15);
  }

  render() {
    return (
      <div ref="canvasContainer" className="canvasContainer" onMouseMove={this.handleMouseMove}>
        <canvas ref="canvas" width="400" height="400"></canvas>
      </div>
    )
  }
}

export default Canvas
