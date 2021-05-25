const X_CLASS = 'x';
const CIRCLE_CLASS = 'circle';
const WINNING_COMBINATIONS = [
    [ 0, 1, 2 ],
    [ 3, 4, 5 ],
    [ 6, 7, 8 ],
    [ 0, 3, 6 ],
    [ 1, 4, 7 ],
    [ 2, 5, 8 ],
    [ 0, 4, 8 ],
    [ 2, 4, 6 ],
]
const cellElement = document.querySelectorAll('[data-cell]');
const board = document.getElementById('board');
let circleTurn;
const winningMessageTextElement = document.querySelector('[data-wining-message-text]')
const winningMessageElement = document.getElementById('wining-message')
const restartBtn = document.getElementById('restartBtn');

startGame()
restartBtn.addEventListener('click', startGame)
function startGame() {
    circleTurn = false;
    cellElement.forEach(cell => {
        cell.classList.remove(X_CLASS);
        cell.classList.remove(CIRCLE_CLASS);
        cell.removeEventListener('click', handleClick);
        cell.addEventListener('click', handleClick, { once: true })
    });
    setBoardHoverClass();
    winningMessageElement.classList.remove('show');
}
function handleClick(e) {
    const cell = e.target;
    const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS;
    placeMark(cell, currentClass);
    // for win
    if (checkWin(currentClass)) {
        endGame(false);
    } else if (isDraw()) {
        endGame(true)
    } else {
        swapTurn()
        setBoardHoverClass();
    }
    // check draw
    // switch turn
}
function isDraw() {
    return [ ...cellElement ].every(cell => {
        return cell.classList.contains(X_CLASS) || cell.classList.contains(CIRCLE_CLASS)
    })
}
function endGame(draw) {
    if (draw) {
        winningMessageTextElement.innerText = 'Draw!'
    } else {
        winningMessageTextElement.innerText = `${circleTurn ? "O's" : "X's "}Win`
    }
    winningMessageElement.classList.add('show');
}
function placeMark(cell, currentClass) {
    cell.classList.add(currentClass)
}
function swapTurn() {
    circleTurn = !circleTurn;
}
function setBoardHoverClass() {
    board.classList.remove(X_CLASS)
    board.classList.remove(CIRCLE_CLASS);
    circleTurn ? board.classList.add(CIRCLE_CLASS) : board.classList.add(X_CLASS)
}
function checkWin(currentClass) {
    return WINNING_COMBINATIONS.some(combinations => {
        return combinations.every(index => {
            return cellElement[ index ].classList.contains(currentClass)
        })
    })
}