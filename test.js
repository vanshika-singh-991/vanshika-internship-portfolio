// Self-check test suite for core logic (Connect 4 win detection & Calculator evaluation)
const assert = require("assert");

console.log("Running self-check tests...");

// --- 1. Test Connect 4 Win Detection ---
const { ROWS, COLS, checkWin } = require("./task4-connect4/script.js");

function createEmptyGrid() {
  return Array.from({ length: ROWS }, () => Array(COLS).fill(0));
}

// Test 1.1: Horizontal Win
{
  const grid = createEmptyGrid();
  // Player 1 places 4 in row 5, columns 0, 1, 2, 3
  grid[5][0] = 1;
  grid[5][1] = 1;
  grid[5][2] = 1;
  grid[5][3] = 1;
  const win = checkWin(grid, 5, 3);
  assert.ok(win !== null, "Horizontal 4-in-a-row should be detected");
  assert.strictEqual(win.length, 4, "Winning line should have 4 cells");
  console.log("  [PASS] Connect 4: Horizontal win detection");
}

// Test 1.2: Vertical Win
{
  const grid = createEmptyGrid();
  // Player 2 places 4 in column 2, rows 5, 4, 3, 2
  grid[5][2] = 2;
  grid[4][2] = 2;
  grid[3][2] = 2;
  grid[2][2] = 2;
  const win = checkWin(grid, 2, 2);
  assert.ok(win !== null, "Vertical 4-in-a-row should be detected");
  console.log("  [PASS] Connect 4: Vertical win detection");
}

// Test 1.3: Diagonal Win (down-right / up-left)
{
  const grid = createEmptyGrid();
  grid[2][1] = 1;
  grid[3][2] = 1;
  grid[4][3] = 1;
  grid[5][4] = 1;
  const win = checkWin(grid, 5, 4);
  assert.ok(win !== null, "Diagonal win should be detected");
  console.log("  [PASS] Connect 4: Diagonal win detection");
}

// Test 1.4: No Win on 3 in a row
{
  const grid = createEmptyGrid();
  grid[5][0] = 1;
  grid[5][1] = 1;
  grid[5][2] = 1;
  const win = checkWin(grid, 5, 2);
  assert.strictEqual(win, null, "3-in-a-row should NOT be detected as a win");
  console.log("  [PASS] Connect 4: 3-in-a-row correctly does not win");
}

// --- 2. Test Calculator Logic Sanitization & Evaluation ---
function safeCalc(expr) {
  const sanitized = expr.replace(/[^0-9+\-*/.]/g, "");
  if (/\/0(?![.\d])/.test(sanitized)) {
    return "Error";
  }
  const result = Function(`"use strict"; return (${sanitized})`)();
  if (!isFinite(result)) return "Error";
  return Math.round(result * 1e8) / 1e8;
}

{
  assert.strictEqual(safeCalc("12+34"), 46, "12+34 should equal 46");
  assert.strictEqual(safeCalc("100-25"), 75, "100-25 should equal 75");
  assert.strictEqual(safeCalc("7*8"), 56, "7*8 should equal 56");
  assert.strictEqual(safeCalc("20/4"), 5, "20/4 should equal 5");
  assert.strictEqual(safeCalc("10/0"), "Error", "Division by zero should return Error");
  assert.strictEqual(safeCalc("0.1+0.2"), 0.3, "Floating point 0.1+0.2 should round cleanly to 0.3");
  console.log("  [PASS] Calculator: Arithmetic & division by zero handling");
}

console.log("\nAll self-check tests passed successfully!");
