function getRandomInt(min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min)) + min
}

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

// Determines game status. Game is on when both seats (left, right) are occupied
function isGameOn(players) {
  const leftPlayer = players[0]
  const rightPlayer = players[1]

  return leftPlayer.id !== null && rightPlayer.id !== null

  // return players.reduce((status, player) => {
  //   return status && player.id !== null
  // }, true)
}

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
// Return list with nullified player
function nullifyPlayerId(players, nullifyCb) {
  return players.map(player => {
    if(nullifyCb(player)) {
      return Object.assign({}, player, {id: null})
    }
    else {
      return player
    }
  })
}

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
  getRandomInt,
  isGameOn,
  nullifyPlayerId,
  assignPlayerId,
  updatePlayerPosition
}
