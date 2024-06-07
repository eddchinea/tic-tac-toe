function gameBoard () {
    const rows = 3;
    const columns = 3;
    const board = [];

    for (let i = 0; i < rows; i++) {
        board[i] = [];
        for (let j = 0; i < columns; j++) {
            board[i].push(mark())
        }
    }

    getBoard = () => board;

    placeMark = (player, row, column) => {
        if (board[row][column].getValue() !== 0) {
            return
        } else {
            board[row][column].addMark(player)
        }
    }

    printBoard = () => {
        const boardWithMarks = board.map((row) => row.map((mark) => mark.getValue()));
        console.log(boardWithMarks);
    }
    
    return { getBoard, placeMark, printBoard }
}

function mark () {
    let value = 0;
    
    addMark = (player) => {
        value = player;
    }

    getValue = () => value;

    return { addMark, getValue }
}

function gameController (playerOneName = 'Player One', 
                         playerTwoName = 'Player Two') {
    const board = gameBoard();

    const players = [
        {name: playerOneName, mark: 'X'},
        {name: playerTwoName, mark: 'O'},
    ];

    let activePlayer = players[0];

    const switchPlayer = () => {
        activePlayer = activePlayer === players[0] ? players[1] : players[0];
    }
    
    const getActivePlayer = () => activePlayer;

    const printNewRound = () => {
        board.printBoard();
        console.log(`${activePlayer.name}'s turn`);
    }

    const playRound = (row, column) => {
        console.log(`Placing ${activePlayer}'s mark into row ${row}, column ${column}`);
        board.placeMark(activePlayer.mark, row, column);

        switchPlayer();
        printNewRound();
    }
}