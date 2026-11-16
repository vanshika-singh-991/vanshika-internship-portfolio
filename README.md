# Web Development Internship - Project Suite

**Academic Submission:** Bachelor of Computer Applications (BCA)  
**Institution:** College of Computing Sciences & IT (CCSIT), Teerthanker Mahaveer University, Moradabad  
**Submitted By:** Vanshika Singh (`TCA2468642`)  
**Project Guide:** Ms. Varsha Saini  
**Internship Mentor:** Krati Kumari  
**Organization:** InternPe (Certificate ID: `IPI#84419`)  
**Internship Duration:** 06 July 2026 – 19 August 2026  

---

## 📦 Moving to Another Windows Machine

This project is 100% self-contained with **zero dependencies** and runs on any standard Windows machine (Windows 10/11) without installing Python, Node, or any software.

### Steps to Transfer:
1. Copy `Vanshika_WebDev_Project.zip` (or this entire folder) to a USB flash drive or transfer via Google Drive/email.
2. Extract the folder on the destination Windows machine.
3. Double-click **`install.bat`**:
   - Verifies all 4 task modules are present.
   - Automatically creates a desktop shortcut (`Web Development Internship`) for one-click access.
   - Prompts to launch immediately.
4. Or simply double-click **`start.bat`** anytime to launch the project directly.

---

## 📁 Project Structure

```text
vanshika project/
├── index.html                   # Main Internship Showcase & Portal
├── install.bat                  # One-click Windows installer & shortcut creator
├── start.bat                    # One-click portable launcher (auto-detects environment)
├── package.bat                  # One-click zip packager for transferring
├── Vanshika_WebDev_Project.zip  # Ready-to-transfer portable zip archive
├── README.md                    # Documentation and running steps
├── test.js                      # Verification test suite for core logic
├── task1-calculator/            # Task 1: Basic Calculator
│   ├── index.html
│   ├── style.css
│   └── script.js
├── task2-ecommerce/             # Task 2: eCommerce Website (.sneakers)
│   ├── index.html
│   ├── style.css
│   └── script.js
├── task3-todolist/              # Task 3: Dynamic To-Do List
│   ├── index.html
│   ├── style.css
│   └── script.js
└── task4-connect4/              # Task 4: Connect 4 Interactive Game
    ├── index.html
    ├── style.css
    └── script.js
```

---

## 🚀 Exact Commands to Run

### Method 1: Local HTTP Server (Recommended)

Run any of the following commands in this directory:

**Using Python 3:**
```powershell
python -m http.server 3000
```
Then open your browser at:
```text
http://localhost:3000
```

**Using Node.js (`npx serve`):**
```powershell
npx serve .
```

### Method 2: Direct Browser Launch

You can open `index.html` directly in any web browser (Chrome, Edge, Firefox, Safari) without installing anything:
```powershell
Start-Process "index.html"
```
Or double-click `index.html` in File Explorer.

---

## 🧪 Self-Check Verification

Run the automated logic test suite:
```powershell
node test.js
```

Expected output:
```text
Running self-check tests...
  [PASS] Connect 4: Horizontal win detection
  [PASS] Connect 4: Vertical win detection
  [PASS] Connect 4: Diagonal win detection
  [PASS] Connect 4: 3-in-a-row correctly does not win
  [PASS] Calculator: Arithmetic & division by zero handling

All self-check tests passed successfully!
```

---

## 📋 Task Highlights & Features

### Task 1 – Basic Calculator
- **Visual Design:** Matches the dark navy blue container and layout from Page 9 of the synopsis.
- **Operations:** Addition (`+`), subtraction (`-`), multiplication (`*`), division (`/`).
- **Keys:** `AC` (All Clear), `DE` (Delete / Backspace), `.`, `00`, `0` to `9`, `=`.
- **Keyboard Support:** Enter numbers, arithmetic operators, Enter to calculate, Backspace to delete, Escape / 'C' to clear.
- **Error Handling:** Graceful division by zero detection (`Error`).

### Task 2 – eCommerce Website (`.sneakers`)
- **Visual Design:** Matches Page 10 of the synopsis featuring `.sneakers` branding, top promo banner ("Limited Offer!"), search input, and hero shoe showcase.
- **Dynamic Showcase:** Clicking navigation items (`AIR FORCE`, `JORDAN`, `BLAZER`, `CRATER`, `HIPPIE`) dynamically switches the hero background accent, sneaker model colors, title, and price.
- **Interactive Cart:** Slide-out cart drawer showing selected items, quantity increments, subtotal calculation, and remove buttons.
- **Delivery Form:** Modal checkout form capturing delivery and payment details without server dependencies.
- **Search:** Real-time search filter across the catalog.

### Task 3 – To-Do List
- **Visual Design:** Matches Page 12 of the synopsis with a warm yellow/orange gradient background and centered card.
- **Functionality:** Input task field, add task button, circular toggle for completion, strikethrough styling, and delete action.
- **Persistence:** Uses browser `localStorage` to retain tasks across page reloads.
- **Counter:** Live count of total and completed tasks with a "Clear Completed" shortcut.

### Task 4 – Connect 4 Game
- **Visual Design:** Matches Page 14 of the synopsis with a vibrant magenta background, blue 7x6 board, and red vs. magenta player tokens.
- **Game Engine:** Gravity mechanic drops discs to the lowest unoccupied slot in the clicked column.
- **Win Detection:** Checks horizontal, vertical, and diagonal sequences for 4-in-a-row with winning slot highlight animations.
- **Scoreboard & Replay:** Tracks Player 1, Player 2, and Tie scores with seamless in-page restart.
