window.onload = function() {
    var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext('2d');
    var busterShot = new Image();
    busterShot.src = "images/BassBuster.png";
    var shootArray = [];
   
    
    document.getElementById("start-button").onclick = function() {
      startGame();
      };
    

      function startGame() {
        draw(bshooter);
        updateCanvas();
      }
    
    
        var bshooter = {
          x: 400,
          y: 470,
          moveLeft:  function() { this.x -= 25 },
          moveRight: function() { this.x += 25 },
        }
        
         function draw(bshooter) {
          var bsimg = new Image();
          bsimg.onload = function() {
            ctx.drawImage(bsimg, bshooter.x, bshooter.y, 49, 112);
          }
        bsimg.src = "images/ContraBlueMan.png";
        }
        
        document.onkeydown = function(e) {
          switch (e.keyCode) {
            case 37: bshooter.moveLeft();  console.log('left',  bshooter); break;
            case 39: bshooter.moveRight(); console.log('right', bshooter); break;
            case 32: pushShooting(); console.log('spacebar'); break;
          }
          updateCanvas();
        }
        
        function updateCanvas() {
          ctx.clearRect(0,0,1411,1080);
          draw(bshooter);
          updateShooting();
        }
        
        function Shooting() {
            this.x = bshooter.x;
            this.y = bshooter.y;
            this.height = 10;
            this.width = 10;
            this.sprite = busterShot;

            var self = this;
            this.draw = function() {
                ctx.drawImage(busterShot, this.x + (bshooter.width/2 - this.width/2), this.y, this.width, this.height)
                // ctx.fillStyle = "#FF0000";
                // ctx.fillRect(this.x, this.y, self.width, self.height);
            }
            this.update = function() {
                this.y -= 25
            }
        }       
        
        function updateShooting() {            
            shootArray.forEach(function(elem) {
                elem.update();
                elem.draw();
            })
        }   

        function pushShooting() {
            shootArray.push(new Shooting());
        }
        updateCanvas();

    };
    