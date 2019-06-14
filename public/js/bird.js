function Bird(img){
  this.die = false;
  this.img = img;
  this.y = 0;
  this.d = 20;
  this.r = this.d/2;
  this.x = 20;
  this.gravity = 2;
  this.acceleration = 0;
  this.velocity = 0;
  this.liftPower = -25;
  this.count = 0;
  this.width = this.d * 2;
  this.show = function(){
    fill(255)
    image(this.img, this.x - this.width/2, this.y - this.width/2, this.width, this.width)
    // ellipse(this.x, this.y, this.d)

  }

  this.update = function(){

    if(this.velocity <= 6){
      this.velocity += this.gravity;
    }
    this.y += this.velocity;

    if(this.y < 0){
      this.y = 0;
      this.velocity = 0;
      this.reset();
    }
    if(this.y > height){
      this.y = height;
      this.velocity = 0;
      this.reset();

    }
  }

  this.lift = function(){
    this.velocity += this.liftPower;
  }

  this.hitPipe = function(pipe){
    let r = this.d/2
    if(this.x + this.r >= pipe.x1 && this.x - this.r <= pipe.x1 + pipe.w1){
      if(this.y <= pipe.h1 || this.y >= pipe.y2){
        this.reset();
      }
    }
  }

  this.hitBall = function(ball){
    let distance = this.r + ball.r;
    let actualDist = dist(this.x,this.y,ball.x,ball.y)
    if(actualDist < distance){
      this.reset();
    }
  }

  this.addCountForPipe = function(pipe){
    let r = this.d/2;
    if(this.x - r > pipe.x1 && pipe.canAddCount){
      this.count++;
      pipe.canAddCount = false;
      return true;
    }
  }

  this.addCountForBall = function(ball){

    if(ball){
      if(this.x - this.r > ball.x - ball.r){
        this.count++;
        return true;
      }
    }

  }

  this.reset = function(){
    fill(0)
    noLoop()
    setTimeout(function(){
      canReset = true;
      text("Tap to Restart", canvasWidth/2, canvasHeight/2)
    }, 1000)
  }
}
