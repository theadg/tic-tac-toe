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

  const getUpdatedInfo = () => {
    ({ playerOne, playerTwo, infoSubmit } = playerInfo);
  };
  let currentSymbol,
    prevSymbol = "";
  let currentPlayer = playerOne,
    prevPlayer;

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
    if (currentPlayer === playerOne) {
      currentPlayer = playerTwo;
      prevPlayer = playerOne;
    } else {
      currentPlayer = playerOne;
      prevPlayer = playerTwo;
    }
  };
  const setCurrentPlayer = () => {
    gameStatusBarText.textContent = `${playerOne.playerName}'s turn`;
    gameStatusBarSymbol.textContent = playerOne.playerSymbol;
  };

  // game Status Bar
  const gameStatusBar = document.querySelector("#gameStatusBar");
  const gameStatusBarText = document.querySelector("#gameStatusBarText");
  const gameStatusBarSymbol = document.querySelector("#gameStatusBarSymbol");
  gameStatusBarText.textContent = `${playerOne.playerName}'s turn`;
  gameStatusBarSymbol.textContent = playerOne.playerSymbol;

  const updateStatusBar = () => {
    gameStatusBarText.textContent = `${currentPlayer.playerName}'s turn`;
    gameStatusBarSymbol.textContent = currentSymbol;
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
        updateStatusBar();
        checkWinner();
      };
    });
  };

  const playerOneAI = () => {
    playerOne.playerName = "You";
    playerOne.playerSymbol = "X";
    currentSymbol = "X";
  };

  const addClickAI = () => {
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

        moveAI();
      };
    });
  };
  const fieldThree = document.querySelector("#fieldThree");
  const moveAI = () => {
    // make legal move
    const arrIndex = getRandomInt();
    const elemIndex = getRandomInt();

    if (board[arrIndex][elemIndex] !== "X") {
      fieldThree.textContent = "O";
      board[arrIndex].splice(elemIndex, 1, "O");
      console.log(board);
    }
    // make invincible
  };

  const getRandomInt = () => {
    return Math.floor(Math.random() * 3);
  };
  const checkTie = (element) => {
    return element !== "";
  };
  let gameTie = false;
  const checkWinner = () => {
    let tieCount = 0;
    board.forEach((row) => {
      //horizontal winner
      // console.log(row);
      if (row.every(horizontalWinner)) {
        console.log("victory! horizontal");
        endGame();
      }

      // checking invdividually, should check all as is
      if (row.every(checkTie)) {
        tieCount++;
        if (tieCount === 3) {
          gameStatusBarText.textContent = "It's a Tie";
          gameStatusBarSymbol.style.display = "none";

          // reset game here
          playAgainBtn.classList.toggle("hidden");
          changeModeBtn.classList.toggle("hidden");
          playerOneMainLabel.classList.toggle("hidden");
          playerTwoMainLabel.classList.toggle("hidden");
          toggleLabels();
        }
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

  const horizontalWinner = (element) => {
    return element === prevSymbol;
  };

  // after winning buttons
  const playAgainBtn = document.querySelector("#playAgainBtn");
  const changeModeBtn = document.querySelector("#changeModeBtn");

  playAgainBtn.onclick = () => {
    resetGame();
  };

  changeModeBtn.onclick = () => {
    resetGame();
  };

  const endGame = () => {
    clickAllPieces();
    gameStatusBarText.textContent = `${prevPlayer.playerName} won!`;
    gameStatusBarSymbol.textContent = prevSymbol;
    playAgainBtn.classList.toggle("hidden");
    changeModeBtn.classList.toggle("hidden");
    playerOneMainLabel.classList.toggle("hidden");
    playerTwoMainLabel.classList.toggle("hidden");
    toggleLabels();
  };
  const clickAllPieces = () => {
    gameBoardPieces.forEach((piece) => {
      piece.clicked = true;
    });
  };

  const removeClickAllPieces = () => {
    gameBoardPieces.forEach((piece) => {
      piece.clicked = false;
    });
  };
  // TODO: Reset Game
  const resetGame = () => {
    // reseting the board
    board = [
      ["", "", ""],
      ["", "", ""],
      ["", "", ""],
    ];

    // reseting the game
    gameBoardPieces.forEach((piece, index) => {
      piece.clicked = false;
      piece.textContent = "";
    });

    // hide the shit
    playAgainBtn.classList.toggle("hidden");
    changeModeBtn.classList.toggle("hidden");
    playerOneMainLabel.classList.toggle("hidden");
    playerTwoMainLabel.classList.toggle("hidden");

    // initialize game
    gameStatusBarText.textContent = `${playerOne.playerName}'s turn`;
    gameStatusBarSymbol.textContent = playerOne.playerSymbol;

    if (prevPlayer === playerTwo) {
      playerOneMainLabel.classList.toggle("show");
      playerTwoMainLabel.classList.toggle("show");
    }
    currentSymbol = playerOne.playerSymbol;
    currentPlayer = playerOne;

    // toggleLabels();
  };
  return {
    addClick,
    checkWinner,
    getUpdatedInfo,
    updateCurrentSymbol,
    setCurrentPlayer,
    resetGame,
    gameStatusBar,
    changeModeBtn,
    gameBoardPieces,
    clickAllPieces,
    removeClickAllPieces,
    addClickAI,
    playerOneAI,
  };
})();

const Player = (playerName, playerSymbol) => {
  return { playerName, playerSymbol };
};

const boardMenu = (function () {
  const modeTwoPlayers = document.querySelector("#modeTwoPlayers");
  const modeAI = document.querySelector("#modeAI");
  const playerGameMenu = document.querySelector("#playerGameMenu");
  const playerInformation = document.querySelector("#playerInformation");

  const playerOneNameLabel = document.querySelector("#playerOneNameLabel");
  const playerOneSymbolLabel = document.querySelector("#playerOneSymbolLabel");

  const playerTwoNameLabel = document.querySelector("#playerTwoNameLabel");
  const playerTwoSymbolLabel = document.querySelector("#playerTwoSymbolLabel");

  let { playerOne, playerTwo, startGameButton } = playerInfo;
  const { changeModeBtn, resetGame, gameStatusBar, addClick, gameBoardPieces } =
    gameBoard;
  modeTwoPlayers.onclick = () => {
    playerGameMenu.classList.toggle("hidden");
    playerInformation.classList.remove("hidden");
  };

  modeAI.onclick = () => {
    // Immediately start the game
  };
  const changeMode = () => {
    playerGameMenu.classList.toggle("hidden");
    playerInformation.classList.add("hidden");
    gameStatusBar.classList.toggle("hidden");
    playerGameLabel.classList.toggle("hidden");
    startGameButton.classList.toggle("hidden");
    resetGame();
  };

  const getUpdatedInfo = () => {
    ({ playerOne, playerTwo } = playerInfo);
  };

  const showPlayerLabels = () => {
    getUpdatedInfo();

    playerOneNameLabel.value = playerOne.playerName;
    playerOneSymbolLabel.textContent = playerOne.playerSymbol;
    playerTwoNameLabel.value = playerTwo.playerName;
    playerTwoSymbolLabel.textContent = playerTwo.playerSymbol;

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
    changeModeBtn,
    changeMode,
    modeAI,
  };
})();

playerInfo.playerVerify();
playerInfo.activeSymbol();
playerInfo.startGameButton.onclick = () => {
  playerInfo.createNewPlayers();
  boardMenu.showPlayerLabels();
  playerInfo.infoSubmit = true;
  gameBoard.gameStatusBar.classList.remove("hidden");
  gameBoard.removeClickAllPieces();
  gameBoard.getUpdatedInfo();
  gameBoard.setCurrentPlayer();
  gameBoard.updateCurrentSymbol();
  gameBoard.addClick();
};

boardMenu.changeModeBtn.onclick = () => {
  boardMenu.changeMode();
  gameBoard.clickAllPieces();
};

boardMenu.modeAI.onclick = () => {
  // show menu

  // functionality first, after na yung menu
  // initialize player one
  gameBoard.playerOneAI();
  gameBoard.addClickAI();
  // try to randomize
};
// TODO Deadline: before 3 pm
// TODO: Show Options, make options work
//
// TODO: highlight winning tiles

// TODO: fix winning screen implementation
// TODO: Implement AI , probably use setTimeout method when implementing
