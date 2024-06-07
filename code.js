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

function gameController () {
    
}