let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let gameOver = false;

function handleMove(index) {
    if (!gameOver && board[index] === '') {
        board[index] = currentPlayer;
        document.getElementById('board').children[index].innerText = currentPlayer;
        if (checkWin(currentPlayer)) {
            document.getElementById('status').innerText = `${currentPlayer} wins!`;
            gameOver = true;
        } else if (board.every(cell => cell !== '')) {
            document.getElementById('status').innerText = 'It\'s a tie!';
            gameOver = true;
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            if (currentPlayer === 'O') {
                computerMove();
            }
            document.getElementById('status').innerText = `Player ${currentPlayer}'s turn`;
        }
    }
}

function checkWin(player) {
    const winningCombos = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
        [0, 4, 8], [2, 4, 6]             // diagonals
    ];
    for (let combo of winningCombos) {
        if (board[combo[0]] === player && 
            board[combo[1]] === player && 
            board[combo[2]] === player) {
            return true;
        }
    }
    return false;
}

function computerMove() {
    let emptyCells = [];
    for (let i = 0; i < board.length; i++) {
        if (board[i] === '') {
            emptyCells.push(i);
        }
    }
    let randomIndex = Math.floor(Math.random() * emptyCells.length);
    handleMove(emptyCells[randomIndex]);
}

function resetGame() {
    board = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    gameOver = false;
    document.getElementById('status').innerText = `Player ${currentPlayer}'s turn`;
    document.querySelectorAll('.cell').forEach(cell => cell.innerText = '');
}
