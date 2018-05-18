//TODO: Clean up all code
const path = require("path")
const express = require("express")
const app = express()
const http = require("http").Server(app)
const io = require("socket.io")(http)


const getRandomInt = (min, max) => {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min)) + min
}

let dx = getRandomInt(8, 10)
let dy = getRandomInt(8, 10)

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

  socket.on("ADD_PLAYER", (newPlayer) => {
    state.players = state.players.map((__player__, i) => {
      if(__player__.position === newPlayer.position) {
        return Object.assign({}, __player__, newPlayer)
      }
      else {
        return __player__
      }
    })
    console.log('Player added', state.players)
    socket.broadcast.emit('ADD_PLAYER', newPlayer)
  })

  socket.on('REMOVE_PLAYER', (player) => {
    state.players = state.players.map(__player__ => {
      if(__player__.position === player.position) {
        return Object.assign({}, __player__,player)
      }
      else {
        return __player__
      }
    })
    console.log('Player', player)
    console.log('Removed player', state)
    socket.broadcast.emit('REMOVE_PLAYER', player)
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
    if(state.ball.x >= 400 || state.ball.x < 0) {
      dx = dx*-1
    }
    if(state.ball.y >= 400 || state.ball.y < 0) {
      dy = dy*-1
    }
    Object.assign(state.ball, {x: state.ball.x + dx, y: state.ball.y + dy})
    io.sockets.emit('MOVE_BALL', state.ball)
  }
}, 25);
http.listen(3000, () => {
  console.log("Listening on port 3000")
})
