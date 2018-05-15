import Canvas from './canvas'
import {connect} from 'react-redux'

const mapStateToProps = (state) => {
  return {
    leftPlayer: state.players.find(player => player.position === 'left'),
    rightPlayer: state.players.find(player => player.position === 'right'),
    ball: state.ball
  }
}

const Container = connect(mapStateToProps)(Canvas)
export default Container
