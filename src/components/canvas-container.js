import {connect} from 'react-redux'
import Canvas from './canvas'
import {addPlayer} from '../actions'

const mapStateToProps = (state) => {
  return {
    leftPlayer: state.players.find(player => player.position === 'left'),
    rightPlayer: state.players.find(player => player.position === 'right'),
    ball: state.ball
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    handleJoin: (side) => {
      dispatch(addPlayer(side))
    }
  }
}

const Container = connect(mapStateToProps, mapDispatchToProps)(Canvas)
export default Container
