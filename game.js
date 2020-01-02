import Snake from './Snake.js';
import Fruit from './Fruit.js';

const scoreElm = document.getElementById('score');
const canvas = document.getElementById('snake-game');
const ctx = canvas.getContext('2d');

const board_w = 420;
const board_h = 240;
const board_scale = 10;
let maxFPS = 10;
let lastFrameTimeMs = 0;
let triggerPause = false;


const snake = new Snake();
const fruit = new Fruit(board_w, board_h, board_scale);


// Initiate Game Board
canvas.width = board_w;
canvas.height = board_h;
ctx.scale(board_scale, board_scale);

// Event Listeners
window.addEventListener('keydown', processKeyEvents);

// Start game
window.requestAnimationFrame(gameLoop);

function gameLoop(timestamp) {
  if (timestamp < lastFrameTimeMs + (1000 / maxFPS)) {
    window.requestAnimationFrame(gameLoop);
    return;
  }

  lastFrameTimeMs = timestamp;

  update();
  draw();
  window.requestAnimationFrame(gameLoop);
}

function processKeyEvents(evt) {
  const key = evt.which || evt.keyCode;

  if (key === 37) {
    snake.changeDirection('LEFT');
  } else if (key === 38) {
    snake.changeDirection('UP');
  } else if (key === 39) {
    snake.changeDirection('RIGHT');
  } else if (key === 40) {
    snake.changeDirection('DOWN');
  } else if (key === 27) {
    triggerPause = (triggerPause) ? false : true;
  }
}

function update() {

  if (triggerPause) {
    snake.changeDirection('STOP');
  }

  if (snake.points === 5) {
    maxFPS = 15;
  } else if (snake.points === 10) {
    maxFPS = 20;
  } else if (snake.points === 15) {
    maxFPS = 25;
  } else if (snake.points === 20) {
    maxFPS = 30;
  } else if (snake.points < 5) {
    maxFPS = 10;
  }

  scoreElm.innerText = snake.points;

  if (detectCollision()) {
    snake.reset();
  } else {
    snake.eat(fruit);
    snake.update();
  }
}

function draw() {
  ctx.clearRect(0, 0, board_w, board_h);
  fruit.draw(ctx);
  snake.draw(ctx);

  if (triggerPause) {
    ctx.fillStyle = "yellow";
    ctx.fillRect(0, 0, board_w, board_h);
  }
}

function detectCollision() {
  if ((snake.body[0].x >= board_w / board_scale) || 
      (snake.body[0].x < 0) || 
      (snake.body[0].y >= board_h / board_scale) || 
      (snake.body[0].y < 0)) {
    
    return true;
  }

  return false;
}
