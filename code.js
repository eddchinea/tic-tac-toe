function gameBoard () {
    const rows = 3;
    const columns = 3;
    const board = [];

    for (let i = 0; i < rows; i++) {
        board[i] = [];
        for (let j = 0; j < columns; j++) {
            board[i].push(cell())
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
        const boardWithMarks = board.map((row) => row.map((cell) => cell.getValue()));
        console.log(boardWithMarks);
    }
    
    return { getBoard, placeMark, printBoard }
}

function cell () {
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

    const checkWinner = () => {
        const boardValues = board.getBoard().map((row) => row.map((cell) => cell.getValue()));
        const winningCombinations = [
            [boardValues[0][0], boardValues[0][1], boardValues[0][2]], // Rows
            [boardValues[1][0], boardValues[1][1], boardValues[1][2]], // Rows
            [boardValues[2][0], boardValues[2][1], boardValues[2][2]], // Rows
            [boardValues[0][0], boardValues[1][0], boardValues[2][0]], // Columns
            [boardValues[0][1], boardValues[1][1], boardValues[2][1]], // Columns
            [boardValues[0][2], boardValues[1][2], boardValues[2][2]], // Columns
            [boardValues[0][0], boardValues[1][1], boardValues[2][2]], // Diagonals
            [boardValues[0][2], boardValues[1][1], boardValues[2][0]], // Diagonals
        ];

        for (let i = 0; i < winningCombinations.length; i++) {
            const row = winningCombinations[i];
            if (row.every((cell) => cell === activePlayer.mark)) {
                return true;
            }
        }

        return false;


    }

    const printNewRound = () => {
        board.printBoard();
        console.log(`${activePlayer.name}'s turn`);
    }

    const playRound = (row, column) => {
        board.placeMark(activePlayer.mark, row, column);

        //Check for winner
        if (checkWinner()) {
            console.log(`${activePlayer.name} wins!`);
            return;
        }


        if (board.getBoard()[row][column].getValue() !== activePlayer.mark) {
            console.log('Invalid move');
            printNewRound();
        } else {
            console.log(`Placing ${activePlayer}'s mark into row ${row}, column ${column}`);
            switchPlayer();
            printNewRound();
        }

    }

    printNewRound();

    return {playRound, getActivePlayer, getBoard: board.getBoard, checkWinner}
}

function screenController () {
    const game = gameController();
    const playerTurn = document.querySelector('.turn');
    const boardDiv = document.querySelector('.board');

    function updateScreen() {
        boardDiv.textContent = '';

        const board = game.getBoard();
        const activePlayer = game.getActivePlayer();

        playerTurn.textContent = `${activePlayer.name}'s turn`;


        board.forEach((row) => {
            row.forEach((cell, index) => {
                const cellButton = document.createElement('button');
                cellButton.classList.add('cell');

                cellButton.dataset.column = index;
                cellButton.dataset.row = board.indexOf(row);
                cellButton.textContent = cell.getValue();

                if(cell.getValue() !== 0) {
                    cellButton.disabled = true;
                } else {
                    cellButton.textContent = '';
                }

                if (game.checkWinner()) {
                    playerTurn.textContent = `${activePlayer.name} wins!`;
                    cellButton.disabled = true;

                }

                boardDiv.appendChild(cellButton);
            })
        })
    }

    function handleBoardClick(event) {
        const selectedRow = event.target.dataset.row;
        const selectedColumn = event.target.dataset.column;

        if(!selectedRow || !selectedColumn) return;

        game.playRound(selectedRow, selectedColumn);
        updateScreen();
    }

    function handleRestartClick() {

    }

    boardDiv.addEventListener('click', handleBoardClick);

    updateScreen();
}

screenController();