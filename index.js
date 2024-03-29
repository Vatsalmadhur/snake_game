//constants and variables
let inputDir = { x: 0, y: 0 };
let foodSound = new Audio("food2.mp3");
let gameOverSound = new Audio("gameover.mp3");
let moveSound= new Audio("clink.mp3");
let speed = 15;
let score = 0;
let lastPaintTime = 0;
let snakeArr = [{ x: 13, y: 15 }];
food = { x: 6, y: 7 };

//Game function
function main(ctime) {
  window.requestAnimationFrame(main);
  if ((ctime - lastPaintTime) / 1000 < 1 / speed) {
    return;
  }
  lastPaintTime = ctime;
  gameEngine();
  // console.log(ctime);
}

function isCollide(snake) {
  // if you bump in yourself
  for (let i = 1; i < snakeArr.length; i++) {
    if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
      return true;
    }
  }
  // if you bump in wall

  if (
    snake[0].x >= 18 ||
    snake[0].x <= 0 ||
    snake[0].y >= 18 ||
    snake[0].y <= 0
  ) {
    return true;
  }
}

function gameEngine() {
  // 1 updating the snake variable
  if (isCollide(snakeArr)) {
    gameOverSound.play();
    inputDir = { x: 0, y: 0 };
    alert("Game Over! Press any key to play again");
    snakeArr=[{x:13,y:15}];
    score = 0;
    // return;
  }

  // if you have eaten the food, incriment the score
  if (snakeArr[0].y === food.y && snakeArr[0].x === food.x) {
    foodSound.play();

    score += 1;
    if (score > highScore) {
      highScoreVal = score;
      localStorage.setItem("highScore", JSON.stringify(highScoreVal));
      highScoreBox.innerHTML = "High Score: " + highScoreVal;
    }
    scoreBox.innerHTML = "Score:" + score;
    snakeArr.unshift({
      x: snakeArr[0].x + inputDir.x,
      y: snakeArr[0].y + inputDir.y,
    });
    let a = 2;
    let b = 16;

    food = {
      x: Math.round(a + (b - a) * Math.random()),
      y: Math.round(a + (b - a) * Math.random()),
    };
  }

  // moving the snake
  for (let i = snakeArr.length - 2; i >= 0; i--) {
    // const element= array[i]
    snakeArr[i + 1] = { ...snakeArr[i] };
  }

  snakeArr[0].x += inputDir.x;
  snakeArr[0].y += inputDir.y;

  // 2 renender the snake food

  //Display the snake

  board.innerHTML = "";
  snakeArr.forEach((e, index) => {
    snakeElement = document.createElement("div");
    snakeElement.style.gridRowStart = e.y;
    snakeElement.style.gridColumnStart = e.x;
    // snakeElement.classList.add('snake');
    if (index === 0) {
      snakeElement.classList.add("head");
    } else {
      snakeElement.classList.add("snake");
    }
    board.appendChild(snakeElement);
  });

  // Display the food
  foodElement = document.createElement("div");
  foodElement.style.gridRowStart = food.y;
  foodElement.style.gridColumnStart = food.x;
  foodElement.classList.add("food");
  board.appendChild(foodElement);
}

//main logic starts here
let highScore = localStorage.getItem("highScore");

highScoreVal = 0;
if (highScore === null) {
  localStorage.setItem("highScore", JSON.stringify(highScoreVal));
} else {
  highScoreVal = JSON.parse(highScore);
  highScoreBox.innerHTML = "High Score:" + highScore;
}
window.requestAnimationFrame(main);
window.addEventListener("keydown", (e) => {
  inputDir = { x: 0, y: 1 }; // start the game
  moveSound.play()
  switch (e.key) {
    case "ArrowUp":
      console.log("ArrowUp");
      inputDir.x = 0;
      inputDir.y = -1;
      break;
    case "w":
      console.log("w");
      inputDir.x = 0;
      inputDir.y = -1;
      break;

    case "ArrowDown":
      console.log("ArrowDown");
      inputDir.x = 0;
      inputDir.y = 1;
      break;

    case "s":
      console.log("s");
      inputDir.x = 0;
      inputDir.y = 1;
      break;

    case "ArrowRight":
      console.log("ArrowRight");
      inputDir.x = 1;
      inputDir.y = 0;
      break;

    case "d":
      console.log("d");
      inputDir.x = 1;
      inputDir.y = 0;
      break;

    case "ArrowLeft":
      console.log("ArrowLeft");
      inputDir.x = -1;
      inputDir.y = 0;
      break;
    case "a":
      console.log("a");
      inputDir.x = -1;
      inputDir.y = 0;
      break;

    default:
      break;
  }
});
