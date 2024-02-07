document.addEventListener('DOMContentLoaded', function () {
    const board = document.getElementById('board');
    const cells = [];
    let currentPlayer = 'X';
    let gameActive = true;

    // Create cells dynamically
    for (let i = 0; i < 9; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.addEventListener('click', () => handleCellClick(i));
        board.appendChild(cell);
        cells.push(cell);
    }

    function handleCellClick(index) {
        if (!gameActive || cells[index].textContent !== '') return;

        cells[index].textContent = currentPlayer;

        if (checkWinner()) {
            showResult(`Player ${currentPlayer} wins!`);
            gameActive = false;
        } else if (isBoardFull()) {
            showResult("It's a tie!");
            gameActive = false;
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        }
    }

    function checkWinner() {
        const winPatterns = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6]
        ];

        return winPatterns.some(pattern => {
            const [a, b, c] = pattern;
            return cells[a].textContent !== '' &&
                cells[a].textContent === cells[b].textContent &&
                cells[a].textContent === cells[c].textContent;
        });
    }

    function isBoardFull() {
        return cells.every(cell => cell.textContent !== '');
    }

    function showResult(message) {
        const resultContainer = document.getElementById('result');
        resultContainer.innerHTML = `<p id="winner-message">${message}</p><button id="reset-button">New Game</button>`;
        document.getElementById('reset-button').addEventListener('click', resetGame);
    }

    function resetGame() {
        gameActive = true;
        currentPlayer = 'X';
        document.getElementById('result').innerHTML = '';
        cells.forEach(cell => {
            cell.textContent = '';
        });
    }
});
