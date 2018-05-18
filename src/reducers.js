//TODO: General clean up
import {C} from './constants'
import {combineReducers} from 'redux'

const players = (state = [], {type, payload}=action) => {
  switch(type) {
    case C.ADD_PLAYER:
      const players = state.map(__player__ => {
        if(__player__.position === payload.position) {
          return Object.assign({}, __player__, payload)
        }
        else {
          return __player__
        }
      })
      return players
    case C.REMOVE_PLAYER:
      return state.map(player => {
        if(player.position === payload.position) {
          return Object.assign({}, player, payload)
        }
        else {
          return player
        }
      })
    case C.UPDATE_PLAYER:
      let otherPlayers = state.filter(player => player.position !== payload.position)
      return [...otherPlayers, Object.assign({}, payload)]
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
