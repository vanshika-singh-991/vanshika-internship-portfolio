const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");
const taskCounter = document.getElementById("taskCounter");
const clearCompletedBtn = document.getElementById("clearCompletedBtn");

const STORAGE_KEY = "internpe_todo_tasks";

// Initial seed matching synopsis screenshot if first time opening
const defaultTasks = [
  { id: 1, text: "wake up early", completed: false },
  { id: 2, text: "read newspaper", completed: false }
];

let tasks = loadTasks();

function loadTasks() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : defaultTasks;
  } catch {
    return defaultTasks;
  }
}

function saveTasks() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  } catch {
    // shortcut: silent fail when localStorage disabled/restricted in sandboxed iframes
  }
}

function renderTasks() {
  if (tasks.length === 0) {
    taskList.innerHTML = `<li class="empty-state">No tasks yet. Add one above!</li>`;
  } else {
    taskList.innerHTML = tasks.map(task => `
      <li class="task-item ${task.completed ? "completed" : ""}" data-id="${task.id}">
        <div class="task-content" onclick="toggleTask(${task.id})">
          <div class="task-check-circle" aria-label="Toggle task"></div>
          <span class="task-text">${escapeHtml(task.text)}</span>
        </div>
        <button type="button" class="delete-btn" onclick="deleteTask(${task.id})" aria-label="Delete task">&times;</button>
      </li>
    `).join("");
  }

  const completedCount = tasks.filter(t => t.completed).length;
  taskCounter.textContent = `${tasks.length} task${tasks.length === 1 ? "" : "s"} (${completedCount} done)`;
}

function escapeHtml(str) {
  const div = document.createElement("div");
  div.textContent = str;
  return div.innerHTML;
}

function addTask() {
  const text = taskInput.value.trim();
  if (!text) {
    taskInput.focus();
    return;
  }

  tasks.unshift({
    id: Date.now(),
    text: text,
    completed: false
  });

  taskInput.value = "";
  saveTasks();
  renderTasks();
}

function toggleTask(id) {
  tasks = tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t);
  saveTasks();
  renderTasks();
}

function deleteTask(id) {
  tasks = tasks.filter(t => t.id !== id);
  saveTasks();
  renderTasks();
}

clearCompletedBtn.addEventListener("click", () => {
  tasks = tasks.filter(t => !t.completed);
  saveTasks();
  renderTasks();
});

// Initial render
renderTasks();

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

// Export helper for node testing if needed
if (typeof module !== "undefined" && module.exports) {
  module.exports = { tasks, addTask, toggleTask, deleteTask };
}
