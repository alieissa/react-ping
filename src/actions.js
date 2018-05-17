//TODO: Clean up ADD_PLAYER action creator

import {C} from './constants'
import {getSocket} from './socket'

export const addPlayer = (player) => {
  getSocket().emit(C.ADD_PLAYER, player)

  return {
    type: C.ADD_PLAYER,
    payload:   {
        position:player.position,
        id: null,
        name: "",
        score: 0,
        x: player.x,
        y: player.y
    }
  }
}

export const movePlayer = (player) => {
  getSocket().emit(C.UPDATE_PLAYER, player)

  return {
    type: C.UPDATE_PLAYER,
    payload: player
  }
}

export const removePlayer = (player) => {
  getSocket().emit(C.REMOVE_PLAYER, player)

  return {
    type: C.REMOVE_PLAYER,
    payload: player
  }
}


export const moveBall = (ball) => {
  getSocket().emit(C.MOVE_BALL, ball)

  return {
    type: C.MOVE_BALL,
    payload: ball
  }
}
