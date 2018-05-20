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

let dx = getRandomInt(1, 2)*-1
// let dy = getRandomInt(8, 10)
let dy = getRandomInt(1, 2)*1

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
    x: 300,
    y: 150
  },
  game: true
}

app.use('/', express.static("dist"))
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "dist/index.html"))
});

io.on('connection', (socket) => {
  socket.emit('initialize', state);

  // Remove player when connection lost
  socket.on('disconnect', () => {
    console.log('Disconnected socket', socket.id)
    const socketIds = Object.keys(io.sockets.sockets)

    socketIds.map(socketId => {
      state.players = state.players.map(player => {
        if(player.id === socketId) {
          return Object.assign({}, player, {id: null})
        }
        else {
          return player
        }
      })
    })
  })

  socket.on("ADD_PLAYER", (newPlayer) => {
    // New player gets socket id
    state.players = state.players.map((__player__, i) => {
      if(__player__.position === newPlayer.position) {
        return Object.assign({}, __player__, newPlayer, {id: socket.id})
      }
      else {
        return __player__
      }
    })

    // Turn on game if two players
    const isGameOn = state.players.reduce((status, player) => {
      return status && player.id !== null
    }, true)

    state.game = isGameOn
    console.log('Player added', state)
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

function detectLeftPaddle(ball, paddle) {
  // |;
  if(ball.y > paddle.y) {
    return ball.x <= 20 && (paddle.y + 100) > ball.y
  }
  else {
    return ball.x <= 20 && (paddle.y < (ball.y + 20))
  }
}

function detectRightPaddle(ball, paddle) {
  if(ball.y > paddle.y){
    return ball.x >= 360 && (paddle.y + 100) > ball.y
  }
  else {
    return ball.x >= 360 && (paddle.y < (ball.y + 20))
  }
}

function detectUpperBoundary(ball) {
  if((ball.x > 20 && ball.x < 360) && ball.y <= 0) {
    return true
  }
  else {
    return false
  }
}

function detectLowerBoundary(ball) {
  if((ball.x > 20 && ball.x < 360) && ball.y >= 380) {
    return true
  }
  else {
    return false
  }
}

const intervalRender = setInterval(function () {
  if(state.game) {
    if(detectLeftPaddle(state.ball, state.players[0])) {
      dx = dx*-1
    }

    if(detectRightPaddle(state.ball, state.players[1])) {
      dx = dx*-1
    }

    if(detectLowerBoundary(state.ball)) {
      dy = dy*-1
    }

    if(detectUpperBoundary(state.ball)) {
      dy = dy*-1
    }

    state.ball = {
      x: state.ball.x + dx
      , y: state.ball.y + dy

    }
    io.sockets.emit('MOVE_BALL', state.ball)
  }
}, 25);


http.listen(3000, () => {
  console.log("Listening on port 3000")
})
