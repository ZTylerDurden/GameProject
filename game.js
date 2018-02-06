var canvas = document.getElementsByTagName('canvas')[0]
var ctx = canvas.getContext("2d");
var start = () => {
  intervalId = setInterval(updateCanvas, 20);
};
var stop = () => {
  clearInterval(intervalId);
}
var clear = () => {
  ctx.clearRect(0,0,800,612);
}

var bsImg = new Image();
bsImg.src = "images/ContraBlueMan.png";

var bBImage = new Image();
bBImage.src = "images/BassBuster.png";

var shotsArr = [];

var bShooter = {
  x:400,
  y: 470,
  image: bsImg,
  moveLeft: function() {
    this.x -= 25
  },
  moveRight: function() {
    this.x += 25
  },
  draw: function() {
    ctx.drawImage(this.image, this.x, this.y, 49, 112);
  }

}

function Shot () {
  this.x = bShooter.x;
  this.y = bShooter.y;
  this.height = 80;
  this.width  = 80;
  this.image = bBImage;
  this.draw = function(){
    var xpos = this.x + 49 / 2 - this.width / 2;
    var ypos = this.y - this.height;
    ctx.drawImage(this.image, xpos, ypos, this.width, this.height)  }
  this.update = function() {
    this.y -= 15;
  }
  console.log('const shot')
}

var pushShot = () => {
  shotsArr.push(new Shot());
  console.log('pushed shot')
};



updateCanvas = () => {
  clear();
  bShooter.draw();
  shotsArr.forEach(elem => {
    elem.draw();
    elem.update();
  })
};

window.addEventListener('keydown', (e) => {
  switch (e.which) {
    case 37: bShooter.moveLeft(); break;
    case 39: bShooter.moveRight(); break;
    case 32: pushShot(); break;
  }
})