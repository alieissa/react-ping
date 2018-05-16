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
    x: 200,
    y: 200
  },
  game: 0
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
    console.info('Added Player', state)
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
    console.info('Removed Player', state.players)
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

http.listen(3000, () => {
  console.log("Listening on port 3000")
})
