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
      score: -1,
      x: -1,
      y: -1
    },

  {
      position:"right",
      id: null,
      name: "",
      score: -1,
      x: -1,
      y: -1
    }
  ],
  ball: {
    x: -1,
    y: -1
  },
  game: 0
}

app.use('/', express.static("dist"))
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "dist/index.html"))
});

io.on('connection', (socket) => {
  socket.emit('initialize', state);
});

http.listen(3000, () => {
  console.log("Listening on port 3000")
})
