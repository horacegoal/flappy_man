let bird;
let pipes;
let pipeSequence;
let dice;
let pushPipe = false;
let pushPipeSequence = false;
let score = 0;
let scoreItem;
let cannonballs;
let canAddCount = true;
let birdImage;
let pipeImage1;
let pipeImage2;
let ballImage;

function preload() {
  birdImage = loadImage('../image/bird.png');
  pipeImage1 = loadImage('../image/pipe.png');
  pipeImage2 = loadImage('../image/pipe_inverse.png');
  ballImage = loadImage('../image/ball.png')
}

function setup() {
  createCanvas(400, 600);
  bird = new Bird(birdImage);
  scoreItem = createP(`Score : ${bird.count}`)
  pipes = [];
  dice = random(1)
  if(dice < 0.7){
    pushPipe = true;
  }else{
    pushPipeSequence = true;
  }
}

function draw() {
  // noFill()
  background(220);
  bird.show()
  bird.update()
  if(pipes.length > 0){
    pipes.forEach(function(pipe){
      pipe.show();
      pipe.update();
      pipe.move(pipe.ran);
      bird.hitPipe(pipe);

      if(pipe.x1 === 202){
        dice = random(1)
        if(dice < 0.8){
          pushPipe = true;
        }else{
          pushPipeSequence = true;
        }
      }

      if(bird.addCountForPipe(pipe)){
        scoreItem.html(`Score : ${bird.count}`)
      }
    })

    for(let i = pipes.length - 1; i >= 0; i--){
      if(pipes[i].offScreen){
        pipes.splice(i, 1);
      }
    }
  }
///////////////////////////////////For Pipe
  if(pipeSequence){
    if(pipeSequence.pipes.length > 0){
      pipeSequence.show();
      pipeSequence.update();

      for(let i = pipeSequence.pipes.length - 1; i >= 0; i--){
          if(bird.addCountForPipe(pipeSequence.pipes[i])){
            scoreItem.html(`Score : ${bird.count}`)
        }
        if(pipeSequence.pipes[i].offScreen){
          pipeSequence.pipes.splice(i , 1);
        }
        if(pipeSequence.pipes[i]){
          bird.hitPipe(pipeSequence.pipes[i])
        }
      }
    }
  }
//////////////////////////For PipeSequence
  if(cannonballs){
    if(cannonballs.balls.length > 0){
      cannonballs.show()
      cannonballs.update()

      for(let i = cannonballs.balls.length - 1; i >= 0; i--){
        bird.hitBall(cannonballs.balls[i]);
        if(cannonballs.balls[i].offScreen){
          cannonballs.balls.splice(i , 1);
        }
      }

      if(canAddCount){
        if(bird.addCountForBall(cannonballs.balls[0])){
          scoreItem.html(`Score : ${bird.count}`)
          canAddCount = false;
        }
      }
    }
  }
//////////////////////////For cannonballs
  if(dice < 0.8){
    if(pushPipe){
      pipes.push(new Pipe(random(1), Math.floor(random(60, 100)), Math.floor(random(-100, 100)), width, pipeImage1, pipeImage2));
      pushPipe = false;
    }
  }
  else if(dice < 1){
    if(pushPipeSequence){
      pipeSequence = new PipeSequence(pipeImage1, pipeImage2);
    }
    pushPipeSequence = false;

    if(pipeSequence.pipes.length === 0){
      dice = random(1.3);
      canAddCount = true;
      if(dice < 0.8){
        pushPipe = true;
      }else if(dice < 1){
        pushPipeSequence = true;
      }else{
        cannonballs = new Cannonballs(5, ballImage);
      }
    }
  }
  else{
    if(cannonballs.balls.length === 0){
      dice = random(1);
      canAddCount = true;
      if(dice < 0.7){
        pushPipe = true;
      }else{
        pushPipeSequence = true;
      }
    }
  }
}






function keyPressed(){
  if(key = ' '){
    bird.lift();
  }
}