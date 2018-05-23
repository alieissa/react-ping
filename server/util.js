const CONF = {
  PADDLE_WIDTH: 20,
  PADDLE_HEIGHT: 100,
  CANVAS_HEIGHT: 400,
  CANVAS_WIDTH: 600,
  BALL_RADIUS: 20
}

function getRandomInt(min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min)) + min
}

// Check if ball hits left paddle
function detectLeftPaddle(ball, paddle) {
  if(ball.y > paddle.y) {
    return ball.x <= CONF.PADDLE_WIDTH * 2 && (paddle.y + CONF.PADDLE_HEIGHT) > ball.y
  }
  else {
    return ball.x <= CONF.PADDLE_WIDTH * 2 && (paddle.y < (ball.y + CONF.BALL_RADIUS))
  }
}

// Check if ball hits right paddle
function detectRightPaddle(ball, paddle) {
  if(ball.y > paddle.y){
    return (ball.x  + CONF.BALL_RADIUS) >= CONF.CANVAS_WIDTH - CONF.PADDLE_WIDTH * 2 && (paddle.y + CONF.PADDLE_HEIGHT) > ball.y
  }
  else {
    return (ball.x  + CONF.BALL_RADIUS) >= CONF.CANVAS_WIDTH - CONF.PADDLE_WIDTH * 2 && (paddle.y < (ball.y + CONF.BALL_RADIUS))
  }
}

// Check if ball hits upper boundary
function detectUpperBoundary(ball) {
  const isInXBounds = ball.x > CONF.PADDLE_WIDTH * 2 && ball.x < CONF.CANVAS_WIDTH - CONF.PADDLE_WIDTH * 2
  const isUnderUpperBoundary = ball.y <= 0
  return isInXBounds && isUnderUpperBoundary
}

// Check if ball hits lower boundary
function detectLowerBoundary(ball) {
  const isInXBounds = ball.x > CONF.PADDLE_WIDTH * 2 && ball.x < CONF.CANVAS_WIDTH - CONF.PADDLE_WIDTH * 2
  const isAboveLowerBoundary = ball.y >= CONF.CANVAS_HEIGHT - CONF.BALL_RADIUS
  return isInXBounds && isAboveLowerBoundary
}

// Detect if left player scored
function detectLeftScore(ball) {
  return ball.x > CONF.CANVAS_WIDTH - CONF.PADDLE_WIDTH * 2
}

// Detect if right player scored
function detectRightScore(ball) {
  return ball.x < CONF.PADDLE_WIDTH
}

// Get coords to center ball
function getCenterCoords() {
  return {
    x: CONF.CANVAS_WIDTH / 2 - CONF.BALL_RADIUS / 2,
    y: CONF.CANVAS_HEIGHT / 2 - CONF.BALL_RADIUS / 2
  }
}

// Determines game status. Game is on when both seats (left, right) are occupied
function isGameOn(players) {
  const leftPlayer = players[0]
  const rightPlayer = players[1]

  return leftPlayer.id !== null && rightPlayer.id !== null
}

// Assigns id to player. Also used to remove player. i.e. id of null
function assignPlayerId(id, players, assignCb) {
  return players.map(player => {
    if(assignCb(player)) {
      return Object.assign({}, player, {id: id})
    }
    else {
      return player
    }
  })
}

// Updates player (paddle) position
function updatePlayerPosition(position, players, updateCb) {
  return players.map(player => {
    if(updateCb(player)) {
      return Object.assign({}, player, position)
    }
    else {
      return player
    }
  })
}

module.exports = {
  detectLeftPaddle,
  detectRightPaddle,
  detectLowerBoundary,
  detectUpperBoundary,
  detectLeftScore,
  detectRightScore,
  getRandomInt,
  getCenterCoords,
  isGameOn,
  assignPlayerId,
  updatePlayerPosition
}
