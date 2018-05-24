import {connect} from 'react-redux'
import App from './App'
import {
  addPlayer,
  movePlayer,
  removePlayer,
  moveBall
 } from './actions'

const mapStateToProps = (state) => {
  return {
    leftPlayer: state.players.find(player => player.position === 'left'),
    rightPlayer: state.players.find(player => player.position === 'right'),
    ball: Object.assign({}, state.ball)
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
    },
    moveBall: (ball) => {
      dispatch(moveBall(ball))
    }
  }
}

const Container = connect(mapStateToProps, mapDispatchToProps)(App)
export default Container
