// TODO: Look into socket "connect" event
import {createStore} from 'redux'
import appReducer from './reducers'
import {A} from './actions'

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

const initializeSocket = (createStoreCb) => {
  const socket = io()

  socket.on("initialize", (initialState) => {
    const store = createStore(appReducer, initialState)
    createStoreCb(store);

    console.log("Connected to server socket");
    socket.on(A.ADD_PLAYER, (data) => {
      store.dispatch({
        type: A.ADD_PLAYER,
        payload: data
      })
    })

    socket.on(A.REMOVE_PLAYER, (data) => {
      store.dispatch({
        type: A.REMOVE_PLAYER,
        payload: data
      })
    })

    socket.on("UPDATE_PLAYER", (data) => {
      store.dispatch({
        type: A.UPDATE_PLAYER,
        payload: data
      })
    })

    socket.on("MOVE_BALL", (data) => {
      store.dispatch({
        type: A.MOVE_PLAYER,
        payload: data
      })
    })

    socket.on("START_GAME", (data) => {
      store.dispatch({
        type: A.START_GAME,
        payload: data
      })
    })

    socket.on("STOP_GAME", (data) => {
      store.dispatch({
        type: A.STOP_GAME,
        payload: data
      })
    })
  })
}

export default initializeSocket
