const ROWS = 6;
const COLS = 7;

let boardState = Array.from({ length: ROWS }, () => Array(COLS).fill(0));
let currentPlayer = 1; // 1 = Pink/Magenta, 2 = Red
let isGameOver = false;

let scores = { p1: 0, p2: 0, ties: 0 };

const boardEl = typeof document !== "undefined" ? document.getElementById("board") : null;
const turnStatus = typeof document !== "undefined" ? document.getElementById("turnStatus") : null;
const p1Indicator = typeof document !== "undefined" ? document.getElementById("p1Indicator") : null;
const p2Indicator = typeof document !== "undefined" ? document.getElementById("p2Indicator") : null;
const p1ScoreEl = typeof document !== "undefined" ? document.getElementById("p1Score") : null;
const p2ScoreEl = typeof document !== "undefined" ? document.getElementById("p2Score") : null;
const tieScoreEl = typeof document !== "undefined" ? document.getElementById("tieScore") : null;
const resetBtn = typeof document !== "undefined" ? document.getElementById("resetBtn") : null;

function initBoard() {
  boardEl.innerHTML = "";
  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      const slot = document.createElement("div");
      slot.classList.add("slot");
      slot.dataset.row = r;
      slot.dataset.col = c;
      slot.addEventListener("click", () => handleColumnClick(c));
      boardEl.appendChild(slot);
    }
  }
}

function handleColumnClick(col) {
  if (isGameOver) return;

  // Find lowest available row in this column
  let availableRow = -1;
  for (let r = ROWS - 1; r >= 0; r--) {
    if (boardState[r][col] === 0) {
      availableRow = r;
      break;
    }
  }

  if (availableRow === -1) return; // Column full

  // Make move
  boardState[availableRow][col] = currentPlayer;
  updateSlotVisual(availableRow, col, currentPlayer);

  // Check for win
  const winningLine = checkWin(boardState, availableRow, col);
  if (winningLine) {
    isGameOver = true;
    highlightWin(winningLine);
    turnStatus.textContent = `Player ${currentPlayer === 1 ? '1 (Blue)' : '2 (Red)'} Wins the Match! 🎉`;
    turnStatus.style.color = currentPlayer === 1 ? "#0071e3" : "#ff3b30";
    if (currentPlayer === 1) scores.p1++;
    else scores.p2++;
    updateScoreUI();
    return;
  }

  // Check for draw
  if (boardState.every(row => row.every(cell => cell !== 0))) {
    isGameOver = true;
    turnStatus.textContent = "Game Draw / Stalemate!";
    turnStatus.style.color = "#6e6e73";
    scores.ties++;
    updateScoreUI();
    return;
  }

  // Next player's turn
  currentPlayer = currentPlayer === 1 ? 2 : 1;
  updateTurnUI();
}

function updateSlotVisual(row, col, player) {
  const index = row * COLS + col;
  const slot = boardEl.children[index];
  if (slot) {
    slot.classList.add(player === 1 ? "p1" : "p2");
  }
}

function updateTurnUI() {
  turnStatus.textContent = `Player ${currentPlayer === 1 ? '1 (Blue)' : '2 (Red)'}'s turn`;
  turnStatus.style.color = currentPlayer === 1 ? "#0071e3" : "#ff3b30";
  p1Indicator.classList.toggle("active", currentPlayer === 1);
  p2Indicator.classList.toggle("active", currentPlayer === 2);
}

function updateScoreUI() {
  p1ScoreEl.textContent = scores.p1;
  p2ScoreEl.textContent = scores.p2;
  tieScoreEl.textContent = scores.ties;
}

function highlightWin(cells) {
  cells.forEach(([r, c]) => {
    const idx = r * COLS + c;
    if (boardEl.children[idx]) {
      boardEl.children[idx].classList.add("win");
    }
  });
}

function checkWin(grid, lastR, lastC) {
  const target = grid[lastR][lastC];
  if (!target) return null;

  const directions = [
    [0, 1],  // Horizontal
    [1, 0],  // Vertical
    [1, 1],  // Diagonal down-right
    [1, -1]  // Diagonal down-left
  ];

  for (const [dr, dc] of directions) {
    let cells = [[lastR, lastC]];

    // Check forward
    for (let i = 1; i < 4; i++) {
      const nr = lastR + dr * i;
      const nc = lastC + dc * i;
      if (nr >= 0 && nr < ROWS && nc >= 0 && nc < COLS && grid[nr][nc] === target) {
        cells.push([nr, nc]);
      } else break;
    }

    // Check backward
    for (let i = 1; i < 4; i++) {
      const nr = lastR - dr * i;
      const nc = lastC - dc * i;
      if (nr >= 0 && nr < ROWS && nc >= 0 && nc < COLS && grid[nr][nc] === target) {
        cells.push([nr, nc]);
      } else break;
    }

    if (cells.length >= 4) {
      return cells;
    }
  }

  return null;
}

function resetGame() {
  boardState = Array.from({ length: ROWS }, () => Array(COLS).fill(0));
  currentPlayer = 1;
  isGameOver = false;
  initBoard();
  updateTurnUI();
}

if (resetBtn) {
  resetBtn.addEventListener("click", resetGame);
}

// Initialize in browser
if (typeof document !== "undefined") {
  initBoard();
  updateTurnUI();
}

// Theme Synchronization with Master Portfolio
if (typeof window !== "undefined" && typeof document !== "undefined") {
  const themeToggleBtn = document.getElementById("themeToggleBtn");
  function applyTheme(isDark) {
    if (isDark) {
      document.documentElement.classList.add("dark");
      if (themeToggleBtn) themeToggleBtn.textContent = "☀️";
    } else {
      document.documentElement.classList.remove("dark");
      if (themeToggleBtn) themeToggleBtn.textContent = "🌙";
    }
  }
  const currentTheme = localStorage.getItem("vanshika_portal_theme") || "light";
  applyTheme(currentTheme === "dark");

  themeToggleBtn?.addEventListener("click", () => {
    const isDark = document.documentElement.classList.contains("dark");
    const newTheme = isDark ? "light" : "dark";
    localStorage.setItem("vanshika_portal_theme", newTheme);
    applyTheme(!isDark);
  });

  window.addEventListener("storage", (e) => {
    if (e.key === "vanshika_portal_theme") {
      applyTheme(e.newValue === "dark");
    }
  });
}

// Export helper for node testing
if (typeof module !== "undefined" && module.exports) {
  module.exports = { ROWS, COLS, checkWin };
}
