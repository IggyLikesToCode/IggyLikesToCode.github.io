var whiteBall, blackBall;
const squares = [];

function startGame() {
  blackBall = new ball(225, 450, 5, "#11111a", 14, true);
  whiteBall = new ball(675, 450, 5, "#e5e8c3", 14, false);
  //document.body.style.zoom = document.innerWidth / 1519 * 90 + "%";

  for (let i = 0; i < 900; i += 30) {
    for (let j = 0; j < 900; j += 30) {
      if (i > 420) {
        squares.push(new component(i, j, 30, 30, true));
      }
      else {
        squares.push(new component(i, j, 30, 30, false));
      }
    }
  }

  myGameArea.start();

}

var myGameArea = {
  canvas: document.createElement("canvas"),
  start: function() {
    this.canvas.width = 900;
    this.canvas.height = 900;
    this.ctx = this.canvas.getContext("2d");
    document.body.insertBefore(this.canvas, document.body.childNodes[1]);
    this.interval = setInterval(updateGameArea, 20);
  },
  clear: function() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }
}

function ball(x, y, radius, color, speed, isBlack) {
  this.x = x;
  this.y = y;
  this.speedX = Math.random() * speed + 1;
  this.speedY = Math.random() * -speed - 1;
  this.radius = radius;
  this.color = color;
  this.isBlack = isBlack;
  this.update = function() {
    context = myGameArea.ctx;
    context.beginPath();
    context.fillStyle = this.color;
    context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    context.fill();
  }

  this.move = function() {
    this.x += this.speedX;
    this.y += this.speedY;
  }

  this.collision = function() {
    if (this.x + this.radius > myGameArea.canvas.width || this.x - this.radius < 0) {
      this.speedX *= -1;
    }
    if (this.y + this.radius > myGameArea.canvas.height || this.y - this.radius < 0) {
      this.speedY *= -1;
    }
  }

  this.isCrash = function(otherObj) {
    var myleft = this.x - this.radius;
    var myright = this.x + this.radius;
    var mytop = this.y - this.radius;
    var mybottom = this.y + this.radius;

    var otherleft = otherObj.x;
    var otherright = otherObj.x + otherObj.width;
    var othertop = otherObj.y;
    var otherbottom = otherObj.y + otherObj.height;

    if ((mybottom < othertop) ||
      (mytop > otherbottom) ||
      (myright < otherleft) ||
      (myleft > otherright)) {
      return {
        crash: false,
        side: null
      };
    }

    // Determine the side of the collision
    var crash = true;
    var side = null;

    if (mybottom >= othertop && mytop <= othertop) {
      side = 1;
    } else if (mytop <= otherbottom && mybottom >= otherbottom) {
      side = 1;
    } else if (myright >= otherleft && myleft <= otherleft) {
      side = 0;
    } else if (myleft <= otherright && myright >= otherright) {
      side = 0;
    }

    return {
      crash: crash,
      side: side
    };
  }
}

function component(x, y, width, height, isBlack) {
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
  this.isBlack = isBlack;
  this.update = function() {
    context = myGameArea.ctx;
    context.beginPath();
    if (this.isBlack) {
      context.fillStyle = "#11111a";
    } else {
      context.fillStyle = "#e5e8c3";
    }
    context.fillRect(this.x, this.y, this.width, this.height);
  }
}

function updateGameArea() {
  myGameArea.clear();
  for (let myPiece of squares) {
    myPiece.update();
  }


  whiteBall.move();
  whiteBall.update();
  for (let i = 0; i < 900; i++) {
    var crashed = whiteBall.isCrash(squares[i]);
    if (crashed.crash && squares[i].isBlack === false) {
      squares[i].isBlack = true;

      if (crashed.side === 0) {
        whiteBall.speedX *= -1;
      }
      else {
        whiteBall.speedY *= -1;
      }
    }
  }
  whiteBall.collision();

  blackBall.move();
  blackBall.update();
  for (let i = 0; i < 900; i++) {
    var crashed = blackBall.isCrash(squares[i]);
    if (crashed.crash && squares[i].isBlack === true) {
      squares[i].isBlack = false;

      if (crashed.side === 0) {
        blackBall.speedX *= -1;
      }
      else {
        blackBall.speedY *= -1;
      }
    }
  }
  blackBall.collision();

  let text = document.getElementById("score");

  let counter = 0;
  for (let myPiece of squares) {
    if (myPiece.isBlack === true)
      counter++;
  }

  text.textContent = "night " + counter + " | day " + (900 - counter);
}



