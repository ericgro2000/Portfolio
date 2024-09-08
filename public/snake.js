let lastTime = 0;
let snakeLength = 0
f = 0
const gameboard = document.getElementById("game-board");
let snakeDirection = { x:0, y:+1 };
let snakeBody = [
  { x: 9, y: 9, head: 1, tail: 2 },
];
let ssnakeBody = [
  { x: 9, y: 9, head: 1, tail: 2 },
  { x: 9, y: 10, head: 1, tail: 1 },
  { x: 9, y: 11, head: 1, tail: 1 },
  { x: 9, y: 12, head: 1, tail: 1 },
  { x: 9, y: 13, head: 2, tail: 1 },
];
let apple = {x:9, y:18}
window.addEventListener("keydown", e => {
if (f == 1) return
  switch (e.key) {
    case "ArrowUp":
      if (snakeDirection.x ==1) break 
f = 1
      snakeDirection = { x:-1, y:0 }
      break
  case "ArrowDown":
      if (snakeDirection.x ==-1) break 
f = 1
      snakeDirection = { x:+1, y:0 }
      break
  case "ArrowRight":
    if (snakeDirection.y ==-1) break
f = 1
      snakeDirection = { x:0, y:+1 }
      break
  case "ArrowLeft":
    if (snakeDirection.y ==1) break
f = 1
      snakeDirection = { x:0, y:-1 }
      break
    }
});
function newapple() {
  let mbapple = {x:Math.floor(Math.random()*21)+1, y:Math.floor(Math.random()*21)+1}
  if (snakeBody.some(el => el.x == mbapple.x && el.y == mbapple.y )) {
    newapple() 
  }
  else {
    apple = mbapple
  }
}
function snakeMoving(snakeDirection) {
    gameboard.innerHTML = "";
    let head = {x:snakeBody[snakeLength].x+snakeDirection.x , y:snakeBody[snakeLength].y+snakeDirection.y}
    if (head.x ==22 || head.y==22 || head.x ==0 || head.y==0|| snakeBody.some(el => el.x == head.x && el.y == head.y)) {
      snakeLength = 0
      snakeBody =[]
      head = { x: 9, y: 9, head: 1, tail: 2 }
      newapple()
      snakeBody.push(head)
    }
    if (head.x == apple.x && head.y == apple.y ) {
      snakeBody.push(head)
      snakeLength ++
      newapple()
    }
    else {
      snakeBody.push(head)
      snakeBody.shift()}
    snakeBody.forEach((part) => {
      const snakePart = document.createElement("div");
      snakePart.style.gridRowStart = part.x;
      snakePart.style.gridColumnStart = part.y;
      snakePart.classList.add("snake");
      gameboard.appendChild(snakePart);
    });
    const applesnake = document.createElement("div")
    applesnake.style.gridRowStart = apple.x;
    applesnake.style.gridColumnStart = apple.y;
    applesnake.classList.add("apple");
    gameboard.appendChild(applesnake);
f = 0
  }
function af(timeStamp) {
  window.requestAnimationFrame(af);
  const sslr = (timeStamp - lastTime) / 100;
  if (sslr <= 1) return;
  lastTime = timeStamp;
  snakeMoving(snakeDirection);
}

af();