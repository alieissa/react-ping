//TODO: Clean up all code
//TODO: Create ball class

const path = require('path')
const express = require('express')
const app = express()
const http = require("http").Server(app)
const io = require("socket.io")(http)

const _u = require('./util.js')
const state = require('./state.js')

app.use('/', express.static('dist'))
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'))
});

let dx = _u.getRandomInt(8, 10)
let dy = _u.getRandomInt(8, 10)

io.on('connection', (socket) => {
  socket.emit('initialize', state);

  // Remove player when connection lost
  socket.on('disconnect', () => {
    state.players = _u.assignPlayerId(null, state.players, (player) => player.id === socket.id)
    state.game = _u.isGameOn(state.players)
    state.ball = _u.getCenterCoords()
  })

  socket.on('ADD_PLAYER', (newPlayer) => {
    state.players = _u.assignPlayerId(socket.id, state.players, (player) => newPlayer.position === player.position)
    state.game = _u.isGameOn(state.players)

    socket.broadcast.emit('ADD_PLAYER', newPlayer)
  })

  socket.on('REMOVE_PLAYER', (player) => {
    state.players = _u.assignPlayerId(null, state.players, (__player__) => __player__.position === player.position)
    state.game = _u.isGameOn(state.players)
    state.ball = Object.assign({}, state.ball, _u.getCenterCoords())
    dx = _u.getRandomInt(8, 10)
    dy = _u.getRandomInt(8, 10)
    io.sockets.emit('MOVE_BALL', state.ball)
    socket.broadcast.emit('REMOVE_PLAYER', player)
  })

  socket.on('UPDATE_PLAYER', (player) => {
    const position = {x: player.x, y: player.y}
    state.players = _u.updatePlayerPosition(position, state.players, (__player__) => __player__.position === player.position)
    socket.broadcast.emit('UPDATE_PLAYER', player)
  })

  socket.on('MOVE_BALL', (ball) => {
    state.ball = Object.assign({}, ball)
    socket.broadcast.emit('MOVE_BALL', state)
  })
})

const intervalRender = setInterval(function () {
  const leftPlayer = state.players[0]
  const rightPlayer = state.players[1]
  const ball = state.ball

  if(state.game && _u.detectLeftScore(state.ball)) {
    state.players[0] = Object.assign({}, state.players[0], {score: state.players[0].score + 1})
    state.ball = Object.assign({}, state.ball, _u.getCenterCoords())
    dx = _u.getRandomInt(8, 10)
    dy = _u.getRandomInt(8, 10)
    io.sockets.emit('MOVE_BALL', state.ball)
    io.sockets.emit('UPDATE_PLAYER', state.players[0])
  }

  if(state.game && _u.detectRightScore(state.ball)) {
    state.players[1] = Object.assign({}, state.players[1], {score: state.players[1].score + 1})
    state.ball = Object.assign({}, state.ball, _u.getCenterCoords())
    dx = _u.getRandomInt(8, 10)
    dy = _u.getRandomInt(8, 10)
    io.sockets.emit('MOVE_BALL', state.ball)
    io.sockets.emit('UPDATE_PLAYER', state.players[1])
  }

  if(state.game) {
    if(_u.detectLeftPaddle(state.ball, leftPlayer) || _u.detectRightPaddle(state.ball, rightPlayer)) {
      dx = dx*-1
    }

    if(_u.detectLowerBoundary(state.ball) || _u.detectUpperBoundary(state.ball)) {
      dy = dy*-1
    }

    state.ball = {
      x: state.ball.x + dx,
      y: state.ball.y + dy
    }

    io.sockets.emit('MOVE_BALL', state.ball)
  }
}, 50)


http.listen(3000, () => {
  console.log("Listening on port 3000")
})
