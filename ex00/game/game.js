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
cellColor.set(4, '#7ADAA5');
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
const bestScoreElement = document.getElementById('best-score');
const newGameElement = document.getElementById('new-game');

const popupButton = document.getElementById('popup-button');
const popup = document.getElementById('popup');

let currentScore = 0;
let bestScore = 0;
let hasStoped;

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
    bestScoreElement.textContent = bestScore;
}

function addRandomTile(board) {
    const emptyCells = [];
    for (let y = 0; y < cols; y++) {
        for (let x = 0; x < rows; x++) {
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

function initBoard(board) {
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
        let merged = [false, false, false, false];
        for (let x = cols - 2; x >= 0; x--) {
            if (board[y][x] != null) {
                let target = x + 1;

                while (target < cols && board[y][target] == null) {
                    target++;
                }

                if (
                    target < cols &&
                    board[y][target] === board[y][x] &&
                    !merged[target]
                ) {
                    board[y][target] *= 2;
                    re += board[y][target];
                    board[y][x] = null;
                    merged[target] = true;
                }
            }
        }
    }
    return re;
}

function matchLeft(board) {
    let re = 0;
    for (let y = 0; y < rows; y++) {
        let merged = [false, false, false, false];
        for (let x = 1; x < cols; x++) {
            if (board[y][x] != null) {
                let target = x - 1;
                while (target >= 0 && board[y][target] == null) {
                    target--;
                }
                if (
                    target >= 0 &&
                    board[y][target] === board[y][x] &&
                    !merged[target]
                ) {
                    board[y][target] *= 2;
                    re += board[y][target];
                    board[y][x] = null;
                    merged[target] = true;
                }
            }
        }
    }
    return re;
}

function matchDown(board) {
    let re = 0;
    for (let x = 0; x < cols; x++) {
        let merged = [false, false, false, false];
        for (let y = rows - 2; y >= 0; y--) {
            if (board[y][x] != null) {
                let target = y + 1;
                while (target < rows && board[target][x] == null) {
                    target++;
                }
                if (
                    target < rows &&
                    board[target][x] === board[y][x] &&
                    !merged[target]
                ) {
                    board[target][x] *= 2;
                    re += board[target][x];
                    board[y][x] = null;
                    merged[target] = true;
                }
            }
        }
    }
    return re;
}

function matchUp(board) {
    let re = 0;
    for (let x = 0; x < cols; x++) {
        let merged = [false, false, false, false];
        for (let y = 1; y < rows; y++) {
            if (board[y][x] != null) {
                let target = y - 1;
                while (target >= 0 && board[target][x] == null) {
                    target--;
                }
                if (
                    target >= 0 &&
                    board[target][x] === board[y][x] &&
                    !merged[target]
                ) {
                    board[target][x] *= 2;
                    re += board[target][x];
                    board[y][x] = null;
                    merged[target] = true;
                }
            }
        }
    }
    return re;
}

function setBestScore() {
    if (currentScore > bestScore) {
        localStorage.setItem('bestScore', currentScore);
        bestScore = currentScore;
    }
}

function isPlayerWin(board) {
    for (let y = 0; y < 4; y++) {
        for (let x = 0; x < 4; x++) {
            if (board[y][x] === 2048) {
                return true;
            }
        }
    }
    return false;
}

function isGameStillPlayable(board) {
    for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
            let value = board[y][x];

            if (value == null) {
                return true;
            }
            if (x < 3 && value === board[y][x + 1]) {
                return true;
            }
            if (y < 3 && value === board[y + 1][x]) {
                return true;
            }
        }
    }
    return false;
}

function checkBoardState(board) {
    if (isPlayerWin(board)) {
        return 'win';
    }
    if (isGameStillPlayable(board)) {
        return 'continue';
    }
    return 'lose';
}

function endGame(text) {
    hasStoped = true;
    const popupSpain = document.getElementById('finish-message');
    popup.style.display = 'block';
    popupSpain.textContent = text;
    setBestScore();
}

function start(board) {
    const value = Number(localStorage.getItem('bestScore'));

    if (value) {
        bestScore = value;
    }

    initBoard(board);
    render(board);
}

function initGame(board) {
    for (let y = 0; y < cols; y++) {
        for (let x = 0; x < rows; x++) {
            board[y][x] = null;
        }
    }
    hasStoped = false;
    currentScore = 0;
    start(board);
}

function update(board, moveCallBack, matchCallBack) {
    let moved = moveCallBack(board);
    const re = matchCallBack(board);
    if (re) {
        moveCallBack(board);
        moved = true;
    }
    if (moved) {
        addRandomTile(board);
    }
    currentScore += re;
    render(board);
}

function checkGame(board) {
    const status = checkBoardState(board);
    if (status != 'continue') {
        endGame(`You ${status}!`);
    }
    console.log(status);
}

function handleInput(board, key) {
    if (hasStoped) return;
    switch (key) {
        case 'ArrowUp':
            update(board, moveUp, matchUp);
            checkGame(board);
            break;
        case 'ArrowDown':
            update(board, moveDown, matchDown);
            checkGame(board);
            break;
        case 'ArrowRight':
            update(board, moveRight, matchRight);
            checkGame(board);
            break;
        case 'ArrowLeft':
            update(board, moveLeft, matchLeft);
            checkGame(board);
            break;
        default:
            break;
    }
}

function restartGame(board) {
    popup.style.display = 'none';
    initGame(board);
}

popupButton.addEventListener('click', () => {
    restartGame(board);
});
newGameElement.addEventListener('click', () => {
    initGame(board);
});
document.addEventListener('keydown', (e) => {
    handleInput(board, e.key);
});

start(board);
