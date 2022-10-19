const gameBoard = (function () {
  let board = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ];
  let currentSymbol = "X";
  let prevSymbol = "";
  const gameBoardRowOne = Array.from(document.querySelectorAll(".row--1"));
  const gameBoardRowTwo = Array.from(document.querySelectorAll(".row--2"));
  const gameBoardRowThree = Array.from(document.querySelectorAll(".row--3"));
  const gameBoardPieces = Array.from(
    document.querySelectorAll(".gameboard__field")
  );

  const switchSymbol = () => {
    if (currentSymbol === "X") {
      currentSymbol = "O";
      prevSymbol = "X";
    } else {
      currentSymbol = "X";
      prevSymbol = "O";
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
          console.log(`${index} added row one`);
        } else if (index >= 3 && index <= 5) {
          board[1].splice(index - 3, 1, currentSymbol);
          console.log(`${index} added row two`);
        } else if (index >= 6 && index <= 9) {
          board[2].splice(index - 6, 1, currentSymbol);
          console.log(`${index} added row three`);
        }

        switchSymbol();
        // console.log(board[0]);
        // console.log(board[1]);
        // console.log(board[2]);
        checkWinner();
      };
    });
  };

  //   TODO: Make this dynamic DONE
  const horizontalWinner = (element) => {
    return element === prevSymbol;
  };

  const endGame = () => {
    gameBoardPieces.forEach((piece) => {
      piece.clicked = true;
    });
  };

  const checkWinner = () => {
    board.forEach((row, index) => {
      //horizontal winner
      console.log(row);
      if (row.every(horizontalWinner)) {
        console.log("victory! horizontal");
        endGame();
      }
      //   verticalwinner;
    });

    // TODO: Create logic just to check answers if there are x numbers of elements in row
    // TODO: Apply this to every row

    // this code should only run if all the a row is completed
    for (let i = 0; i < board.length; i++) {
      let colOneElements = 0,
        colTwoElements = 0,
        colThreeElements = 0;
      if (board[i][0] == prevSymbol) {
        colOneElements++;
        console.log(`COL ONE: ${colOneElements} ${prevSymbol}`);
        if (colOneElements === 3) {
          console.log("victory col one");
        }
      } else if (board[i][1] === prevSymbol) {
        colTwoElements++;
        console.log(`COL TWO: ${colTwoElements} ${prevSymbol}`);
        if (colTwoElements === 3) {
          console.log("victory! col two");
        }
      } else if (board[i][2] === prevSymbol) {
        colThreeElements++;
        console.log(`COL THREE: ${colThreeElements} ${prevSymbol}`);
        if (colThreeElements === 3) {
          console.log("victory! col three");
        }
      }
    }

    // TODO: Create Diagonal Solution
    if (
      (board[0][0] === prevSymbol &&
        board[1][1] === prevSymbol &&
        board[2][2] === prevSymbol) ||
      (board[0][2] === prevSymbol &&
        board[1][1] === prevSymbol &&
        board[2][0] === prevSymbol)
    ) {
      console.log("victory diagonal");
    }
  };
  return { addClick, checkWinner };
})();

gameBoard.addClick();
