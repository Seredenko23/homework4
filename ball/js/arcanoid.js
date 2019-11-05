document.onreadystatechange = function () {
  if (document.readyState === 'complete') {
    const retryButton = document.getElementById('retry')
    const brickSound = document.getElementById('brick')
    const gameOver = document.getElementById('gameOver')
    const win = document.getElementById('win')
    const canvas = document.getElementById('Game')
    const fakeBall = document.getElementById('ball')
    const ctx = canvas.getContext('2d')
    const ballRadius = 16
    let x = canvas.width / 2
    let y = canvas.height - 30
    let dx = 4
    let dy = -4
    const paddleHeight = 24
    const paddleWidth = 140
    let paddleX = (canvas.width - paddleWidth) / 2
    let rightPressed = false
    let leftPressed = false
    const brickRowCount = 6
    const brickColumnCount = 6
    const brickWidth = 120
    const brickHeight = 30
    const brickPadding = 20
    const brickOffsetTop = 60
    const brickOffsetLeft = 80
    let score = 0
    let gameStatus = 1
    const gameResult = document.getElementById('result')

    const bricks = []
    for (let c = 0; c < brickColumnCount; c++) {
      bricks[c] = []
      for (let r = 0; r < brickRowCount; r++) {
        bricks[c][r] = { x: 0, y: 0, status: 1 }
      }
    }

    document.addEventListener('keydown', keyDownHandler, false)
    document.addEventListener('keyup', keyUpHandler, false)
    fakeBall.addEventListener('click', clickHandler, false)
    retryButton.addEventListener('click', () => {
      document.location.reload()
    })

    function collisionDetection () {
      for (let c = 0; c < brickColumnCount; c++) {
        for (let r = 0; r < brickRowCount; r++) {
          const b = bricks[c][r]
          if (b.status) {
            if (x > b.x && x < b.x + brickWidth && y > b.y && y < b.y + brickHeight) {
              dy = -dy
              b.status = 0
              score++
              brickSound.play()
              if (score === brickColumnCount * brickRowCount) {
                win.play()
                gameStatus = 0
                gameResult.textContent = 'You Won!My congratulations!'
              }
            }
          }
        }
      }
    }

    function drawScore () {
      ctx.font = '24px Arial'
      ctx.fillStyle = '#0095DD'
      ctx.fillText('Score: ' + score, 8, 20)
    }

    function drawBall () {
      ctx.beginPath()
      ctx.arc(x, y, ballRadius, 0, Math.PI * 2)
      ctx.fillStyle = '#0095DD'
      ctx.fill()
      ctx.closePath()
    }

    function drawPaddle () {
      ctx.beginPath()
      ctx.rect(paddleX, canvas.height - paddleHeight,
        paddleWidth, paddleHeight)
      ctx.fillStyle = '#0095DD'
      ctx.fill()
      ctx.closePath()
    }

    function drawBricks () {
      for (let c = 0; c < brickColumnCount; c++) {
        for (let r = 0; r < brickRowCount; r++) {
          if (bricks[c][r].status) {
            const brickX = (c * (brickWidth + brickPadding)) + brickOffsetLeft
            const brickY = (r * (brickHeight + brickPadding)) + brickOffsetTop
            bricks[c][r].x = brickX
            bricks[c][r].y = brickY
            ctx.beginPath()
            ctx.rect(brickX, brickY, brickWidth, brickHeight)
            ctx.fillStyle = '#0095DD'
            ctx.fill()
            ctx.closePath()
          }
        }
      }
    }

    function draw () {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      drawBricks()
      drawBall()
      drawPaddle()
      collisionDetection()
      drawScore()
      if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
        dx = -dx
      }
      if (y + dy < ballRadius) {
        dy = -dy
      } else if (y + dy > canvas.height - ballRadius) {
        if (x > paddleX && x < paddleX + paddleWidth) {
          dy = -dy
        } else {
          gameOver.play()
          gameStatus = 0
          gameResult.textContent = 'You lose!'
        }
      }

      if (rightPressed) {
        paddleX += 7
        if (paddleX + paddleWidth > canvas.width) {
          paddleX = canvas.width - paddleWidth
        }
      } else if (leftPressed) {
        paddleX -= 7
        if (paddleX < 0) {
          paddleX = 0
        }
      }
      x += dx
      y += dy
      if (gameStatus) {
        requestAnimationFrame(draw)
      }
    }

    function keyDownHandler (e) {
      if (e.key === 'Right' || e.key === 'ArrowRight') {
        rightPressed = true
      } else if (e.key === 'Left' || e.key === 'ArrowLeft') {
        leftPressed = true
      }
    }

    function keyUpHandler (e) {
      if (e.key === 'Right' || e.key === 'ArrowRight') {
        rightPressed = false
      } else if (e.key === 'Left' || e.key === 'ArrowLeft') {
        leftPressed = false
      }
    }

    function clickHandler (e) {
      e.target.style.display = 'none'
      draw()
    }
  }
}
