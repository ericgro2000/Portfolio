const GRID_SIZE = 4;
const CELL_SIZE = 20;
const CELL_GAP = 2;
const board = [];
const game_Board = document.getElementById("game-board");
let boardchanged = false;
function visualiseBoard(gameBoard) {
  gameBoard.style.setProperty("--grid-size", GRID_SIZE);
  gameBoard.style.setProperty("--cell-size", `${CELL_SIZE}vmin`);
  gameBoard.style.setProperty("--cell-gap", `${CELL_GAP}vmin`);

  for (let i = 0; i <= GRID_SIZE * GRID_SIZE - 1; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    gameBoard.append(cell);
  }
}
visualiseBoard(game_Board);

function visualiseTiles(cell, number, x, y) {
  const celldiv = cell.div;
  const backgroundLightness = 100 - Math.log2(number) * 9;
  cell.number = number;
  cell.x = x;
  cell.y = y;
  celldiv.classList.add("tile");
  celldiv.textContent = number;
  celldiv.style.setProperty("--x", x);
  celldiv.style.setProperty("--y", y);
  celldiv.style.setProperty(
    "--background-lightness",
    `${backgroundLightness}%`
  );
  celldiv.style.setProperty(
    "--text-lightness",
    `${backgroundLightness <= 50 ? 90 : 10}%`
  );
}
function createTiles() {
  let cellrow = [];
  for (let y = 0; y <= GRID_SIZE - 1; y++) {
    for (let x = 0; x <= GRID_SIZE - 1; x++) {
      const cell = document.createElement("div");
      const number = "";
      cellrow.push({ y: y, x: x, div: cell, number: number });
      visualiseTiles(cellrow[x], number, x, y);
      game_Board.append(cellrow[x].div);
      if (cellrow.length === GRID_SIZE) {
        board.push(cellrow);
        cellrow = [];
      }
    }
  }
}

createTiles();
function randomNumber() {
  return Math.random() > 0.5 ? 2 : 4;
}

function randomXY() {
  return Math.floor(Math.random() * GRID_SIZE);
}

function createTile(number, x, y) {
  const power = Math.log2(number);
  const backgroundLightness = 100 - power * 9;
  if (board[y][x].number === "") {
    visualiseTiles(board[y][x], number, x, y, backgroundLightness);
    game_Board.append(board[y][x].div);
  } else {
    createTile(randomNumber(), randomXY(), randomXY());
  }
}

createTile(randomNumber(), randomXY(), randomXY());
// createTile(randomNumber(),randomXY(),randomXY())
// createTile(randomNumber(),randomXY(),randomXY())
// createTile(randomNumber(),randomXY(),randomXY())
// createTile(randomNumber(),randomXY(),randomXY())
// createTile(randomNumber(),randomXY(),randomXY())
// createTile(randomNumber(),randomXY(),randomXY())
// createTile(randomNumber(),randomXY(),randomXY())
// createTile(randomNumber(),randomXY(),randomXY())
// createTile(randomNumber(),randomXY(),randomXY())
// createTile(randomNumber(),randomXY(),randomXY())
// createTile(randomNumber(),randomXY(),randomXY())

// createTile(2,0,0)
// createTile(2,1,0)
// createTile(4,3,0)

function moveToright(row) {
  let tttrm = row[GRID_SIZE - 1];
  for (let a = GRID_SIZE - 2; a >= 0; a--) {
    if (row[a].number === "") continue;
    if (
      tttrm.x === row[a].x + 1 &&
      tttrm.number !== row[a].number &&
      tttrm.number !== ""
    ) {
      tttrm = row[tttrm.x - 1];
      continue;
    }
    if (tttrm.number === "" && row[a].number !== "") {
      const number = row[a].number;
      const cell = document.createElement("div");
      const prevx = row[a].x;
      const prevy = row[a].y;
      visualiseTiles(row[a], number, tttrm.x, tttrm.y);
      board[tttrm.y][tttrm.x].div.remove();
      board[tttrm.y][tttrm.x] = row[a];
      row[a] = { y: prevy, x: prevx, div: cell, number: "" };
      createTile("", prevx, prevy);
      tttrm = row[tttrm.x];
      boardchanged = true;
      continue;
    }
    if (tttrm.number !== "" && tttrm.number !== row[a].number) {
      const number = row[a].number;
      const cell = document.createElement("div");
      const prevx = row[a].x;
      const prevy = row[a].y;
      visualiseTiles(row[a], number, tttrm.x - 1, tttrm.y);
      board[tttrm.y][tttrm.x - 1] = row[a];
      row[a] = { y: prevy, x: prevx, div: cell, number: "" };
      createTile("", prevx, prevy);
      tttrm = row[tttrm.x - 1];
      boardchanged = true;
      continue;
    }
    if (tttrm.number === row[a].number) {
      const number = row[a].number + row[a].number;
      const cell = document.createElement("div");
      const prevx = row[a].x;
      const prevy = row[a].y;
      visualiseTiles(row[a], number, tttrm.x, tttrm.y);
      board[tttrm.y][tttrm.x].div.remove();
      board[tttrm.y][tttrm.x] = row[a];
      row[a] = { y: prevy, x: prevx, div: cell, number: "" };
      createTile("", prevx, prevy);
      tttrm = row[tttrm.x - 1];
      boardchanged = true;
      continue;
    }
  }
  console.log(board);
}
function moveToleft(row) {
  let tttrm = row[0];
  for (let a = 1; a <= 3; a++) {
    if (row[a].number === "") continue;
    if (
      tttrm.x === row[a].x - 1 &&
      tttrm.number !== row[a].number &&
      tttrm.number !== ""
    ) {
      tttrm = row[tttrm.x + 1];
      continue;
    }
    if (tttrm.number === "" && row[a].number !== "") {
      const number = row[a].number;
      const cell = document.createElement("div");
      const prevx = row[a].x;
      const prevy = row[a].y;
      visualiseTiles(row[a], number, tttrm.x, tttrm.y);
      board[tttrm.y][tttrm.x].div.remove();
      board[tttrm.y][tttrm.x] = row[a];
      row[a] = { y: prevy, x: prevx, div: cell, number: "" };
      createTile("", prevx, prevy);
      tttrm = row[tttrm.x];
      boardchanged = true;
      continue;
    }
    if (tttrm.number !== "" && tttrm.number !== row[a].number) {
      const number = row[a].number;
      const cell = document.createElement("div");
      const prevx = row[a].x;
      const prevy = row[a].y;
      visualiseTiles(row[a], number, tttrm.x + 1, tttrm.y);
      board[tttrm.y][tttrm.x + 1] = row[a];
      row[a] = { y: prevy, x: prevx, div: cell, number: "" };
      createTile("", prevx, prevy);
      tttrm = row[tttrm.x + 1];
      boardchanged = true;
      continue;
    }
    if (tttrm.number === row[a].number) {
      const number = row[a].number + row[a].number;
      const cell = document.createElement("div");
      const prevx = row[a].x;
      const prevy = row[a].y;
      visualiseTiles(row[a], number, tttrm.x, tttrm.y);
      board[tttrm.y][tttrm.x].div.remove();
      board[tttrm.y][tttrm.x] = row[a];
      row[a] = { y: prevy, x: prevx, div: cell, number: "" };
      createTile("", prevx, prevy);
      tttrm = row[tttrm.x + 1];
      boardchanged = true;
      continue;
    }
  }
}
function movetoup(column, board) {
  let tttrm = column[0];
  for (let a = 1; a <= board.length - 1; a++) {
    if (column[a].number === "") continue;
    if (
      tttrm.y === column[a].y - 1 &&
      tttrm.number !== column[a].number &&
      tttrm.number !== ""
    ) {
      tttrm = column[tttrm.y + 1];
      console.log(tttrm);
      continue;
    }
    if (tttrm.number === "" && column[a].number !== "") {
      const number = column[a].number;
      const cell = document.createElement("div");
      const prevx = column[a].x;
      const prevy = column[a].y;
      visualiseTiles(column[a], number, tttrm.x, tttrm.y);
      board[tttrm.y][tttrm.x].div.remove();
      board[tttrm.y][tttrm.x] = column[a];
      board[prevy][prevx] = { y: prevy, x: prevx, div: cell, number: "" };
      createTile("", prevx, prevy);
      tttrm = board[tttrm.y][tttrm.x];
      boardchanged = true;
      continue;
    }
    if (tttrm.number !== "" && tttrm.number !== column[a].number) {
      const number = column[a].number;
      const cell = document.createElement("div");
      const prevx = column[a].x;
      const prevy = column[a].y;
      visualiseTiles(column[a], number, tttrm.x, tttrm.y + 1);
      board[tttrm.y + 1][tttrm.x] = column[a];
      board[prevy][prevx] = { y: prevy, x: prevx, div: cell, number: "" };
      createTile("", prevx, prevy);
      tttrm = board[tttrm.y + 1][tttrm.x];
      boardchanged = true;
      continue;
    }
    if (tttrm.number === column[a].number) {
      const number = column[a].number + column[a].number;
      const cell = document.createElement("div");
      const prevx = column[a].x;
      const prevy = column[a].y;
      visualiseTiles(column[a], number, tttrm.x, tttrm.y);
      board[tttrm.y][tttrm.x].div.remove();
      board[tttrm.y][tttrm.x] = column[a];
      board[prevy][prevx] = { y: prevy, x: prevx, div: cell, number: "" };
      createTile("", prevx, prevy);
      tttrm = board[tttrm.y + 1][tttrm.x];
      boardchanged = true;
      continue;
    }
  }
}

function movetodown(column, board) {
  console.log(column);
  let tttrm = column[board.length - 1];
  for (let a = GRID_SIZE - 2; a >= 0; a--) {
    if (column[a].number === "") continue;
    if (
      tttrm.y === column[a].y + 1 &&
      tttrm.number !== column[a].number &&
      tttrm.number !== ""
    ) {
      tttrm = column[tttrm.y - 1];
      console.log(tttrm);
      continue;
    }
    if (tttrm.number === "" && column[a].number !== "") {
      const number = column[a].number;
      const cell = document.createElement("div");
      const prevx = column[a].x;
      const prevy = column[a].y;
      visualiseTiles(column[a], number, tttrm.x, tttrm.y);
      board[tttrm.y][tttrm.x].div.remove();
      board[tttrm.y][tttrm.x] = column[a];
      board[prevy][prevx] = { y: prevy, x: prevx, div: cell, number: "" };
      createTile("", prevx, prevy);
      tttrm = board[tttrm.y][tttrm.x];
      boardchanged = true;
      continue;
    }
    if (tttrm.number !== "" && tttrm.number !== column[a].number) {
      const number = column[a].number;
      const cell = document.createElement("div");
      const prevx = column[a].x;
      const prevy = column[a].y;
      visualiseTiles(column[a], number, tttrm.x, tttrm.y - 1);
      board[tttrm.y - 1][tttrm.x] = column[a];
      board[prevy][prevx] = { y: prevy, x: prevx, div: cell, number: "" };
      createTile("", prevx, prevy);
      tttrm = board[tttrm.y - 1][tttrm.x];
      boardchanged = true;
      continue;
    }
    if (tttrm.number === column[a].number) {
      const number = column[a].number + column[a].number;
      const cell = document.createElement("div");
      const prevx = column[a].x;
      const prevy = column[a].y;
      visualiseTiles(column[a], number, tttrm.x, tttrm.y);
      board[tttrm.y][tttrm.x].div.remove();
      board[tttrm.y][tttrm.x] = column[a];
      board[prevy][prevx] = { y: prevy, x: prevx, div: cell, number: "" };
      createTile("", prevx, prevy);
      tttrm = board[tttrm.y - 1][tttrm.x];
      boardchanged = true;
      continue;
    }
  }
}

function moveright(board) {
  for (let a = 0; a <= board.length - 1; a++) {
    moveToright(board[a]);
  }
}
function moveLeft(board) {
  for (let a = 0; a <= board.length - 1; a++) {
    moveToleft(board[a]);
  }
}

function moveup(board) {
  for (let a = 0; a <= board.length - 1; a++) {
    let column = [];
    for (let b = 0; b <= board.length - 1; b++) {
      column.push(board[b][a]);
    }
    if (column.length === board.length) {
      movetoup(column, board);
      column = [];
    }
  }
}
function movedown(board) {
  for (let a = 0; a <= board.length - 1; a++) {
    let column = [];
    for (let b = 0; b <= board.length - 1; b++) {
      column.push(board[b][a]);
    }
    if (column.length === board.length) {
      movetodown(column, board);
      column = [];
    }
  }
}
window.addEventListener("keyup", (e) => {
  switch (e.key) {
    case "ArrowLeft":
      moveLeft(board);
      if (boardchanged === true) {
        boardchanged = false;
        createTile(randomNumber(), randomXY(), randomXY());
      }
      break;
    case "ArrowRight":
      moveright(board);
      if (boardchanged === true) {
        boardchanged = false;
        createTile(randomNumber(), randomXY(), randomXY());
      }
      break;
    case "ArrowUp":
      moveup(board);
      if (boardchanged === true) {
        boardchanged = false;
        createTile(randomNumber(), randomXY(), randomXY());
      }
      break;
    case "ArrowDown":
      movedown(board);
      if (boardchanged === true) {
        boardchanged = false;
        createTile(randomNumber(), randomXY(), randomXY());
      }
      break;
    default:
      break;
  }
});
