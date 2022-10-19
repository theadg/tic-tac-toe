const gameBoard = (function () {
  let board = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ];
  let currentSymbol = "X";
  const gameBoardRowOne = Array.from(document.querySelectorAll(".row--1"));
  const gameBoardRowTwo = Array.from(document.querySelectorAll(".row--2"));
  const gameBoardRowThree = Array.from(document.querySelectorAll(".row--3"));
  const gameBoardPieces = Array.from(
    document.querySelectorAll(".gameboard__field")
  );

  const switchSymbol = () => {
    if (currentSymbol === "X") {
      currentSymbol = "O";
    } else {
      currentSymbol = "X";
    }
  };

  const checkClick = (clicked) => {
    if (clicked === true) return;
  };

  const addClick = () => {
    gameBoardPieces.forEach((piece, index) => {
      piece.onclick = () => {
        if (piece.clicked === true) {
          return;
        }

        piece.clicked = true;
        piece.textContent = currentSymbol;

        if (index >= 0 && index <= 2) {
          board[0].splice(index, 1, currentSymbol);
        } else if (index > 2 && index <= 4) {
          board[1].splice(index - 3, 1, currentSymbol);
        } else {
          board[2].splice(index - 6, 1, currentSymbol);
        }

        switchSymbol();
        // console.log(board[0]);
        // console.log(board[1]);
        // console.log(board[2]);
      };
    });
  };

  //   TODO: Make this dynamic
  const horizontalWinner = (element) => {
    return element === "X";
  };

  const endGame = () => {
    gameBoardPieces.forEach((piece) => {
      piece.clicked = true;
    });
  };

  const checkWinner = () => {
    board.forEach((row, index) => {
      //horizontal winner
      if (row.every(horizontalWinner)) {
        console.log("victory!");
        endGame();
      }
      //   verticalwinner;
    });
    // TODO: Create logic just to check answers if there are x numbers of elements in row
    // TODO: Apply this to every row
    horizontalX = 0;
    for (let i = 0; i < board.length; i++) {
      if (board[i][0] == "X") {
        horizontalX++;
        if (horizontalX === 3) {
          console.log("victory!");
        }
      } else if (board[i][1] == "X") {
        horizontalX++;
        console.log(horizontalX);
        if (horizontalX === 3) {
          console.log("victory!");
        }
      } else if ((board[i][2] = "X")) {
        horizontalX++;
        // if (horizontalX === 3) console.log("victory!");
      }
    }

    // TODO: Create Diagonal Solution
  };
  return { addClick, checkWinner };
})();

gameBoard.addClick();
