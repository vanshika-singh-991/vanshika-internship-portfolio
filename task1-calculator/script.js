const display = document.getElementById("display");
let currentExpression = "";

function updateDisplay() {
  display.value = currentExpression || "0";
}

function appendValue(val) {
  // Prevent duplicate operators next to each other
  const operators = ["+", "-", "*", "/"];
  const lastChar = currentExpression.slice(-1);

  if (operators.includes(val) && operators.includes(lastChar)) {
    currentExpression = currentExpression.slice(0, -1) + val;
    updateDisplay();
    return;
  }

  // Prevent multiple decimals in the same number
  if (val === ".") {
    const parts = currentExpression.split(/[+\-*/]/);
    const lastPart = parts[parts.length - 1];
    if (lastPart.includes(".")) return;
    if (!lastPart) val = "0.";
  }

  // Handle leading 00
  if (val === "00" && !currentExpression) {
    val = "0";
  }

  currentExpression += val;
  updateDisplay();
}

function deleteLast() {
  currentExpression = currentExpression.slice(0, -1);
  updateDisplay();
}

function clearAll() {
  currentExpression = "";
  updateDisplay();
}

function calculate() {
  if (!currentExpression) return;

  try {
    // shortcut: sanitized eval alternative for basic 4-function math, upgrade if scientific functions added
    const sanitized = currentExpression.replace(/[^0-9+\-*/.]/g, "");
    if (!sanitized) return;

    if (/\/0(?![.\d])/.test(sanitized)) {
      display.value = "Error";
      currentExpression = "";
      return;
    }

    const result = Function(`"use strict"; return (${sanitized})`)();
    if (!isFinite(result)) {
      display.value = "Error";
      currentExpression = "";
      return;
    }

    // Round floating point inaccuracies (e.g. 0.1 + 0.2)
    currentExpression = String(Math.round(result * 1e8) / 1e8);
    updateDisplay();
  } catch {
    display.value = "Error";
    currentExpression = "";
  }
}

// Button click handling
document.querySelectorAll(".key, .btn").forEach(btn => {
  btn.addEventListener("click", () => {
    const action = btn.dataset.action;
    const val = btn.dataset.val;

    if (action === "clear") clearAll();
    else if (action === "delete") deleteLast();
    else if (action === "calculate") calculate();
    else if (val) appendValue(val);
  });
});

// Keyboard support
window.addEventListener("keydown", (e) => {
  if ((e.key >= "0" && e.key <= "9") || ["+", "-", "*", "/", "."].includes(e.key)) {
    appendValue(e.key);
  } else if (e.key === "Enter" || e.key === "=") {
    e.preventDefault();
    calculate();
  } else if (e.key === "Backspace") {
    deleteLast();
  } else if (e.key === "Escape" || e.key.toLowerCase() === "c") {
    clearAll();
  }
});

// Export helper for node testing if needed
if (typeof module !== "undefined" && module.exports) {
  module.exports = { calculate, appendValue, clearAll, deleteLast };
}
