const BOARD_SIZE = 8;
const NUMBER_OF_MINES = 8;
let openedcells = BOARD_SIZE * BOARD_SIZE - NUMBER_OF_MINES;
let firstMove = false;
const gameproc = document.querySelector(".gameproc");
const boardElement = document.querySelector(".board");
const minesLeftText = document.querySelector("[data-mine-count]");
const messageText = document.querySelector(".subtext");
//minesLeftText.innerHTML = NUMBER_OF_MINES;
let a = 0;
const TILE_STATUSES = {
  HIDDEN: "hidden",
  MINE: "mine",
  NUMBER: "number",
  MARKED: "marked",
};

function plantBomb(y, x, board) {
  const mineY = Math.floor(Math.random() * BOARD_SIZE);
  const mineX = Math.floor(Math.random() * BOARD_SIZE);
  if (board[mineY][mineX].mine === true) {
    plantBomb(y, x, board);
    return;
  }
  if (mineY === y && mineX === x) {
    plantBomb(y, x, board);
    return;
  } else {
    board[mineY][mineX].mine = true;
    //board[mineY][mineX].element.dataset.status = TILE_STATUSES.MINE;
  }
}
function plantBombs(y, x, board) {
  if (firstMove === false) {
    return;
  }
  firstMove = false;
  for (let a = 0; a <= NUMBER_OF_MINES - 1; a++) {
    plantBomb(y, x, board);
  }
}
function s(y, x, board) {
  //board[y][x].element.dataset.status = TILE_STATUSES.NUMBER;
  let it = [];
  let nearMines = 0;
  for (let a = y - 1; a <= y + 1; a++) {
    for (let b = x - 1; b <= x + 1; b++) {
      if (b === -1 || a > BOARD_SIZE - 1 || a === -1 || b > BOARD_SIZE - 1) {
        continue;
      }
      if (board[a][b].element.dataset.status === TILE_STATUSES.NUMBER || board[a][b].element.dataset.status === TILE_STATUSES.MARKED) continue;
      //if (board[a][b].element.dataset.status === TILE_STATUSES.MARKED) continue;
      if (board[a][b].mine === true) {
        nearMines++;
        continue;
      }
      it.push({ y: a, x: b });
      // a++;
      // console.log(a);
    }
  }
  if (nearMines === 0) {
    board[y][x].element.dataset.status = TILE_STATUSES.NUMBER;
    it.forEach((m) => s(m.y, m.x, board));
  } else {
    board[y][x].element.dataset.status = TILE_STATUSES.NUMBER;
    board[y][x].element.innerHTML = nearMines;
  }
}
function markTile(y, x, board) {
  if (board[y][x].element.dataset.status === TILE_STATUSES.NUMBER) return;
  if (board[y][x].element.dataset.status === TILE_STATUSES.HIDDEN) {
    minesLeftText.innerHTML--;
    board[y][x].element.dataset.status = TILE_STATUSES.MARKED;
  } else {
    minesLeftText.innerHTML++;
    board[y][x].element.dataset.status = TILE_STATUSES.HIDDEN;
  }
}

function checkGameEnd(board) {
  let acc = 0;
  for (let a = 0; a <= BOARD_SIZE - 1; a++) {
    for (let b = 0; b <= BOARD_SIZE - 1; b++) {
      if (board[a][b].element.dataset.status === TILE_STATUSES.NUMBER) {
        acc++;
      }
    }
  }
  if (acc === openedcells) return true;
}
function revealallmines(board) {
  for (let a = 0; a <= BOARD_SIZE - 1; a++) {
    for (let b = 0; b <= BOARD_SIZE - 1; b++) {
      if (board[a][b].mine === true) {
        board[a][b].element.dataset.status = TILE_STATUSES.MINE;
      }
    }
  }
}
function createBoard(boardSize) {
  firstMove = true;
  const board = [];
  for (let y = 0; y < boardSize; y++) {
    const row = [];
    for (let x = 0; x < boardSize; x++) {
      const element = document.createElement("div");
      gameproc.innerHTML = "gaming";
      //messageText.innerHTML = 'Mines Left'
      minesLeftText.innerHTML = NUMBER_OF_MINES;
      element.dataset.status = TILE_STATUSES.HIDDEN;
      boardElement.append(element);
      element.addEventListener("click", () => {
        if (board[y][x].element.dataset.status === TILE_STATUSES.MARKED) return;
        if (board[y][x].mine === true) {
          board[y][x].element.dataset.status = TILE_STATUSES.MINE;
          revealallmines(board);
          gameproc.innerHTML = "YOU LOST";
          setTimeout(() => {
            boardElement.innerHTML = "";
            createBoard(BOARD_SIZE);
          }, 1000);
          return;
        }
        plantBombs(y, x, board);
        s(y, x, board);
        if (checkGameEnd(board)) {
          revealallmines(board);
          gameproc.innerHTML = "YOU WON";
          setTimeout(() => {
            boardElement.innerHTML = "";
            createBoard(BOARD_SIZE);
          }, 1000);
          // messageText.innerHTML = 'fuck'
          //minesLeftText.innerHTML = NUMBER_OF_MINES;
          return;
        }
      });
      element.addEventListener("contextmenu", (e) => {
        e.preventDefault();
        markTile(y, x, board);
      });
      const tile = {
        element,
        x,
        y,
        mine: false,
      };
      row.push(tile);
    }
    board.push(row);
  }
  boardElement.style.setProperty("--size", BOARD_SIZE);
  //console.log(board);
  return board;
}
createBoard(BOARD_SIZE);

