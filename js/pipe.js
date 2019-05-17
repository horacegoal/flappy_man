function Pipe(ran, gap, offSet, x ,img1, img2){
  this.gap = gap;
  this.offSet = offSet;
  this.offScreen = false;
  this.ran = ran;
  this.img1 = img1;
  this.img2 = img2;
  this.canAddCount = true;
  this.x1 = x;

  this.y1 = 0;
  this.w1 = 30;
  this.h1 = height/2 - this.gap + this.offSet;

  this.x2 = x;
  this.y2 = height/2 + this.gap + this.offSet;
  this.w2 = 30;
  this.h2 = height - this.y2;

  this.show = function(){
    noStroke()
    // rect(this.x1,this.y1,this.w1,this.h1);
    image(this.img2, this.x1, this.y1, this.w1, this.h1)
    image(this.img1, this.x2, this.y2, this.w2, this.h2)
    // rect(this.x2,this.y2,this.w2,this.h2);
  }

  this.update = function(){
    this.x1 -= 3
    this.x2 -= 3
    if(this.x1 <= 0 - this.w1){
      this.offScreen = true;
    }
  }

  this.move = function(ran){
    if(ran < 0.3){
      this.h1 -= 1;
      this.y2 -= 1;
      this.h2 += 1;
    }else if(ran < 0.6){
      this.h1 += 1;
      this.y2 += 1;
      this.h2 -= 1;
    }
  }

}
