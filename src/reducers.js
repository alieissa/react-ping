//TODO: Why is object spread operator not working
import {A} from './actions'
import {combineReducers} from 'redux'

const players = (state = [], {type, payload}=action) => {
  switch(type) {
    case A.ADD_PLAYER:
      return [...state, payload]
    case A.REMOVE_PLAYER:
      return state.filter(player => player.id !== payload.id)
    case A.UPDATE_PLAYER:
      let otherPlayer = state.filter(player => player.id !== payload.id)

      return [...state, Object.assign({}, payload)]
    default:
      return state
  }
}


const ball = (state = {}, {type, payload} = action) => {
  switch(type) {
    case A.MOVE_BALL:
      return Object.assign({}, payload)
    default:
      return state
  }
}

const game = (state = 0, {type, payload} = action) => {
  switch(type) {
    case A.START_GAME:
      return 2
    case A.STOP_GAME:
      return 0
    default:
      return state
  }
}

export default combineReducers({
  players,
  ball,
  game
})
