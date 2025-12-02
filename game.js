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

function initBoardWithRandom(board, number) {
    for (let i = 0; i < number; i += 1) {
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
                    console.log(board[i][x]);
                    if (board[i][x] == null) {
                        board[i][x] = cell;
                        board[y][x] = null;
                        return true;
                    }
                }
            }
        }
    }
    return false;
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
                        console.log(y, i);
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
                        console.log(y, i);
                        board[y][i] = cell;
                        board[y][x] = null;
                        break;
                    }
                }
            }
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
                    if (board[i][x] == null) {
                        board[i][x] = cell;
                        board[y][x] = null;
                        return true;
                    }
                }
            }
        }
    }
    return false;
}

function matchDown(board) {
    const row3 = board[cols - 2];
    const row4 = board[cols - 1];

    for (let i = 0; i < rows; i++) {
        if (row3[i] && row4[i]) {
            if (row3[i] === row4[i]) {
                board[cols - 1][i] = row3[i] + row4[i];
                board[cols - 2][i] = null;
            }
        }
    }
}

function matchRight(board) {
    for (let y = 0; y < cols; y++) {
        const row3 = board[y][rows - 2];
        const row4 = board[y][rows - 1];
        if (row3 && row4) {
            if (row3 === row4) {
                board[y][rows - 1] = row3 + row4;
                board[y][rows - 2] = null;
            }
        }
    }
}

function matchLeft(board) {
    for (let y = 0; y < cols; y++) {
        const row1 = board[y][0];
        const row2 = board[y][1];
        if (row1 && row2) {
            if (row1 === row2) {
                board[y][0] = row1 + row2;
                board[y][1] = null;
            }
        }
    }
}

function matchUp(board) {
    const row1 = board[0];
    const row2 = board[1];

    for (let i = 0; i < rows; i++) {
        if (row1[i] && row2[i]) {
            if (row1[i] === row2[i]) {
                board[0][i] = row1[i] + row2[i];
                board[1][i] = null;
            }
        }
    }
}

function start(board) {
    //initBoardWithRandom(board, 2);
    render(board);
}

document.addEventListener('keydown', (e) => {
    switch (e.key) {
        case 'ArrowUp':
            moveUp(board);
            matchUp(board);
            console.log(board);
            render(board);
            break;
        case 'ArrowDown':
            moveDown(board);
            matchDown(board);
            render(board);
            break;
        case 'ArrowRight':
            moveRight(board);
            matchRight(board);
            render(board);
            break;
        case 'ArrowLeft':
            moveLeft(board);
            matchLeft(board);
            render(board);
            break;
        default:
            break;
    }
});

start(board);
