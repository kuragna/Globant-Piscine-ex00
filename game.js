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
    [2, null, null, 2],
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


function moveUp(board) {
   for (let y = 0; y < cols; y++) {
        for (let x = 0; x < rows; x++) {
            const cell = board[y][x];

            if (cell) {
                const start = 0;
                for (let i = start; i < y; i++) {
                    console.log(board[i][x])
                    if (board[i][x] == null) {
                        board[i][x] = cell;
                        board[y][x] = null;
                        break;
                    }   
                }
            }
        }
    } 
}

function moveDown(board) {

    for (let y = 0; y < cols; y++) {
        for (let x = 0; x < rows; x++) {
            const cell = board[y][x];

            if (cell) {
                const end = cols - 1;
                for (let i = end; i > y; i--) {
                    if (board[i][x] == null) {
                        board[i][x] = cell;
                        board[y][x] = null;
                        break;
                    }   
                }
            }
        }
    }
}

function moveLeft(board) {
   for (let y = 0; y < cols; y++) {
        for (let x = 0; x < rows; x++) {
            const cell = board[y][x];

            if (cell) {

                const start = 0;
                
                for (let i = 0; i < x; i++) {
                    if (board[y][i] == null) {
                        console.log(y, i)
                        board[y][i] = cell;
                        board[y][x] = null;
                        break;
                    }
                }
            }
        }
    }
}

function moveRight(board) {
   for (let y = 0; y < cols; y++) {
        for (let x = 0; x < rows; x++) {
            const cell = board[y][x];

            if (cell) {

                const end = rows - 1;

                for (let i = end; i > x; i--) {

                    if (board[y][i] == null) {
                        console.log(y, i)
                        board[y][i] = cell;
                        board[y][x] = null;
                        break;
                    }
                }
                //break;
            }
        }
    }
}


function start(board) {
    //initBoardWithRandom(board);
    render(board);
}

document.addEventListener('keydown', (e) => {
    
    switch (e.key) {
        case "ArrowUp": moveUp(board); render(board); break;
        case "ArrowDown": moveDown(board); render(board); break;
        case  "ArrowRight": moveRight(board); render(board); break;
        case "ArrowLeft": ; moveLeft(board); render(board); break;
        default: break;
    }
    
    //console.log(e);
});

start(board)
