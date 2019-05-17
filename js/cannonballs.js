function Cannonballs(ballsNumber, img){
  this.balls = [];
  this.ballsNumber = ballsNumber;
  this.img = img;
  this.y = 30;
  for(let i = 0; i < this.ballsNumber; i++){
    this.balls.push(new Cannonball(this.y, this.img));
    this.y += random(80,150)
  }

  this.show = function(){
    this.balls.forEach(function(ball){
      ball.show();
    })
  }

  this.update = function(){
    if(this.balls){
      for(let i = 0; i < this.balls.length; i++){
        this.balls[i].update();
        if(this.balls[i].offScreen){
          this.balls.splice(i, 1);
        }
      }
    }

  }
}


function Cannonball(y, img){

  this.d = floor(random(20,40));
  this.r = this.d/2
  this.x = width;
  this.y = y;
  this.offScreen = false;
  this.img = img;


  this.show = function(){
    noStroke();
    // ellipse(this.x, this.y, this.d);
    image(this.img, this.x - this.d/2, this.y - this.d/2, this.d, this.d);
  }

  this.update = function(){
    this.x -= 5;
    if(this.x < 0 - this.r * 2){
      this.offScreen = true;
    }
  }
}
