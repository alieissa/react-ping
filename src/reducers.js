//TODO: Why is object spread operator not working
import {C} from './constants'
import {combineReducers} from 'redux'

const players = (state = [], {type, payload}=action) => {
  switch(type) {
    case C.ADD_PLAYER:
      return [...state, payload]
    case C.REMOVE_PLAYER:
      return state.filter(player => player.id !== payload.id)
    case C.UPDATE_PLAYER:
      let otherPlayer = state.filter(player => player.id !== payload.id)

      return [...state, Object.assign({}, payload)]
    default:
      return state
  }
}


const ball = (state = {}, {type, payload} = action) => {
  switch(type) {
    case C.MOVE_BALL:
      return Object.assign({}, payload)
    default:
      return state
  }
}

const game = (state = 0, {type, payload} = action) => {
  switch(type) {
    case C.START_GAME:
      return 2
    case C.STOP_GAME:
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
