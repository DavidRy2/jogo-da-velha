const board = document.getElementById('board');
const status = document.getElementById('status');
let currentPlayer = 'X';
let gameOver = false;

function createBoard() {
  board.innerHTML = '';
  for (let i = 0; i < 9; i++) {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    cell.dataset.index = i;
    cell.addEventListener('click', handleClick);
    board.appendChild(cell);
  }
}

function handleClick(e) {
  const cell = e.target;
  if (cell.textContent || gameOver) return;

  cell.textContent = currentPlayer;
  cell.classList.add('taken');

  if (checkWin()) {
    status.textContent = `Jogador ${currentPlayer} venceu!`;
    gameOver = true;
  } else if (isDraw()) {
    status.textContent = 'Empate!';
    gameOver = true;
  } else {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    status.textContent = `Vez do jogador ${currentPlayer}`;
  }
}

function checkWin() {
  const cells = Array.from(document.querySelectorAll('.cell')).map(c => c.textContent);
  const combos = [
    [0,1,2], [3,4,5], [6,7,8], // linhas
    [0,3,6], [1,4,7], [2,5,8], // colunas
    [0,4,8], [2,4,6]           // diagonais
  ];
  return combos.some(([a,b,c]) => {
    return cells[a] && cells[a] === cells[b] && cells[a] === cells[c];
  });
}

function isDraw() {
  return [...document.querySelectorAll('.cell')].every(c => c.textContent);
}

function resetGame() {
  currentPlayer = 'X';
  gameOver = false;
  status.textContent = 'Vez do jogador X';
  createBoard();
}

createBoard();
