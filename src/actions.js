import {C} from './constants'
import {getSocket} from './socket'

export const addPlayer = (side) => {
  getSocket().emit(C.ADD_PLAYER, {})
  
  return {
    type: C.ADD_PLAYER,
    payload:   {
        position:side,
        id: null,
        name: "",
        score: 0,
        x: -1,
        y: -1
    }
  }
}
