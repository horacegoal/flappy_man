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
let skyImage;
let canvas;

let canvasWidth;
let canvasHeight;



function preload() {
  birdImage = loadImage('image/bird.png');
  pipeImage1 = loadImage('image/pipe.png');
  pipeImage2 = loadImage('image/pipe_inverse.png');
  ballImage = loadImage('image/ball.png')
  skyImage = loadImage('image/sky.jpg');
}

function setup() {
  function setWidthHeight(x){
    if(x.matches){
      canvasWidth = window.innerWidth;
      canvasHeight = window.innerHeight - 50;
    }else{
      canvasWidth = 400;
      canvasHeight = windowHeight - 50;
    }
  }

  let x = window.matchMedia("(max-width: 500px)")
  setWidthHeight(x);
  x.addListener(setWidthHeight);

  canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.id('gameCanvas');
  bird = new Bird(birdImage);
  scoreItem = createP(`Score : ${bird.count}`)
  pipes = [];
  dice = floor(random(10)) + 1;
  if(dice <= 7){
    pushPipe = true;
  }else{
    pushPipeSequence = true;
  }
}

function draw() {
  // noFill()
  // background(220);
  image(skyImage, 0, 0, width, height  )
  bird.show()
  bird.update()
  if(pipes.length > 0){
    pipes.forEach(function(pipe){
      pipe.show();
      pipe.update();
      pipe.move(pipe.ran);
      bird.hitPipe(pipe);

      if(pipe.canDice){
        if(pipe.x1 < canvasWidth/2){
          pipe.canDice = false;
          dice = floor(random(10)) + 1;
          if(dice <= 7){
            pushPipe = true;
          }else{
            pushPipeSequence = true;
          }
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
  if(dice <= 7){
    if(pushPipe){
      pipes.push(new Pipe(random(1), Math.floor(random(60, 100)), Math.floor(random(-100, 100)), width, pipeImage1, pipeImage2));
      pushPipe = false;
    }
  }
  else if(dice <= 10){
    if(pushPipeSequence){
      pipeSequence = new PipeSequence(pipeImage1, pipeImage2);
    }
    pushPipeSequence = false;

    if(pipeSequence.pipes.length === 0){
      dice = floor(random(13)) + 1;
      canAddCount = true;
      if(dice <= 7){
        pushPipe = true;
      }else if(dice <= 10){
        pushPipeSequence = true;
      }else{
        cannonballs = new Cannonballs(5, ballImage);
      }
    }
  }
  else{
    if(cannonballs.balls.length === 0){
      dice = floor(random(10)) + 1;
      canAddCount = true;
      if(dice <= 7){
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

function mousePressed(){
  if(key = ' '){
    bird.lift();
  }
}
