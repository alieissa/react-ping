const path = require("path")
const express = require("express")
const app = express()
const http = require("http").Server(app)
const io = require("socket.io")(http)


const state = {
  players: [
  {
      position:"left",
      id: null,
      name: "",
      score: 0,
      x: 0,
      y: 100
    },

  {
      position:"right",
      id: null,
      name: "",
      score: 0,
      x: 380,
      y: 100
    }
  ],
  ball: {
    x: 0,
    y: 0
  },
  game: 1
}

app.use('/', express.static("dist"))
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "dist/index.html"))
});

io.on('connection', (socket) => {
  socket.emit('initialize', state);

  socket.on("ADD_PLAYER", (player) => {
    state.players = state.players.map((__player__, i) => {
      if(__player__.position === player.position) {
        return Object.assign({}, __player__, {id: i})
      }
      else {
        return __player__
      }
    })

    socket.broadcast.emit('ADD_PLAYER', state)
  })

  socket.on('REMOVE_PLAYER', (player) => {
    state.players = state.players.map(__player__ => {

      if(__player__.id !== player.id) {
        return Object.assign({}, __player__, {id: null})
      }
      else {
        return __player__
      }
    })
    socket.broadcast.emit(state)
  })


  socket.on('UPDATE_PLAYER', (player) => {
    state.players = state.players.map(__player__ => {
      if(__player__.position === player.position) {
        return player
      }
      else {
        return __player__
      }
    })

    socket.broadcast.emit('UPDATE_PLAYER', player)
  })

  socket.on('MOVE_BALL', (ball) => {
    state.ball = Object.assign({}, ball)
    socket.broadcast.emit('MOVE_BALL', state)
  })
});

setInterval(function () {
  if(state.game === 1) {
    Object.assign(state.ball, {x: state.ball.x + 8, y: state.ball.y + 8})
    io.sockets.emit('MOVE_BALL', state.ball)
  }
}, 25);
http.listen(3000, () => {
  console.log("Listening on port 3000")
})
