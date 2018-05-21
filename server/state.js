const CONF = {
  PADDLE_WIDTH: 20,
  PADDLE_HEIGHT: 100,
  CANVAS_HEIGHT: 400,
  CANVAS_WIDTH: 600,
  BALL_RADIUS: 20
}

module.exports = {
  "players": [
  {
      "position":"left",
      "id": null,
      "name": "",
      "score": 0,
      "x": CONF.PADDLE_WIDTH,
      "y": CONF.CANVAS_HEIGHT / 2 - CONF.PADDLE_HEIGHT / 2
    },

  {
      "position":"right",
      "id": null,
      "name": "",
      "score": 0,
      "x": CONF.CANVAS_WIDTH - CONF.PADDLE_WIDTH * 2,
      "y": CONF.CANVAS_HEIGHT / 2 - CONF.PADDLE_HEIGHT / 2
    }
  ],
  "ball": {
    "x": CONF.CANVAS_WIDTH / 2 - CONF.BALL_RADIUS / 2,
    "y": CONF.CANVAS_HEIGHT / 2 - CONF.BALL_RADIUS / 2
  },
  "game": false
}
