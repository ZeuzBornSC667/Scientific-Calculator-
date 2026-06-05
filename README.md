# 🧮 ScientiFX — Scientific Calculator

A fully-featured scientific calculator built with vanilla HTML, CSS, and JavaScript using the [math.js](https://mathjs.org/) library. Designed with a sleek dark industrial aesthetic, keyboard support, calculation history, and a light/dark theme toggle.

![ScientiFX Screenshot](assets/screenshot.png)

## 🔴 Live Demo
👉 **[Open ScientiFX](https://your-username.github.io/scientific-calculator)**

---

## ✨ Features

### Basic Operations
- Addition, subtraction, multiplication, division
- Percentage and sign toggle (+/−)
- Parentheses support for complex expressions
- Modulo operator

### Scientific Functions
- Trigonometry: `sin`, `cos`, `tan`
- Logarithms: `log` (base 10), `ln` (natural log)
- Powers: `x²`, `xⁿ`, `EXP`
- Roots: `√`
- Factorial: `n!`
- Inverse: `1/x`
- Absolute value: `|x|`
- Constants: `π` and `e`

### UX Features
- 🌙 Dark / Light theme toggle (saved to localStorage)
- ⌨️ Full keyboard support
- 📋 Calculation history panel (saved to localStorage)
- 🔄 DEG / RAD angle mode toggle
- 💥 Button ripple animations
- 📱 Responsive mobile layout

---

## 🛠 Tech Stack

| Layer | Technology |
|-------|-----------|
| Markup | HTML5 |
| Styling | CSS3 (CSS Variables, Grid, Flexbox) |
| Logic | Vanilla JavaScript (ES6+) |
| Math Engine | [math.js v12](https://mathjs.org/) |
| Persistence | localStorage (browser built-in) |
| Testing | Jest |
| Fonts | Google Fonts (Share Tech Mono, Exo 2) |
| Deployment | GitHub Pages |

---

## 📁 Project Structure

```
scientific-calculator/
│
├── index.html              # Main HTML entry point
├── README.md               # Project documentation
├── package.json            # Project metadata & test config
├── .gitignore
│
├── css/
│   └── styles.css          # All styles with CSS variables
│
├── js/
│   ├── calculator.js       # Core calculation logic (math.js)
│   ├── history.js          # localStorage history manager
│   └── ui.js               # DOM events and display updates
│
├── tests/
│   └── calculator.test.js  # Jest unit tests
│
└── assets/
    └── screenshot.png      # Project screenshot
```

---

## 🚀 Getting Started

### Option 1: Open directly in browser
```bash
# Clone the repository
git clone https://github.com/your-username/scientific-calculator.git

# Navigate into the folder
cd scientific-calculator

# Open in your browser
open index.html   # macOS
# or
start index.html  # Windows
```

### Option 2: Run with a local server
```bash
# Using Python
python -m http.server 8000

# Using Node.js
npx serve .
```

Then open `http://localhost:8000` in your browser.

### Run Tests
```bash
npm install
npm test
```

---

## ⌨️ Keyboard Shortcuts

| Key | Action |
|-----|--------|
| `0–9` | Enter digits |
| `+`, `-`, `*`, `/` | Operators |
| `Enter` or `=` | Calculate result |
| `Backspace` | Delete last character |
| `Escape` | Clear all |
| `.` | Decimal point |
| `(` `)` | Parentheses |
| `%` | Percentage |

---

## 📚 What I Learned

- **Math.js integration** — using a library for safe expression evaluation instead of `eval()`
- **Module pattern in JavaScript** — organizing code with IIFEs and encapsulation
- **CSS Custom Properties** — managing themes with variables
- **localStorage** — persisting state across browser sessions
- **Event delegation** — handling many button clicks efficiently
- **Keyboard accessibility** — mapping key events to calculator actions

---

## 🔮 Future Improvements

- [ ] Add scientific notation display for very large/small numbers
- [ ] Memory functions (M+, M−, MR, MC)
- [ ] Graphing mode for plotting functions
- [ ] History export to CSV
- [ ] Haptic feedback on mobile

---

## 📄 License

MIT License — feel free to use this project for learning or personal use.

---

*Built as part of my developer portfolio. See more projects at [your-portfolio-url.com](https://your-portfolio-url.com)*
