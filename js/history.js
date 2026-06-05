/**
 * history.js
 * Manages calculation history using localStorage
 */

const History = (() => {
  const STORAGE_KEY = 'scientifx_history';
  const MAX_ITEMS = 50;

  const load = () => {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    } catch {
      return [];
    }
  };

  const save = (items) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  };

  const add = (expression, result) => {
    if (result.startsWith('Error')) return;
    const items = load();
    items.unshift({ expression, result, timestamp: Date.now() });
    save(items.slice(0, MAX_ITEMS));
    renderHistory();
  };

  const clear = () => {
    save([]);
    renderHistory();
  };

  const renderHistory = () => {
    const list = document.getElementById('historyList');
    if (!list) return;
    const items = load();

    if (items.length === 0) {
      list.innerHTML = '<li class="history-empty">No calculations yet</li>';
      return;
    }

    list.innerHTML = items.map((item, i) => `
      <li class="history-item" data-index="${i}">
        <div class="history-expr">${escapeHtml(item.expression)}</div>
        <div class="history-result">${escapeHtml(item.result)}</div>
      </li>
    `).join('');
  };

  const escapeHtml = (str) =>
    String(str).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');

  return { add, clear, load, renderHistory };
})();
