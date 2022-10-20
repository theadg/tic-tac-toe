// Module for the GameBoard
const gameBoard = (function () {
  let board = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ];
  let currentSymbol = "X";
  let prevSymbol = "";
  // const gameBoardRowOne = Array.from(document.querySelectorAll(".row--1"));
  // const gameBoardRowTwo = Array.from(document.querySelectorAll(".row--2"));
  // const gameBoardRowThree = Array.from(document.querySelectorAll(".row--3"));

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

//Module for player info
const playerInfo = (function () {
  const playerOneX = document.querySelector("#playerOneX");
  const playerOneO = document.querySelector("#playerOneO");
  const playerTwoX = document.querySelector("#playerTwoX");
  const playerTwoO = document.querySelector("#playerTwoO");

  const playerOneName = document.querySelector("#playerOneName");
  const playerTwoName = document.querySelector("#playerTwoName");

  const playerOneSubmit = document.querySelector("#playerOneSubmit");
  const playerTwoSubmit = document.querySelector("#playerTwoSubmit");
  playerOneSubmit.disabled = true;
  playerTwoSubmit.disabled = true;

  let playerOneSymbol = "X",
    playerTwoSymbol = "O";

  const setActiveSymbolXO = () => {
    playerOneSymbol = "X";
    playerTwoSymbol = "O";
    playerOneX.classList.add("gameboard__symbol--active");
    playerOneO.classList.remove("gameboard__symbol--active");

    playerTwoO.classList.add("gameboard__symbol--active");
    playerTwoX.classList.remove("gameboard__symbol--active");
  };

  const setActiveSymbolOX = () => {
    playerOneSymbol = "O";
    playerTwoSymbol = "X";
    playerOneX.classList.remove("gameboard__symbol--active");
    playerOneO.classList.add("gameboard__symbol--active");

    playerTwoX.classList.add("gameboard__symbol--active");
    playerTwoO.classList.remove("gameboard__symbol--active");
  };
  const activeSymbol = () => {
    playerOneX.onclick = () => {
      setActiveSymbolXO();
    };

    playerOneO.onclick = () => {
      setActiveSymbolOX();
    };

    playerTwoX.onclick = () => {
      setActiveSymbolOX();
    };

    playerTwoO.onclick = () => {
      setActiveSymbolOX();
    };
  };

  const createPlayer = (playerName, playerSymbol) => {
    return { playerName, playerSymbol };
  };

  const playerVerify = () => {
    if (!playerOneName.value) {
      playerOneSubmit.disabled = true;
      setStartGameButton();
    }

    if (!playerTwoName.value) {
      playerTwoSubmit.disabled = true;
      setStartGameButton();
    }

    playerOneName.oninput = () => {
      if (playerOneName.value) {
        playerOneSubmit.disabled = false;
        setStartGameButton();
      } else {
        playerOneSubmit.disabled = true;
        setStartGameButton();
      }
    };

    playerTwoName.oninput = () => {
      if (playerTwoName.value) {
        playerTwoSubmit.disabled = false;
        setStartGameButton();
      } else {
        playerTwoSubmit.disabled = true;
        setStartGameButton();
      }
    };
  };

  const playerOne = createPlayer(playerOneName.value, playerOneSymbol);
  const playerTwo = createPlayer(playerTwoName.value, playerTwoSymbol);

  const startGameButton = document.querySelector("#startGameButton");
  startGameButton.disabled = true;

  const setStartGameButton = () => {
    if (
      playerOneSubmit.disabled === true ||
      playerTwoSubmit.disabled === true
    ) {
      startGameButton.disabled = true;
    } else if (
      playerOneSubmit.disabled === false &&
      playerTwoSubmit.disabled === false
    ) {
      startGameButton.disabled = false;
    }
  };

  return { activeSymbol, playerVerify, createPlayer, playerOne, playerTwo };
})();

const Player = (playerName, playerSymbol) => {
  return { playerName, playerSymbol };
};

const boardMenu = (function () {
  const modeTwoPlayers = document.querySelector("#modeTwoPlayers");
  const playerGameMenu = document.querySelector("#playerGameMenu");
  const playerInformation = document.querySelector("#playerInformation");

  modeTwoPlayers.onclick = () => {
    playerGameMenu.classList.toggle("hidden");
    playerInformation.classList.remove("hidden");
    console.log(menuTwoPlayers);
  };
})();

playerInfo.playerVerify();
playerInfo.activeSymbol();
gameBoard.addClick();
