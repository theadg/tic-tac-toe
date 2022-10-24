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

  const createNewPlayersAI = () => {
    playerOne.playerName = "You";
    playerOne.playerSymbol = "X";

    playerTwo.playerName = "AI";
    playerTwo.playerSymbol = "O";
  };

  return {
    activeSymbol,
    playerVerify,
    createPlayer,
    createNewPlayers,
    createNewPlayersAI,
    playerOne,
    playerTwo,
    startGameButton,
  };
})();

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

  const setCurrentPlayerAI = () => {
    gameStatusBarText.textContent = `Your turn`;
    gameStatusBarSymbol.textContent = playerOne.playerSymbol;
  };

  const gameStatusBar = document.querySelector("#gameStatusBar");
  const gameStatusBarText = document.querySelector("#gameStatusBarText");
  const gameStatusBarSymbol = document.querySelector("#gameStatusBarSymbol");
  gameStatusBarText.textContent = `${playerOne.playerName}'s turn`;
  gameStatusBarSymbol.textContent = playerOne.playerSymbol;

  const updateStatusBar = () => {
    gameStatusBarText.textContent = `${currentPlayer.playerName}'s turn`;
    gameStatusBarSymbol.textContent = currentSymbol;
  };

  const updateStatusBarAI = () => {
    if (currentPlayer.playerName === "You" && !playerWin) {
      gameStatusBarText.textContent = `Your turn`;
    } else {
      if (!playerWin) {
        gameStatusBarText.textContent = `AI's turn`;

        setTimeout(() => {
          gameStatusBarText.textContent = `Your turn`;
        }, 500);
      }
    }
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
  const gameBoardRowOne = document.querySelectorAll(".gameboard__row--1");
  const gameBoardRowTwo = document.querySelectorAll(".gameboard__row--2");
  const gameBoardRowThree = document.querySelectorAll(".gameboard__row--3");

  console.log([...gameBoardRowOne][0]);
  console.log([...gameBoardRowTwo][1]);
  console.log([...gameBoardRowThree][2]);

  const addClickAI = () => {
    currentSymbol = "X";
    let tieCount = 0,
      playerWin = false;
    gameBoardPieces.forEach((piece, index) => {
      piece.onclick = () => {
        if (piece.clicked === true) {
          return;
        }

        piece.textContent = currentSymbol;
        piece.clicked = true;

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
        checkAIWinner();

        board.forEach((row) => {
          tieCount = 0;
          if (row.every(checkTie)) {
            tieCount++;
            console.log(`Tie Count: ${tieCount}`);
            if (tieCount > 3) {
              gameStatusBarText.textContent = "It's a tie!";
              playAgainBtnAI.classList.remove("hidden");
              changeModeBtn.classList.remove("hidden");
              playerOneMainLabel.classList.add("hidden");
              playerTwoMainLabel.classList.add("hidden");
            }
          }
        });

        if (tieCount < 4 && !playerWin) {
          moveAI();
          updateStatusBarAI();
          setTimeout(() => toggleLabels(), 500);
          checkAIWinner();
        }
        switchSymbol();
        toggleLabels();
        checkAIWinner();
      };
    });
  };

  const checkAIWinner = () => {
    prevSymbol = "X";

    let colOneElements = 0,
      colTwoElements = 0,
      colThreeElements = 0;

    board.forEach((row) => {
      if (row.every(horizontalWinner)) {
        console.log("victory! horizontal");
        endGameAI();
      }
    });

    for (let i = 0; i < board.length; i++) {
      if (board[i][0] === "X") {
        colOneElements++;
        console.log(`COL ONE: ${colOneElements} ${prevSymbol}`);
        if (colOneElements === 3) {
          console.log("victory col one");
          endGameAI();
        }
      } else if (board[i][1] === "X") {
        colTwoElements++;
        console.log(`COL TWO: ${colTwoElements} ${prevSymbol}`);
        if (colTwoElements === 3) {
          console.log("victory! col two");
          endGameAI();
        }
      } else if (board[i][2] === "X") {
        colThreeElements++;
        console.log(`COL THREE: ${colThreeElements} ${prevSymbol}`);
        if (colThreeElements === 3) {
          console.log("victory! col three");
          endGameAI();
        }
      }
    }

    if (
      (board[0][0] === prevSymbol &&
        board[1][1] === prevSymbol &&
        board[2][2] === prevSymbol) ||
      (board[0][2] === prevSymbol &&
        board[1][1] === prevSymbol &&
        board[2][0] === prevSymbol)
    ) {
      console.log("victory diagonal");
      endGameAI();
    } else if (
      (board[0][0] === "O" && board[1][1] === "O" && board[2][2] === "O") ||
      (board[0][2] === "O" && board[1][1] === "O" && board[2][0] === "O")
    ) {
      console.log("victory diagonal");
      endGameAI();
    }
  };
  const getLegitNumbers = () => {
    arrIndex = getRandomInt();
    elemIndex = getRandomInt();
  };

  const makeMove = () => {};
  const moveAI = () => {
    getLegitNumbers();
    if (!playerWin) {
      if (
        board[arrIndex][elemIndex] !== "X" &&
        board[arrIndex][elemIndex] !== "O"
      ) {
        board[arrIndex].splice(elemIndex, 1, "O");
        if (arrIndex === 0) {
          setTimeout(
            () => ([...gameBoardRowOne][elemIndex].textContent = "O"),
            500
          );
          [...gameBoardRowOne][elemIndex].clicked = true;
        } else if (arrIndex === 1) {
          setTimeout(
            () => ([...gameBoardRowTwo][elemIndex].textContent = "O"),
            500
          );
          [...gameBoardRowTwo][elemIndex].clicked = true;
        } else if (arrIndex === 2) {
          setTimeout(
            () => ([...gameBoardRowThree][elemIndex].textContent = "O"),
            500
          );
          [...gameBoardRowThree][elemIndex].clicked = true;
        }
      } else {
        do {
          getLegitNumbers();

          console.table(board);
        } while (board[arrIndex][elemIndex] !== "");

        board[arrIndex].splice(elemIndex, 1, "O");

        if (arrIndex === 0) {
          setTimeout(
            () => ([...gameBoardRowOne][elemIndex].textContent = "O"),
            500
          );
        } else if (arrIndex === 1) {
          setTimeout(
            () => ([...gameBoardRowTwo][elemIndex].textContent = "O"),
            500
          );
        } else if (arrIndex === 2) {
          setTimeout(
            () => ([...gameBoardRowThree][elemIndex].textContent = "O"),
            500
          );
        }
        console.log("EDGE CASED");
      }
    }
  };

  const getRandomInt = () => {
    return Math.floor(Math.random() * 3);
  };
  const checkTie = (element) => {
    return element !== "";
  };

  const checkWinner = () => {
    let tieCount = 0;

    let colOneElements = 0,
      colTwoElements = 0,
      colThreeElements = 0;

    board.forEach((row) => {
      if (row.every(checkTie)) {
        tieCount++;
        if (tieCount === 3) {
          playAgainBtn.classList.remove("hidden");
          changeModeBtn.classList.remove("hidden");
          playerOneMainLabel.classList.add("hidden");
          playerTwoMainLabel.classList.add("hidden");

          gameStatusBarText.textContent = "It's a FUCKING TIE";
          gameStatusBarSymbol.style.display = "none";

          toggleLabels();
          toggleLabels();
        }
      }
    });
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

    board.forEach((row) => {
      if (row.every(horizontalWinner)) {
        console.log("victory! horizontal");
        endGame();
      }
    });
  };

  const horizontalWinner = (element) => {
    return element === prevSymbol;
  };

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
    playAgainBtn.classList.remove("hidden");
    changeModeBtn.classList.remove("hidden");
    playerOneMainLabel.classList.add("hidden");
    playerTwoMainLabel.classList.add("hidden");

    toggleLabels();
  };

  const playAgainBtnAI = document.querySelector("#playAgainBtnAI");
  playerWin = false;

  const endGameAI = () => {
    gameStatusBarText.textContent = `${currentPlayer.playerName} won!`;
    gameStatusBarSymbol.textContent = prevSymbol;

    playAgainBtnAI.classList.toggle("hidden");
    changeModeBtn.classList.toggle("hidden");
    playerOneMainLabel.classList.toggle("hidden");
    playerTwoMainLabel.classList.toggle("hidden");
    clickAllPieces();
    toggleLabels();
    playerWin = true;
  };

  const clickAllPieces = () => {
    gameBoardPieces.forEach((piece) => {
      piece.clicked = true;
    });
  };

  playAgainBtnAI.onclick = () => {
    playerWin = false;
    resetGameAI();
    toggleLabels();
    // boardMenu.showPlayerLabelsAI();
    playAgainBtnAI.classList.add("hidden");
    changeModeBtn.classList.add("hidden");
    playerInfo.createNewPlayersAI();
    gameBoard.setCurrentPlayerAI();
    gameBoard.playerOneAI();
    gameBoard.addClickAI();
    playerOneMainLabel.classList.remove("hidden");
    playerTwoMainLabel.classList.remove("hidden");
  };

  const removeClickAllPieces = () => {
    gameBoardPieces.forEach((piece) => {
      piece.clicked = false;
    });
  };

  const resetGame = () => {
    board = [
      ["", "", ""],
      ["", "", ""],
      ["", "", ""],
    ];

    gameBoardPieces.forEach((piece, index) => {
      piece.clicked = false;
      piece.textContent = "";
    });

    playAgainBtn.classList.toggle("hidden");
    changeModeBtn.classList.toggle("hidden");
    playerOneMainLabel.classList.toggle("hidden");
    playerTwoMainLabel.classList.toggle("hidden");

    gameStatusBarText.textContent = `${playerOne.playerName}'s turn`;
    gameStatusBarSymbol.textContent = playerOne.playerSymbol;

    if (prevPlayer === playerTwo) {
      playerOneMainLabel.classList.toggle("show");
      playerTwoMainLabel.classList.toggle("show");
    }
    currentSymbol = playerOne.playerSymbol;
    currentPlayer = playerOne;
  };

  const resetGameAI = () => {
    board = [
      ["", "", ""],
      ["", "", ""],
      ["", "", ""],
    ];

    gameBoardPieces.forEach((piece, index) => {
      piece.clicked = false;
      piece.textContent = "";
    });
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
    setCurrentPlayerAI,
    resetGameAI,
    playAgainBtnAI,
    playAgainBtn,
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

  const showPlayerLabelsAI = () => {
    playerGameLabel.classList.toggle("hidden");
    playerOneNameLabel.value = playerOne.playerName;
    playerOneSymbolLabel.textContent = playerOne.playerSymbol;
    playerTwoNameLabel.value = playerTwo.playerName;
    playerTwoSymbolLabel.textContent = playerTwo.playerSymbol;
  };

  return {
    playerOneNameLabel,
    playerOneSymbolLabel,
    playerTwoNameLabel,
    playerTwoSymbolLabel,
    playerGameMenu,
    showPlayerLabels,
    showPlayerLabelsAI,
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
  gameBoard.playAgainBtnAI.classList.add("hidden");
  gameBoard.removeClickAllPieces();
  gameBoard.getUpdatedInfo();
  gameBoard.setCurrentPlayer();
  gameBoard.updateCurrentSymbol();
  gameBoard.addClick();
};

boardMenu.changeModeBtn.onclick = () => {
  boardMenu.changeMode();
  playAgainBtn.classList.toggle("hidden");
  gameBoard.clickAllPieces();
};

boardMenu.modeAI.onclick = () => {
  startGameButton.classList.toggle("hidden");
  gameBoard.gameStatusBar.classList.remove("hidden");
  gameBoard.playAgainBtn.classList.add("hidden");
  gameBoard.resetGameAI();
  playerInfo.createNewPlayersAI();
  gameBoard.setCurrentPlayerAI();
  boardMenu.playerGameMenu.classList.toggle("hidden");
  boardMenu.showPlayerLabelsAI();

  gameBoard.playerOneAI();
  gameBoard.addClickAI();
};
