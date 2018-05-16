import {connect} from 'react-redux'
import Canvas from './canvas'
import {addPlayer, movePlayer, removePlayer} from '../actions'

const mapStateToProps = (state) => {
  return {
    leftPlayer: state.players.find(player => player.position === 'left'),
    rightPlayer: state.players.find(player => player.position === 'right'),
    ball: state.ball
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addPlayer: (player) => {
      dispatch(addPlayer(player))
    },
    movePlayer: (player) => {
      dispatch(movePlayer(player))
    },
    removePlayer: (player) => {
      dispatch(removePlayer(player))
    }
  }
}

const Container = connect(mapStateToProps, mapDispatchToProps)(Canvas)
export default Container
