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

const cellColor = new Map();

cellColor.set(2, '#F78D60');
cellColor.set(4, '#533B4D');
cellColor.set(8, '#F564A9');
cellColor.set(16, '#FAA4BD');
cellColor.set(32, '#FEC260');
cellColor.set(64, '#29C7AC');
cellColor.set(64 * 2, '#FF1E56');
cellColor.set(64 * 4, '#9153F4');
cellColor.set(64 * 8, '#17E6C3');
cellColor.set(64 * 16, '#6F2DBD');
cellColor.set(64 * 32, '#FFD717');

let board = [
    [null, null, null, null],
    [null, null, null, null],
    [null, null, null, null],
    [null, null, null, null],
];

const game = document.getElementsByClassName('game');
const cells = document.getElementsByClassName('cell');
const score = document.getElementById('score');

let currentScore = 0;

const rows = board.length;
const cols = board[0].length;

function render(board) {
    for (let i = 0; i < rows * cols; i++) {
        const row = Math.floor(i / cols);
        const col = i % cols;
        cells[i].innerHTML = board[row][col];
        let color = '#EEEEEE';
        if (board[row][col]) {
            color = cellColor.get(board[row][col]);
        }
        cells[i].style.backgroundColor = color;
    }
    score.textContent = currentScore;
}

function getRandomNumber(max) {
    return Math.floor(Math.random() * max);
}

function addRandomTile(board) {
    const emptyCells = [];

    for (let y = 0; y < board.length; y++) {
        for (let x = 0; x < board[y].length; x++) {
            if (board[y][x] == null) {
                emptyCells.push({ x, y });
            }
        }
    }

    if (emptyCells.length === 0) return false;

    const index = Math.floor(Math.random() * emptyCells.length);
    const { x, y } = emptyCells[index];

    board[y][x] = Math.random() < 0.9 ? 2 : 4;

    return true;
}

function initBoard(board, number) {
    addRandomTile(board);
    addRandomTile(board);
}

function moveUp(board) {
    let hasMoved = false;

    for (let x = 0; x < cols; x++) {
        for (let y = 1; y < rows; y++) {
            if (board[y][x] != null) {
                let current = y;
                while (current > 0 && board[current - 1][x] == null) {
                    board[current - 1][x] = board[current][x];
                    board[current][x] = null;
                    current--;
                    hasMoved = true;
                }
            }
        }
    }
    return hasMoved;
}

function moveDown(board) {
    let hasMoved = false;

    for (let x = 0; x < cols; x++) {
        for (let y = rows - 2; y >= 0; y--) {
            if (board[y][x] != null) {
                let current = y;
                while (current < rows - 1 && board[current + 1][x] == null) {
                    board[current + 1][x] = board[current][x];
                    board[current][x] = null;
                    current++;
                    hasMoved = true;
                }
            }
        }
    }
    return hasMoved;
}

function moveRight(board) {
    let hasMoved = false;

    for (let y = 0; y < rows; y++) {
        for (let x = cols - 2; x >= 0; x--) {
            if (board[y][x] != null) {
                let current = x;
                while (current < cols - 1 && board[y][current + 1] == null) {
                    board[y][current + 1] = board[y][current];
                    board[y][current] = null;
                    current++;
                    hasMoved = true;
                }
            }
        }
    }
    return hasMoved;
}

function moveLeft(board) {
    let hasMoved = false;
    for (let y = 0; y < rows; y++) {
        for (let x = 1; x < cols; x++) {
            if (board[y][x] != null) {
                let current = x;
                while (current > 0 && board[y][current - 1] == null) {
                    board[y][current - 1] = board[y][current];
                    board[y][current] = null;
                    current--;
                    hasMoved = true;
                }
            }
        }
    }
    return hasMoved;
}

function matchRight(board) {
    let re = 0;
    for (let y = 0; y < rows; y++) {
        for (let x = cols - 2; x >= 0; x--) {
            if (board[y][x] != null) {
                let current = x;
                let target = current + 1;

                while (target < cols && board[y][target] == null) {
                    target++;
                }

                if (target < cols && board[y][target] === board[y][current]) {
                    board[y][target] *= 2;
                    re += board[y][target];
                    board[y][current] = null;
                }
            }
        }
    }
    return re;
}

function matchLeft(board) {
    let re = 0;
    for (let y = 0; y < rows; y++) {
        for (let x = 1; x < cols; x++) {
            if (board[y][x] != null) {
                let current = x;
                let target = current - 1;

                while (target >= 0 && board[y][target] == null) {
                    target--;
                }

                if (target >= 0 && board[y][target] === board[y][current]) {
                    board[y][target] *= 2;
                    re += board[y][target];
                    board[y][current] = null;
                }
            }
        }
    }
    return re;
}

function matchDown(board) {
    let re = 0;
    for (let x = 0; x < cols; x++) {
        for (let y = rows - 2; y >= 0; y--) {
            if (board[y][x] != null) {
                let current = y;
                let target = current + 1;

                while (target < rows && board[target][x] == null) {
                    target++;
                }

                if (target < rows && board[target][x] === board[current][x]) {
                    board[target][x] *= 2;
                    re += board[target][x];
                    board[current][x] = null;
                }
            }
        }
    }
    return re;
}

function matchUp(board) {
    let re = 0;
    for (let x = 0; x < cols; x++) {
        for (let y = 1; y < rows; y++) {
            if (board[y][x] != null) {
                let current = y;

                let target = current - 1;
                while (target >= 0 && board[target][x] == null) {
                    target--;
                }

                if (target >= 0 && board[target][x] === board[current][x]) {
                    board[target][x] *= 2;
                    re += board[target][x];
                    board[current][x] = null;
                }
            }
        }
    }
    return re;
}

function start(board) {
    initBoard(board);
    render(board);
}

document.addEventListener('keydown', (e) => {
    switch (e.key) {
        case 'ArrowUp':
            if (moveUp(board)) {
                addRandomTile(board);
            }
            currentScore += matchUp(board);
            render(board);
            break;
        case 'ArrowDown':
            if (moveDown(board)) {
                addRandomTile(board);
            }
            currentScore += matchDown(board);
            render(board);
            break;
        case 'ArrowRight':
            if (moveRight(board)) {
                addRandomTile(board);
            }
            currentScore += matchRight(board);
            render(board);
            break;
        case 'ArrowLeft':
            if (moveLeft(board)) {
                addRandomTile(board);
            }
            currentScore += matchLeft(board);
            render(board);
            break;
        default:
            break;
    }
    console.log(board);
});

start(board);
