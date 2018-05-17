// TODO: Look into socket "connect" event
import {createStore} from 'redux'
import appReducer from './reducers'
import {C} from './constants'

var socket

const handleAddPlayer = () => {
  // Add player to state
}

const handleRemovPlayer = () => {
  // Remove player from state
}

const handleMoveBall = () => {
  // Move ball in canvas
}

const handleUpdatePlayer = () => {
  // Update player score, x pos, or y pos
}

const handleStartGame = () => {
  // Start game. Countdown from 5
}


const handleStopGame = () => {
  // Stop game.
}

export const initializeSocket = (createStoreCb) => {
  socket = io()

  socket.on("initialize", (initialState) => {
    const store = createStore(appReducer, initialState)
    createStoreCb(store);

    console.log("Connected to server socket");

    socket.on(C.ADD_PLAYER, (data) => {
      store.dispatch({
        type: C.ADD_PLAYER,
        payload: data
      })
    })

    socket.on(C.REMOVE_PLAYER, (data) => {
      store.dispatch({
        type: C.REMOVE_PLAYER,
        payload: data
      })
    })

    socket.on(C.UPDATE_PLAYER, (data) => {
      store.dispatch({
        type: C.UPDATE_PLAYER,
        payload: data
      })
    })

    socket.on(C.MOVE_BALL, (data) => {
      store.dispatch({
        type: C.MOVE_BALL,
        payload: data
      })
    })

    socket.on("START_GAME", (data) => {
      store.dispatch({
        type: C.START_GAME,
        payload: data
      })
    })

    socket.on("STOP_GAME", (data) => {
      store.dispatch({
        type: C.STOP_GAME,
        payload: data
      })
    })
  })
}

export const getSocket = () => {
  return socket;
}
