// controls for moving = arrowLeft||arrowRight
// button for changing shape = arrowUp
//enjoy
let arg = 0;
let array = [];
//let stomp = false;
let position = 1;
let figurenow = "t";
const gameboard = document.getElementById("game-board");
let lastTime = 0;
let newarr = [];
let figure = [
  { x: 5, y: 0 },
  { x: 6, y: 0 },
  { x: 7, y: 0 },
  { x: 6, y: 1 }
];
let ground = [
  { x: 0, y: 21 },
  { x: 1, y: 21 },
  { x: 2, y: 21 },
  { x: 3, y: 21 },
  { x: 4, y: 21 },
  { x: 5, y: 21 },
  { x: 6, y: 21 },
  { x: 7, y: 21 },
  { x: 8, y: 21 },
  { x: 9, y: 21 },
  { x: 10, y: 21 },
  { x: 11, y: 21 },
  { x: 12, y: 21 }
];
function cnf(newfig) {
  if (newfig === 1) {
    figurenow = "t";
    figure = [
      { x: 5, y: 0 },
      { x: 6, y: 0 },
      { x: 7, y: 0 },
      { x: 6, y: 1 }
    ];
  }
  if (newfig === 2) {
    figurenow = "cube";
    figure = [
      { x: 6, y: 0 },
      { x: 7, y: 0 },
      { x: 7, y: 1 },
      { x: 6, y: 1 }
    ];
  }
  if (newfig === 3) {
    figurenow = "l";
    figure = [
      { x: 6, y: 0 },
      { x: 6, y: 1 },
      { x: 6, y: 2 },
      { x: 7, y: 2 }
    ];
  }
  if (newfig === 4) {
    figurenow = "stick";
    figure = [
      { x: 5, y: 0 },
      { x: 6, y: 0 },
      { x: 7, y: 0 },
      { x: 8, y: 0 }
    ];
  }
  if (newfig === 5) {
    figurenow = "z";
    figure = [
      { x: 5, y: 0 },
      { x: 6, y: 0 },
      { x: 6, y: 1 },
      { x: 7, y: 1 }
    ];
  }
}
let stucking = function checkstuck(xx = 0, yy = 0, h) {
  for (let j = 0; j <= h.length - 1; j++) {
    for (let b = 0; b <= ground.length - 1; b++) {
      if(h[j].x + xx===0||h[j].x + xx===13){
        return true
      }
      if (h[j].y + yy === ground[b].y && h[j].x + xx === ground[b].x) {
        return true;
      }
    }
  }
  return false;
};
function draw(s) {
  s.forEach((part) => {
    const snakePart = document.createElement("div");
    snakePart.style.gridRowStart = part.y;
    snakePart.style.gridColumnStart = part.x;
    snakePart.classList.add("snake");
    gameboard.appendChild(snakePart);
  });
}
function rotateT() {
  if (position === 1) {
    let rotatedFigure = [
      { x: figure[1].x, y: figure[1].y - 1 },
      { x: figure[1].x, y: figure[1].y },
      { x: figure[1].x - 1, y: figure[1].y },
      { x: figure[1].x, y: figure[1].y + 1 }
    ];
    if (stucking(0, 0, rotatedFigure) === false) {
      figure = rotatedFigure;
      position = 2;
      gameboard.innerHTML = "";
      draw(figure);
      draw(ground);
      return;
    }
  }
  if (position === 2) {
    let rotatedFigure = [
      { x: figure[1].x - 1, y: figure[1].y },
      { x: figure[1].x, y: figure[1].y },
      { x: figure[1].x + 1, y: figure[1].y },
      { x: figure[1].x, y: figure[1].y - 1 }
    ];
    if (stucking(0, 0, rotatedFigure) === false) {
      figure = rotatedFigure;
      position = 3;
      gameboard.innerHTML = "";
      draw(figure);
      draw(ground);
      return;
    }
  }
  if (position === 3) {
    let rotatedFigure = [
      { x: figure[1].x, y: figure[1].y + 1 },
      { x: figure[1].x, y: figure[1].y },
      { x: figure[1].x, y: figure[1].y - 1 },
      { x: figure[1].x + 1, y: figure[1].y }
    ];
    if (stucking(0, 0, rotatedFigure) === false) {
      figure = rotatedFigure;
      position = 4;
      gameboard.innerHTML = "";
      draw(figure);
      draw(ground);
      return;
    }
  }
  if (position === 4) {
    let rotatedFigure = [
      { x: figure[1].x - 1, y: figure[1].y },
      { x: figure[1].x, y: figure[1].y },
      { x: figure[1].x + 1, y: figure[1].y },
      { x: figure[1].x, y: figure[1].y + 1 }
    ];
    if (stucking(0, 0, rotatedFigure) === false) {
      figure = rotatedFigure;
      position = 1;
      gameboard.innerHTML = "";
      draw(figure);
      draw(ground);
      return;
    }
  }
}
function rotateL() {
  if (position === 1) {
    let rotatedFigure = [
      { x: figure[1].x + 1, y: figure[1].y },
      { x: figure[1].x, y: figure[1].y },
      { x: figure[1].x - 1, y: figure[1].y },
      { x: figure[1].x - 1, y: figure[1].y + 1 }
    ];
    if (stucking(0, 0, rotatedFigure) === false) {
      figure = rotatedFigure;
      position = 2;
      gameboard.innerHTML = "";
      draw(figure);
      draw(ground);
      return;
    }
  }
  if (position === 2) {
    let rotatedFigure = [
      { x: figure[1].x, y: figure[1].y + 1 },
      { x: figure[1].x, y: figure[1].y },
      { x: figure[1].x, y: figure[1].y - 1 },
      { x: figure[1].x - 1, y: figure[1].y - 1 }
    ];
    if (stucking(0, 0, rotatedFigure) === false) {
      figure = rotatedFigure;
      position = 3;
      gameboard.innerHTML = "";
      draw(figure);
      draw(ground);
      return;
    }
  }
  if (position === 3) {
    let rotatedFigure = [
      { x: figure[1].x + 1, y: figure[1].y - 1 },
      { x: figure[1].x, y: figure[1].y },
      { x: figure[1].x + 1, y: figure[1].y },
      { x: figure[1].x - 1, y: figure[1].y }
    ];
    if (stucking(0, 0, rotatedFigure) === false) {
      figure = rotatedFigure;
      position = 4;
      gameboard.innerHTML = "";
      draw(figure);
      draw(ground);
      return;
    }
  }
  if (position === 4) {
    let rotatedFigure = [
      { x: figure[1].x, y: figure[1].y - 1 },
      { x: figure[1].x, y: figure[1].y },
      { x: figure[1].x, y: figure[1].y + 1 },
      { x: figure[1].x + 1, y: figure[1].y + 1 }
    ];
    if (stucking(0, 0, rotatedFigure) === false) {
      figure = rotatedFigure;
      position = 1;
      gameboard.innerHTML = "";
      draw(figure);
      draw(ground);
      return;
    }
  }
}
function rotateS() {
  if (position === 1) {
    let rotatedFigure = [
      { x: figure[1].x, y: figure[1].y - 1 },
      { x: figure[1].x, y: figure[1].y },
      { x: figure[1].x, y: figure[1].y - 2 },
      { x: figure[1].x, y: figure[1].y - 3 }
    ];
    if (stucking(0, 0, rotatedFigure) === false) {
      figure = rotatedFigure;
      position = 2;
      gameboard.innerHTML = "";
      draw(figure);
      draw(ground);
      return;
    }
  }
  if (position === 2) {
    let rotatedFigure = [
      { x: figure[1].x + 1, y: figure[1].y },
      { x: figure[1].x, y: figure[1].y },
      { x: figure[1].x + 2, y: figure[1].y },
      { x: figure[1].x + 3, y: figure[1].y }
    ];
    if (stucking(0, 0, rotatedFigure) === false) {
      figure = rotatedFigure;
      position = 1;
      gameboard.innerHTML = "";
      draw(figure);
      draw(ground);
      return;
    }
  }
}
function rotateZ() {
  if (position === 1) {
    let rotatedFigure = [
      { x: figure[1].x + 1, y: figure[1].y - 1 },
      { x: figure[1].x, y: figure[1].y },
      { x: figure[1].x + 1, y: figure[1].y },
      { x: figure[1].x, y: figure[1].y + 1 }
    ];
    if (stucking(0, 0, rotatedFigure) === false) {
      figure = rotatedFigure;
      position = 2;
      gameboard.innerHTML = "";
      draw(figure);
      draw(ground);
      return;
    }
  }
  if (position === 2) {
    let rotatedFigure = [
      { x: figure[1].x - 1, y: figure[1].y },
      { x: figure[1].x, y: figure[1].y },
      { x: figure[1].x, y: figure[1].y + 1 },
      { x: figure[1].x + 1, y: figure[1].y + 1 }
    ];
    if (stucking(0, 0, rotatedFigure) === false) {
      figure = rotatedFigure;
      position = 1;
      gameboard.innerHTML = "";
      draw(figure);
      draw(ground);
      return;
    }
  }
}
function movefigure() {
  if (figurenow === "t") {
    rotateT();
  }
  if (figurenow === "cube") {
    return;
  }
  if (figurenow === "l") {
    rotateL();
  }
  if (figurenow === "stick") {
    rotateS();
  }
  if (figurenow === "z") {
    rotateZ();
  }
}
function leftorright() {
  if (stucking(arg, 0, figure)) {
    return;
  }
  gameboard.innerHTML = "";
  figure.forEach((piece) => (piece.x = piece.x + arg));
  draw(figure);
  draw(ground);
}
//function stop() {
//stomp = true;
//}
window.addEventListener("keyup", (e) => {
  switch (e.key) {
    case "ArrowLeft":
      arg = -1;
      leftorright();
      break;
    case "ArrowRight":
      arg = +1;
      leftorright();
      break;
    case "ArrowUp":
      movefigure();
      break;
    case "ArrowDown":
      //stop();
      break;
    default:
      break;
  }
});

function remove(row) {
  newarr = [];
  for (let a = 0; a <= ground.length - 1; a++) {
    if (row.y !== ground[a].y) {
      newarr.push(ground[a]);
    }
  }
  ground = newarr;
  for (let a = 0; a <= ground.length - 1; a++) {
    if (row.y > ground[a].y) {
      ground[a].y++;
    }
  }
  console.log(ground);
}
function isrow12(row) {
  let mustbe12 = 0;
  for (let a = 0; a <= ground.length - 1; a++) {
    if (row.y === ground[a].y) {
      mustbe12++;
    }
  }
  if (mustbe12 === 12) {
    mustbe12 = 0;
    return true;
  }
  return false;
}
function collapse(b) {
  for (let a = 0; a <= b.length - 1; a++) {
    if (isrow12(b[a])) {
      console.log(b[a]);
      remove(b[a]);
    }
  }
}
function checkifin(pvh) {
  for (let a = 0; a <= array.length - 1; a++) {
    if (pvh.y === array[a].y) {
      return true;
    }
  }
  return false;
}
function newgrounds(pvf) {
  array = [];
  for (let s = 0; s <= 3; s++) {
    if (figure[s].y === 0) {
      ground = [
        { x: 0, y: 21 },
        { x: 1, y: 21 },
        { x: 2, y: 21 },
        { x: 3, y: 21 },
        { x: 4, y: 21 },
        { x: 5, y: 21 },
        { x: 6, y: 21 },
        { x: 7, y: 21 },
        { x: 8, y: 21 },
        { x: 9, y: 21 },
        { x: 10, y: 21 },
        { x: 11, y: 21 },
        { x: 12, y: 21 }
      ];
      position = 1;
      figurenow = "t";
      figure = [
        { x: 5, y: 0 },
        { x: 6, y: 0 },
        { x: 7, y: 0 },
        { x: 6, y: 1 }
      ]
      return;
    } else {
      ground.push(figure[s]);
    }
  }
  //figure.forEach((piece) => ground.push(piece));
  for (let a = 0; a <= 3; a++) {
    if (!checkifin(pvf[a])) {
      array.push(pvf[a]);
    }
  }
  collapse(array);
  console.log(array);
}
function createFigure() {
  gameboard.innerHTML = "";
  if (stucking(0, 1, figure)) {
    newgrounds(figure);
    position = 1;
    let newfig = Math.floor(Math.random() * 5 + 1);
    cnf(newfig);
  } else {
    figure.forEach((piece) => (piece.y = piece.y + 1));
  }
  draw(figure);
  draw(ground);
}
function af(timeStamp) {
  //if (stomp === true) {
  // return;
  //}
  window.requestAnimationFrame(af);
  const sslr = (timeStamp - lastTime) / 120;
  if (sslr <= 1) return;
  lastTime = timeStamp;
  createFigure();
}

af();
