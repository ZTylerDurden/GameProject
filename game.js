var canvas = document.getElementsByTagName('canvas')[0]
var ctx = canvas.getContext("2d");
var gameStarted = false;

var startGame = () => {
    start();
    stop();
    updateCanvas();
    ctx.font = "30px Copperplate";
    ctx.fillStyle = 'yellow';
    ctx.fillText("Press ENTER To Start!",230,300);
    
    
}

var winGame = () => {
    if (boss.health === 0) {
        stop();
        ctx.font = "30px Copperplate";
        ctx.fillStyle = 'yellow';
        ctx.fillText("You WIN!",330,300);
        youWin.play();
        firePlaceOne.draw();
        firePlaceTwo.draw();
        firePlaceThree.draw();
        firePlaceFour.draw();
        firePlaceFive.draw();
    }
};

var start = () => {
  intervalId = setInterval(updateCanvas, 20);
  
};
var frameNo = 0;
var stop = () => {
  clearInterval(intervalId);
}
var clear = () => {
  ctx.clearRect(0,0,800,612);
}

var bsImg = new Image();
bsImg.src = "images/ContraBlueMan.png";

var bBImage = new Image();
bBImage.src = "images/BassBuster1.png";

var bossImage = new Image();
bossImage.src = "images/Boss1.png";

var bossBulletImg = new Image();
bossBulletImg.src = "images/BossBullet.png";

var rightBulletImg = new Image();
rightBulletImg.src = "images/RightShot.png";

var leftBulletImg = new Image();
leftBulletImg.src = "images/LeftShot.png";

var busterPulse = new Audio("Mp3/BusterShot.mp3")

var contraLevel = new Audio("Mp3/ContraL1.mp3")

var youLose = new Audio("Mp3/YouLose.mp3")

var youWin = new Audio("Mp3/YouWin.mp3")

var bloop = new Audio("Mp3/Bloop.mp3")


var fireOneImg = new Image();
fireOneImg.src = "images/Fire.png"


var shotsArr = [];
var bossShotsArr = [];
var rightShotArr = [];
var leftShotArr = [];


var firePlaceOne = {
    x:200,
    y: 90,
    width: 107,
    height: 109,
    image: fireOneImg,
    draw: function() {
      ctx.drawImage(this.image, this.x, this.y, 107, 109);
    }
}

var firePlaceTwo = {
    x:270,
    y: 90,
    width: 107,
    height: 109,
    image: fireOneImg,
    draw: function() {
      ctx.drawImage(this.image, this.x, this.y, 107, 109);
    }
}
var firePlaceThree = {
    x:340,
    y: 90,
    width: 107,
    height: 109,
    image: fireOneImg,
    draw: function() {
      ctx.drawImage(this.image, this.x, this.y, 107, 109);
    }
}

var firePlaceFour = {
    x:410,
    y: 90,
    width: 107,
    height: 109,
    image: fireOneImg,
    draw: function() {
      ctx.drawImage(this.image, this.x, this.y, 107, 109);
    }
}

var firePlaceFive = {
    x:480,
    y: 90,
    width: 107,
    height: 109,
    image: fireOneImg,
    draw: function() {
      ctx.drawImage(this.image, this.x, this.y, 107, 109);
    }
}

  var bShooter = {
    x:400,
    y: 470,
    width: 49,
    height: 112,
    image: bsImg,
    moveLeft: function() {
      this.x -= 20
    },
    moveRight: function() {
      this.x += 20
    },
    draw: function() {
      ctx.drawImage(this.image, this.x, this.y, 49, 112);
    }

}

var boss = {
    x:200,
    speedX: 7,
    y:100,
    health: 100,
    width: 100,
    height: 100,
    image: bossImage,
    moveRight: function() {
      this.x += this.speedX;
      if (this.x > 500) {
          this.speedX *= -1;
      } else if(this.x < 200){
          this.speedX *= -1;
      }
    },
    draw: function() {
      ctx.drawImage(this.image, this.x, this.y, 100, 100);
    }

}

function Shot () {
  this.height = 36;
  this.width  = 30;
  this.x = bShooter.x + 49 / 2 - this.width / 2;
  this.y = bShooter.y - this.height;
  this.image = bBImage;
  this.live = true;
  this.draw = function(){
    var xpos = this.x + 49 / 2 - this.width / 2;
    var ypos = this.y - this.height;
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height)  }
  this.update = function() {
    this.y -= 15;

  }
}

function collisionA(object1, object2) {
    var myleft = object1.x;
    var myright = object1.x + (object1.width);
    var mytop = object1.y;
    var mybottom = object1.y + (object1.height);
    var otherleft = object2.x;
    var otherright = object2.x + (object2.width);
    var otherbottom = object2.y + (object2.height);
    var othertop = object2.y;
    var hit = true;
    if (
    (mybottom < othertop) ||
    (mytop > otherbottom) ||
    (myright < otherleft) ||
    (myleft > otherright)
    ) {
    hit = false;
    }
    return hit;
}

var intervalCounter = (num) => {
    if((frameNo / num) % 1 === 0) {
        return true
    }
    return false;
}

var pushShot = () => {
  shotsArr.push(new Shot());
  busterPulse.play();

};

function BossShot () {
    this.x = boss.x + 50 - 24;
    this.y = boss.y + 43;
    this.height = 36;
    this.width  = 34;
    this.image = bossBulletImg;
    this.draw = function(){
      ctx.drawImage(this.image, this.x, this.y, this.width, this.height)  }
    this.update = function() {
      this.y += 6;
    }
  }

  function RightShot () {
    this.x = 400
    this.y = 235
    this.height = 20;
    this.width  = 20;
    this.image = rightBulletImg;
    this.draw = function(){
      ctx.drawImage(this.image, this.x, this.y, this.width, this.height)  }
    this.update = function() {
      this.y += 5;
      this.x += 4;
    }
  }

  function LeftShot () {
    this.x = 385
    this.y = 235
    this.height = 20;
    this.width  = 20;
    this.image = leftBulletImg;
    this.draw = function(){
      ctx.drawImage(this.image, this.x, this.y, this.width, this.height)  }
    this.update = function() {
      this.y += 5;
      this.x -= 4.5;
    }
  }

  var pushRightShot = () => {
    rightShotArr.push(new RightShot());
    bloop.play();
  };

  var pushLeftShot = () => {
    leftShotArr.push(new LeftShot());
  };

  var pushBossShot = () => {
    bossShotsArr.push(new BossShot());
  };

function playerHit(){
    bossShotsArr.forEach((shot) => {
        if (collisionA(shot, bShooter)) {
            stop();
            ctx.font = "30px Copperplate";
            ctx.fillStyle = 'yellow';
            ctx.fillText("You LOSE!",320,300);
            youLose.play()
        }
    })
}

function playerHitRight(){
    rightShotArr.forEach((shot) => {
        if (collisionA(shot, bShooter)) {
            stop();
            ctx.font = "30px Copperplate";
            ctx.fillStyle = 'yellow';
            ctx.fillText("You LOSE!",320,300);
            youLose.play()
        }
    })
}

function playerHitLeft(){
    leftShotArr.forEach((shot) => {
        if (collisionA(shot, bShooter)) {
            stop();
            ctx.font = "30px Copperplate";
            ctx.fillStyle = 'yellow';
            ctx.fillText("You LOSE!",320,300);
            youLose.play()
        }
    })
}

function bossHit() {
    shotsArr.forEach(function(shot){
       if (collisionA(shot,boss)) {
           boss.health -= 2;
           shot.live = false;
       }
    })
    var result = shotsArr.filter((shot) => {
        return shot.live == true;
    });
    shotsArr = result;

}

updateCanvas = () => {
  clear();
  winGame()
  bShooter.draw();
  shotsArr.forEach(elem => {
    elem.draw();
    elem.update();
  })

  boss.draw();
  boss.moveRight()
  if(intervalCounter(400) && frameNo != 0) {
      pushBossShot()
  }
  if(intervalCounter(2000) && frameNo != 0) {
      pushRightShot()
  }
  if(intervalCounter(2000) && frameNo != 0) {
      pushLeftShot()
  }
  bossShotsArr.forEach((elem) => {// function()
    elem.draw();
    // console.log('draw')
    elem.update();
    // console.log('update')
  })
  rightShotArr.forEach((elem) => {
      elem.draw();
      elem.update();
  })
  leftShotArr.forEach((elem) => {
    elem.draw();
    elem.update();
})

  playerHit();
  bossHit();
  playerHitRight();
  playerHitLeft();
  frameNo += 20;
};


window.addEventListener('keydown', (e) => {
  switch (e.which) {
    case 37: bShooter.moveLeft(); break;
    case 39: bShooter.moveRight(); break;
    case 32: pushShot(); break;
    case 13: if (gameStarted === false) {
        start();
        contraLevel.play();
    }  
    gameStarted = true; 
    break;
  }
})