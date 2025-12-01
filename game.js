// grid with 4x4
// Initial Setup: two random number 2 or 4
// User Input: arrows tiles move to arrow direction until hit a tile or border
// Merging: merge when two tiles hit
//        : increasing tiles and merge it into one
//        : merging happend in user input direction
// Score Tracking: keep traking user score with every merge
// Game end: when the board is full and there is no posible to merge
// Winning Condition : when a tile reaches 2048

/* Game */
let board = [
    [null, null, null, null],
    [null, null, null, null],
    [null, null, null, null],
    [null, null, null, null],
];

const game = document.getElementsByClassName('game');
const cells = document.getElementsByClassName('cell');

const rows = board.length;
const cols = board[0].length;

function render(board) {
    for (let i = 0; i < rows * cols; i++) {
        const row = Math.floor(i / cols);
        const col = i % cols;
        cells[i].innerHTML = board[row][col];
    }
}

function getRandomNumber(max) {
    return Math.floor(Math.random() * max);
}

// Initial Setup: two random number 2 or 4

function displayBoard(board) {
    for (let y = 0; y < board.length; y++) {
        for (let x = 0; x < board[y].length; x++) {
            console.log(board[y][x], ',');
        }
    }
}

function initBoardWithRandom(board) {
    for (let i = 0; i < 2; i += 1) {
        let x = getRandomNumber(4);
        let y = getRandomNumber(4);

        if (board[x][y] == null) {
            board[x][y] = 2;
        }
    }
}

function start(board) {
    initBoardWithRandom(board);
    render(board);
}

document.addEventListener('keydown', (e) => {
    start(board);
    console.log(board);
});

start(board)
