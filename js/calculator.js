/**
 * calculator.js
 * Core calculation logic using math.js
 */

const Calculator = (() => {
  let expression = '';
  let lastResult = null;
  let angleMode = 'DEG'; // 'DEG' | 'RAD'
  let justEvaluated = false;

  // Convert degrees to radians if needed
  const toRad = (val) => angleMode === 'DEG' ? (val * Math.PI / 180) : val;

  // Safe evaluation using math.js
  const evaluate = (expr) => {
    try {
      // Replace display symbols with math.js compatible syntax
      let sanitized = expr
        .replace(/×/g, '*')
        .replace(/÷/g, '/')
        .replace(/−/g, '-')
        .replace(/π/g, 'pi')
        .replace(/mod/g, ' mod ');

      const result = math.evaluate(sanitized);

      if (typeof result === 'number') {
        if (!isFinite(result)) return 'Error: Infinity';
        if (isNaN(result)) return 'Error: Invalid';
        // Round floating point errors
        return parseFloat(result.toPrecision(12)).toString();
      }

      return result.toString();
    } catch (e) {
      return 'Error';
    }
  };

  const actions = {
    num(val) {
      if (justEvaluated && !isNaN(val)) {
        expression = '';
        justEvaluated = false;
      }
      expression += val;
    },

    decimal() {
      if (justEvaluated) { expression = '0'; justEvaluated = false; }
      // Prevent double dot in current number segment
      const parts = expression.split(/[\+\-\×\÷\(]/);
      const last = parts[parts.length - 1];
      if (!last.includes('.')) expression += '.';
    },

    add()      { appendOp('+'); },
    subtract() { appendOp('−'); },
    multiply() { appendOp('×'); },
    divide()   { appendOp('÷'); },
    mod()      { appendOp('mod'); },

    openParen()  { expression += '('; justEvaluated = false; },
    closeParen() { expression += ')'; },

    clear() {
      expression = '';
      lastResult = null;
      justEvaluated = false;
      return { expression: '', result: '0' };
    },

    backspace() {
      if (justEvaluated) { expression = ''; justEvaluated = false; }
      expression = expression.slice(0, -1);
    },

    toggleSign() {
      if (expression === '' || expression === '0') return;
      if (expression.startsWith('-(')) {
        expression = expression.slice(2, -1);
      } else {
        expression = `-( ${expression})`;
      }
    },

    percent() {
      if (!expression) return;
      const val = parseFloat(evaluate(expression));
      if (!isNaN(val)) {
        expression = (val / 100).toString();
        justEvaluated = true;
      }
    },

    toggleAngle() {
      angleMode = angleMode === 'DEG' ? 'RAD' : 'DEG';
      return { modeLabel: angleMode };
    },

    sin() { applyTrig('sin'); },
    cos() { applyTrig('cos'); },
    tan() { applyTrig('tan'); },

    log() {
      if (justEvaluated && lastResult) {
        const result = evaluate(`log10(${lastResult})`);
        expression = result;
        justEvaluated = true;
      } else {
        expression += 'log(';
      }
    },

    ln() {
      if (justEvaluated && lastResult) {
        const result = evaluate(`log(${lastResult})`);
        expression = result;
        justEvaluated = true;
      } else {
        expression += 'log(';
      }
    },

    sqrt() {
      if (justEvaluated && lastResult) {
        expression = evaluate(`sqrt(${lastResult})`);
        justEvaluated = true;
      } else {
        expression += 'sqrt(';
      }
    },

    square() {
      if (expression === '') return;
      const base = justEvaluated ? lastResult : `(${expression})`;
      expression = evaluate(`(${base})^2`);
      justEvaluated = true;
    },

    pow() {
      appendOp('^');
      justEvaluated = false;
    },

    factorial() {
      if (expression === '') return;
      const val = evaluate(expression);
      expression = evaluate(`${val}!`);
      justEvaluated = true;
    },

    inv() {
      if (expression === '') return;
      const val = evaluate(expression);
      expression = evaluate(`1/(${val})`);
      justEvaluated = true;
    },

    abs() {
      if (justEvaluated && lastResult) {
        expression = evaluate(`abs(${lastResult})`);
        justEvaluated = true;
      } else {
        expression += 'abs(';
      }
    },

    pi() {
      if (justEvaluated) { expression = ''; justEvaluated = false; }
      expression += 'π';
    },

    e() {
      if (justEvaluated) { expression = ''; justEvaluated = false; }
      expression += 'e';
    },

    exp() {
      appendOp('×10^');
    },

    equals() {
      if (!expression) return;
      const result = evaluate(expression);
      History.add(expression, result);
      lastResult = result;
      expression = result.startsWith('Error') ? '' : result;
      justEvaluated = true;
      return { result, expression: '' };
    },
  };

  function appendOp(op) {
    if (expression === '' && lastResult) expression = lastResult;
    if (expression === '') return;
    // Replace trailing operator
    expression = expression.replace(/[\+\-\×\÷\^]$/, '');
    expression += op;
    justEvaluated = false;
  }

  function applyTrig(fn) {
    if (justEvaluated && lastResult) {
      const val = angleMode === 'DEG'
        ? evaluate(`${fn}(${lastResult} deg)`)
        : evaluate(`${fn}(${lastResult})`);
      expression = val;
      justEvaluated = true;
    } else {
      expression += `${fn}(`;
    }
  }

  return {
    dispatch(action, val) {
      if (actions[action]) {
        const result = actions[action](val);
        return {
          expression,
          result: justEvaluated ? lastResult : (expression || '0'),
          modeLabel: angleMode,
          ...(result || {}),
        };
      }
    },
    getState() {
      return { expression, result: lastResult || '0', modeLabel: angleMode };
    }
  };
})();
