/**
 * ui.js
 * Handles all DOM interactions and display updates
 */

document.addEventListener('DOMContentLoaded', () => {
  // Elements
  const displayResult = document.getElementById('result');
  const displayExpression = document.getElementById('expression');
  const angleMode = document.getElementById('angleMode');
  const historyToggle = document.getElementById('historyToggle');
  const historyPanel = document.getElementById('historyPanel');
  const clearHistory = document.getElementById('clearHistory');
  const historyList = document.getElementById('historyList');
  const themeToggle = document.getElementById('themeToggle');
  const layout = document.querySelector('.calculator-layout');

  // Init history render
  History.renderHistory();

  // ── Display Update ─────────────────────────────
  const updateDisplay = (state) => {
    if (!state) return;

    const { expression, result, modeLabel } = state;

    // Update expression
    if (expression !== undefined) {
      displayExpression.textContent = expression || '';
    }

    // Update result
    if (result !== undefined) {
      displayResult.textContent = result;
      displayResult.classList.toggle('small', result.length > 14);
      displayResult.classList.toggle('error', String(result).startsWith('Error'));
    }

    // Update angle mode label
    if (modeLabel) angleMode.textContent = modeLabel;
  };

  // ── Button Clicks ──────────────────────────────
  document.querySelector('.keypad').addEventListener('click', (e) => {
    const btn = e.target.closest('.btn');
    if (!btn) return;

    const action = btn.dataset.action;
    const val = btn.dataset.val;

    addRipple(btn, e);

    const state = Calculator.dispatch(action, val);
    updateDisplay(state);
  });

  // ── Keyboard Support ───────────────────────────
  document.addEventListener('keydown', (e) => {
    const map = {
      '0':'num','1':'num','2':'num','3':'num','4':'num',
      '5':'num','6':'num','7':'num','8':'num','9':'num',
      '+':'add', '-':'subtract', '*':'multiply', '/':'divide',
      'Enter':'equals', '=':'equals',
      'Backspace':'backspace', 'Escape':'clear',
      '.':'decimal', '(':'openParen', ')':'closeParen',
      '%':'percent',
    };

    if (e.key === 'Enter') e.preventDefault();

    const action = map[e.key];
    if (!action) return;

    const state = Calculator.dispatch(action, e.key);
    updateDisplay(state);
  });

  // ── Theme Toggle ───────────────────────────────
  const savedTheme = localStorage.getItem('scientifx_theme');
  if (savedTheme === 'light') {
    document.body.classList.add('light-theme');
    themeToggle.textContent = '🌙';
  }

  themeToggle.addEventListener('click', () => {
    const isLight = document.body.classList.toggle('light-theme');
    themeToggle.textContent = isLight ? '🌙' : '☀';
    localStorage.setItem('scientifx_theme', isLight ? 'light' : 'dark');
  });

  // ── History Panel Toggle ───────────────────────
  historyToggle.addEventListener('click', () => {
    layout.classList.toggle('show-history');
  });

  clearHistory.addEventListener('click', () => {
    History.clear();
  });

  // Click history item to reuse result
  historyList.addEventListener('click', (e) => {
    const item = e.target.closest('.history-item');
    if (!item) return;
    const idx = parseInt(item.dataset.index);
    const items = History.load();
    if (items[idx]) {
      const state = Calculator.dispatch('num', items[idx].result);
      updateDisplay(state);
    }
  });

  // ── Ripple Effect ──────────────────────────────
  function addRipple(btn, e) {
    const ripple = document.createElement('span');
    ripple.className = 'ripple-effect';
    const rect = btn.getBoundingClientRect();
    ripple.style.left = `${e.clientX - rect.left - 10}px`;
    ripple.style.top = `${e.clientY - rect.top - 10}px`;
    btn.appendChild(ripple);
    ripple.addEventListener('animationend', () => ripple.remove());
  }
});
