let cells = document.querySelectorAll(".cell");

let turn = document.querySelector(".turn span");

let p1score = document.querySelector(".player1 span");

let p2score = document.querySelector(".player2 span");

let draws = document.querySelector(".draws span");
let overlay = document.querySelector(".overlay");
let content = document.querySelector(".content");

let x = '<i class = "fa fa-close">';
let o = '<i class = "fa fa-circle-o">';
let symbol = x;
turn.innerHTML = symbol;
let i = 0;

let player1 = {
  symbol: x,
  score: 0,
};
let player2 = {
  symbol: o,
  score: 0,
};

let board = ["", "", "", "", "", "", "", "", ""];
let gameover = false;

function add(j) {
  if (gameover == false && board[j] == "") {
    cells[j].innerHTML = symbol;
    board[j] = symbol;
    if (i % 2 == 0) {
      symbol = o;
    } else {
      symbol = x;
    }
    i++;
    turn.innerHTML = symbol;
    check();
  }
}

for (let j = 0; j < cells.length; j++) {
  cells[j].addEventListener("click", function () {
    add(j);
  });
}

let nbdraw = 0;
const check = () => {
  let winningcombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8], // Rows
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8], // Columns
    [0, 4, 8],
    [2, 4, 6], // Diagonals
  ];
  let winnerFound = false;

  for (let k = 0; k < winningcombos.length; k++) {
    combo = winningcombos[k];
    if (board[combo[0]] == x && board[combo[1]] == x && board[combo[2]] == x) {
      content.innerHTML = "x is the <h1> Winner</h1> ";
      overlay.style.display = "flex";

      player1.score++;
      p1score.innerHTML = player1.score;

      winnerFound = true;
      gameover = true;
      break;
    }
    if (board[combo[0]] == o && board[combo[1]] == o && board[combo[2]] == o) {
      content.innerHTML = "O is the <h1> Winner</h1> ";
      overlay.style.display = "flex";

      player2.score++;
      p2score.innerHTML = player2.score;

      winnerFound = true;
      gameover = true;
      break;
    }
    if (!winnerFound && board.every((cell) => cell !== "")) {
      nbdraw++;
      draws.innerHTML = nbdraw;
      content.innerHTML = "It's a draw";
      overlay.style.display = "flex";
    }
  }
};
const reset = () => {
  symbol = x;
  gameover = false;
  board = ["", "", "", "", "", "", "", "", ""];
  turn.innerHTML = symbol;
  i = 0;
  for (let j = 0; j < cells.length; j++) {
    cells[j].innerHTML = "";
    cells[j].addEventListener("click", add);
  }
};

let closeBtn = document.querySelector(".closeBtn");

closeBtn.addEventListener("click", function () {
  overlay.style.display = "none";
});
