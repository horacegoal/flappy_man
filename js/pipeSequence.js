function PipeSequence(img1, img2){
  this.pipes = [];
  this.gap = Math.floor(random(60, 100));
  this.offSet = Math.floor(random(-30, 30));
  this.x = width;
  this.sequenceLength = random(5,10);
  this.upOrDown = random(1);
  this.img1 = img1;
  this.img2 = img2;


  for(let i = 0; i < this.sequenceLength; i++){
    this.pipes.push(new Pipe(1, this.gap, this.offSet, this.x, this.img1, this.img2))
    if(this.upOrDown <= 0.5){
      this.offSet += 10;
    }else{
      this.offSet -= 10;
    }
    this.x += 30;
  }

  this.show = function(){
    for(let i = 0; i < this.pipes.length; i++){
      this.pipes[i].show();
    }
  }

  this.update = function(){
    for(let i = 0; i < this.pipes.length; i++){
      this.pipes[i].update();
    }
  }
}
