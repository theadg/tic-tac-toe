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
  let infoSubmit = false;
  playerOneSubmit.disabled = true;
  playerTwoSubmit.disabled = true;

  // let playerOneSymbol = "X",
  //   playerTwoSymbol = "O";
  let playerOneSymbol = "X",
    playerTwoSymbol = "O";

  const setActiveSymbolXO = () => {
    playerOne.playerSymbol = "X";
    playerTwo.playerSymbol = "O";
    playerOne.playerName = playerOneName.value;
    playerTwo.playerName = playerTwoName.value;

    playerOne.playerName = playerOneX.classList.add(
      "gameboard__symbol--active"
    );
    playerOneO.classList.remove("gameboard__symbol--active");

    playerTwoO.classList.add("gameboard__symbol--active");
    playerTwoX.classList.remove("gameboard__symbol--active");
  };

  const setActiveSymbolOX = () => {
    playerOne.playerSymbol = "O";
    playerTwo.playerSymbol = "X";
    playerOne.playerName = playerOneName.value;
    playerTwo.playerName = playerTwoName.value;
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
      setActiveSymbolXO();
    };
  };

  const createPlayer = (playerName, playerSymbol) => {
    return { playerName, playerSymbol };
  };

  const playerVerify = () => {
    if (!playerOneName.value) {
      playerOneSubmit.disabled = true;
      playerOne.playerName = playerOneName.value;
      setStartGameButton();
    }

    if (!playerTwoName.value) {
      playerTwoSubmit.disabled = true;
      playerTwo.playerName = playerTwoName.value;

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

  let playerOne = createPlayer(playerOneName.value, playerOneSymbol);
  let playerTwo = createPlayer(playerTwoName.value, playerTwoSymbol);

  // let playerOne, playerTwo;
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

  const createNewPlayers = () => {
    playerOne.playerName = playerOneName.value;
    playerTwo.playerName = playerTwoName.value;
  };
  // startGameButton.onclick = () => {

  // };

  return {
    activeSymbol,
    playerVerify,
    createPlayer,
    createNewPlayers,
    playerOne,
    playerTwo,
    startGameButton,
  };
})();

// Module for the GameBoard
const gameBoard = (function () {
  let board = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ];
  let { playerOne, playerTwo, infoSubmit } = playerInfo;

  const playerOneMainLabel = document.querySelector("#playerOneMainLabel");
  const playerTwoMainLabel = document.querySelector("#playerTwoMainLabel");
  playerOneMainLabel.classList.add("show");

  const toggleLabels = () => {
    playerOneMainLabel.classList.toggle("show");
    playerTwoMainLabel.classList.toggle("show");
  };
  console.log(playerOneMainLabel);
  const getUpdatedInfo = () => {
    ({ playerOne, playerTwo, infoSubmit } = playerInfo);
  };
  let currentSymbol,
    prevSymbol = "";

  const updateCurrentSymbol = () => {
    currentSymbol = playerOne.playerSymbol;
  };

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
        toggleLabels();
        checkWinner();
      };
    });
  };

  const checkWinner = () => {
    board.forEach((row) => {
      //horizontal winner
      console.log(row);
      if (row.every(horizontalWinner)) {
        console.log("victory! horizontal");
        endGame();
      }
    });

    let colOneElements = 0,
      colTwoElements = 0,
      colThreeElements = 0;
    //  vertical winner
    for (let i = 0; i < board.length; i++) {
      if (board[i][0] === prevSymbol) {
        colOneElements++;
        console.log(`COL ONE: ${colOneElements} ${prevSymbol}`);
        if (colOneElements === 3) {
          console.log("victory col one");
          endGame();
        }
      } else if (board[i][1] === prevSymbol) {
        colTwoElements++;
        console.log(`COL TWO: ${colTwoElements} ${prevSymbol}`);
        if (colTwoElements === 3) {
          console.log("victory! col two");
          endGame();
        }
      } else if (board[i][2] === prevSymbol) {
        colThreeElements++;
        console.log(`COL THREE: ${colThreeElements} ${prevSymbol}`);
        if (colThreeElements === 3) {
          console.log("victory! col three");
          endGame();
        }
      }
    }

    // diagonal winner
    if (
      (board[0][0] === prevSymbol &&
        board[1][1] === prevSymbol &&
        board[2][2] === prevSymbol) ||
      (board[0][2] === prevSymbol &&
        board[1][1] === prevSymbol &&
        board[2][0] === prevSymbol)
    ) {
      console.log("victory diagonal");
      endGame();
    }
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

  return { addClick, checkWinner, getUpdatedInfo, updateCurrentSymbol };
})();

const Player = (playerName, playerSymbol) => {
  return { playerName, playerSymbol };
};

const boardMenu = (function () {
  const modeTwoPlayers = document.querySelector("#modeTwoPlayers");
  const playerGameMenu = document.querySelector("#playerGameMenu");
  const playerInformation = document.querySelector("#playerInformation");

  const playerOneNameLabel = document.querySelector("#playerOneNameLabel");
  const playerOneSymbolLabel = document.querySelector("#playerOneSymbolLabel");

  const playerTwoNameLabel = document.querySelector("#playerTwoNameLabel");
  const playerTwoSymbolLabel = document.querySelector("#playerTwoSymbolLabel");

  let { playerOne, playerTwo, startGameButton, infoSubmit } = playerInfo;

  modeTwoPlayers.onclick = () => {
    playerGameMenu.classList.toggle("hidden");
    playerInformation.classList.remove("hidden");
  };

  const getUpdatedInfo = () => {
    ({ playerOne, playerTwo } = playerInfo);
    console.log(playerOne);
    console.log(playerTwo);
  };
  const showPlayerLabels = () => {
    getUpdatedInfo();

    playerOneNameLabel.value = playerOne.playerName;
    playerOneSymbolLabel.textContent = playerOne.playerSymbol;
    playerTwoNameLabel.value = playerTwo.playerName;
    playerTwoSymbolLabel.textContent = playerTwo.playerSymbol;

    // console.log(playerOne, playerTwo);
    startGameButton.classList.toggle("hidden");
    playerInformation.classList.toggle("hidden");
    playerGameLabel.classList.toggle("hidden");
  };
  startGameButton.onclick = () => {
    showPlayerLabels();
  };

  return {
    playerOneNameLabel,
    playerOneSymbolLabel,
    playerTwoNameLabel,
    playerTwoSymbolLabel,
    showPlayerLabels,
  };
})();

playerInfo.playerVerify();
playerInfo.activeSymbol();
playerInfo.startGameButton.onclick = () => {
  playerInfo.createNewPlayers();
  boardMenu.showPlayerLabels();
  playerInfo.infoSubmit = true;

  gameBoard.getUpdatedInfo();
  gameBoard.updateCurrentSymbol();
  gameBoard.addClick();
};

// TODO: show the winner on bar, update the
