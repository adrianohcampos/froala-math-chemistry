import { getLabels } from './locales.js';

export const DEFAULT_CHEM_SNIPPETS = [
  { label: 'H₂O', insert: 'H2O' },
  { label: '→', insert: ' -> ' },
  { label: '⇌', insert: ' <=> ' },
  { label: '⇄', insert: ' <-> ' },
  { label: '+', insert: ' + ' },
  { label: 'Xⁿ⁺', insert: '^2+' },
  { label: 'Xⁿ⁻', insert: '^2-' },
  { label: '(aq)', insert: '(aq)' },
  { label: '(s)', insert: '(s)' },
  { label: '(l)', insert: '(l)' },
  { label: '(g)', insert: '(g)' },
  { label: '↑', insert: ' ^' },
  { label: '↓', insert: ' v' },
  { label: 'Δ', insert: '->[$\\Delta$]' }
];

export const DEFAULT_CHEM_EXAMPLES = [
  { label: 'H2O + CO2 -> H2CO3', value: 'H2O + CO2 -> H2CO3' },
  { label: 'CH4 + 2O2 -> CO2 + 2H2O', value: 'CH4 + 2O2 -> CO2 + 2H2O' },
  { label: 'N2 + 3H2 <=> 2NH3', value: 'N2 + 3H2 <=> 2NH3' },
  { label: 'SO4^2-', value: 'SO4^2-' },
  { label: 'Zn^2+ + 2e- -> Zn', value: 'Zn^2+ + 2e- -> Zn' },
  { label: '^{227}_{90}Th+', value: '^{227}_{90}Th+' }
];

export function parsePureCe(latex) {
  const s = String(latex || '').trim();
  if (!s.startsWith('\\ce{') || !s.endsWith('}')) return null;
  let depth = 0;
  for (let i = 3; i < s.length; i++) {
    const c = s[i];
    if (c === '\\') { i++; continue; }
    if (c === '{') depth++;
    else if (c === '}') {
      depth--;
      if (depth === 0) return i === s.length - 1 ? s.slice(4, -1) : null;
    }
  }
  return null;
}

const h = (tag, props = {}, ...children) => {
  const el = document.createElement(tag);
  for (const [key, val] of Object.entries(props)) {
    if (val == null || val === false) continue;
    if (key === 'class') el.className = val;
    else if (key === 'text') el.textContent = val;
    else if (key.startsWith('on')) el.addEventListener(key.slice(2).toLowerCase(), val);
    else el.setAttribute(key, val === true ? '' : val);
  }
  for (const child of children.flat()) if (child != null) el.append(child);
  return el;
};

let uid = 0;

export class MathChemModal {
  constructor(options = {}) {
    this.language = options.language || 'en';
    this.theme = options.theme || 'light';
    this.setMathliveLocale = options.setMathliveLocale !== false;
    this.labels = getLabels(this.language, options.labels);
    this.snippets = options.chemSnippets || DEFAULT_CHEM_SNIPPETS;
    this.examples = options.chemExamples || DEFAULT_CHEM_EXAMPLES;
    this.katexOptions = options.katexOptions || {};
    this.onSave = options.onSave || (() => {});
    this.onClose = options.onClose || (() => {});
    this.id = `fmc-${++uid}`;
    this.root = null;
    this.mathfield = null;
    this.isOpen = false;
    this.isEditing = false;
    this.tab = 'math';
    this._prevFocus = null;
  }

  create() {
    if (this.root) return this.root;
    const L = this.labels;
    const id = this.id;

    this.tabMathBtn = h('button', { type: 'button', role: 'tab', class: 'fmc-tab', id: `${id}-tab-math`, 'aria-controls': `${id}-panel-math`, text: L.tabMath, onClick: () => this.setTab('math') });
    this.tabChemBtn = h('button', { type: 'button', role: 'tab', class: 'fmc-tab', id: `${id}-tab-chem`, 'aria-controls': `${id}-panel-chem`, text: L.tabChem, onClick: () => this.setTab('chem') });

    this.mathPanel = h('div', { role: 'tabpanel', class: 'fmc-panel', id: `${id}-panel-math`, 'aria-labelledby': `${id}-tab-math` });
    this.chemPanel = h('div', { role: 'tabpanel', class: 'fmc-panel', id: `${id}-panel-chem`, 'aria-labelledby': `${id}-tab-chem` });

    this._buildMathPanel();
    this._buildChemPanel();

    this.displayInput = h('input', { type: 'checkbox', id: `${id}-display` });
    this.errorEl = h('div', { class: 'fmc-error', role: 'alert', hidden: true });
    this.saveBtn = h('button', { type: 'button', class: 'fmc-btn fmc-btn-primary', text: L.insert, onClick: () => this.save() });

    const closeBtn = h('button', { type: 'button', class: 'fmc-close', 'aria-label': L.close, text: '×', onClick: () => this.close() });

    this.dialog = h('div', { class: 'fmc-dialog', role: 'dialog', 'aria-modal': 'true', 'aria-labelledby': `${id}-title` },
      h('div', { class: 'fmc-header' },
        h('h3', { class: 'fmc-title', id: `${id}-title`, text: L.title }),
        closeBtn
      ),
      h('div', { class: 'fmc-tabs', role: 'tablist' }, this.tabMathBtn, this.tabChemBtn),
      h('div', { class: 'fmc-body' }, this.mathPanel, this.chemPanel, this.errorEl),
      h('div', { class: 'fmc-footer' },
        h('label', { class: 'fmc-check', for: `${id}-display` }, this.displayInput, h('span', { text: L.display })),
        h('div', { class: 'fmc-actions' },
          h('button', { type: 'button', class: 'fmc-btn', text: L.cancel, onClick: () => this.close() }),
          this.saveBtn
        )
      )
    );

    this.root = h('div', { class: `fmc-backdrop fmc-theme-${this.theme}`, hidden: true, lang: this.language.replace('_', '-') }, this.dialog);
    this.root.addEventListener('keydown', (e) => this._onKeydown(e));
    document.body.appendChild(this.root);
    return this.root;
  }

  _buildMathPanel() {
    const L = this.labels;
    const id = this.id;
    this.sourceInput = h('textarea', { class: 'fmc-textarea', id: `${id}-source`, rows: '2', spellcheck: 'false', autocomplete: 'off', autocapitalize: 'off' });

    if (window.customElements && window.customElements.get('math-field')) {
      if (this.setMathliveLocale && window.MathfieldElement) {
        try { window.MathfieldElement.locale = this.language.toLowerCase().split(/[-_]/)[0]; } catch (e) { /* noop */ }
      }
      this.mathfield = document.createElement('math-field');
      this.mathfield.className = 'fmc-mathfield';
      this.mathfield.mathVirtualKeyboardPolicy = 'auto';
      this.mathfield.addEventListener('input', () => { this.sourceInput.value = this.mathfield.value; this._showError(''); });
      this.sourceInput.addEventListener('input', () => { this.mathfield.value = this.sourceInput.value; this._showError(''); });
      this.mathPanel.append(this.mathfield);
    } else {
      this.mathPanel.append(h('div', { class: 'fmc-notice', text: L.noMathlive }));
    }

    this.mathPanel.append(
      h('label', { class: 'fmc-label', for: `${id}-source`, text: L.latexSource }),
      this.sourceInput
    );
  }

  _buildChemPanel() {
    const L = this.labels;
    const id = this.id;
    this.chemInput = h('textarea', { class: 'fmc-textarea fmc-chem-input', id: `${id}-chem`, rows: '2', spellcheck: 'false', autocomplete: 'off', autocapitalize: 'off', placeholder: L.chemPlaceholder });
    this.chemInput.addEventListener('input', () => { this._showError(''); this._renderChemPreview(); });

    const snippetBar = h('div', { class: 'fmc-snippets', role: 'group', 'aria-label': L.snippets },
      this.snippets.map((s) => h('button', { type: 'button', class: 'fmc-chip', text: s.label, title: s.insert.trim(), onClick: () => this._insertSnippet(s.insert) }))
    );

    const select = h('select', { class: 'fmc-select', 'aria-label': L.examples, onChange: (e) => {
      if (e.target.value) { this.chemInput.value = e.target.value; this._renderChemPreview(); }
      e.target.selectedIndex = 0;
    } }, h('option', { value: '', text: L.examples }), this.examples.map((x) => h('option', { value: x.value, text: x.label })));

    this.chemPreview = h('div', { class: 'fmc-preview', 'aria-live': 'polite' });

    this.chemPanel.append(
      h('label', { class: 'fmc-label', for: `${id}-chem`, text: L.chemInput }),
      this.chemInput,
      h('div', { class: 'fmc-chem-tools' }, snippetBar, select),
      h('div', { class: 'fmc-label', text: L.preview }),
      this.chemPreview
    );
  }

  _insertSnippet(text) {
    const ta = this.chemInput;
    const start = ta.selectionStart ?? ta.value.length;
    const end = ta.selectionEnd ?? ta.value.length;
    ta.value = ta.value.slice(0, start) + text + ta.value.slice(end);
    const pos = start + text.length;
    ta.focus();
    ta.setSelectionRange(pos, pos);
    this._renderChemPreview();
  }

  _renderChemPreview() {
    const body = this.chemInput.value.trim();
    const katex = window.katex;
    this.chemPreview.classList.remove('fmc-preview-error');
    this.chemPreview.textContent = '';
    if (!body) return;
    if (!katex) {
      this.chemPreview.textContent = this.labels.noKatex;
      return;
    }
    try {
      katex.render(`\\ce{${body}}`, this.chemPreview, { ...this.katexOptions, displayMode: true, throwOnError: true });
    } catch (err) {
      this.chemPreview.classList.add('fmc-preview-error');
      this.chemPreview.textContent = String(err.message || err).replace(/^KaTeX parse error:\s*/, '');
    }
  }

  setTab(tab, focus = true) {
    this.tab = tab === 'chem' ? 'chem' : 'math';
    const isMath = this.tab === 'math';
    this.mathPanel.hidden = !isMath;
    this.chemPanel.hidden = isMath;
    this.tabMathBtn.setAttribute('aria-selected', String(isMath));
    this.tabChemBtn.setAttribute('aria-selected', String(!isMath));
    this.tabMathBtn.tabIndex = isMath ? 0 : -1;
    this.tabChemBtn.tabIndex = isMath ? -1 : 0;
    this.tabMathBtn.classList.toggle('fmc-tab-active', isMath);
    this.tabChemBtn.classList.toggle('fmc-tab-active', !isMath);
    this._showError('');
    if (!isMath && window.mathVirtualKeyboard) window.mathVirtualKeyboard.hide();
    if (focus) (isMath ? this.mathfield || this.sourceInput : this.chemInput).focus();
    if (!isMath) this._renderChemPreview();
  }

  _showError(msg) {
    this.errorEl.textContent = msg;
    this.errorEl.hidden = !msg;
  }

  open({ latex = '', displayMode = false, tab = 'math' } = {}) {
    this.create();
    this.isEditing = Boolean(latex);
    this.saveBtn.textContent = this.isEditing ? this.labels.update : this.labels.insert;
    this.displayInput.checked = Boolean(displayMode);

    const ce = parsePureCe(latex);
    let startTab = tab;
    if (ce !== null) { startTab = 'chem'; this.chemInput.value = ce; } else { this.chemInput.value = ''; }
    if (ce === null) {
      if (this.mathfield) this.mathfield.value = latex || '';
      this.sourceInput.value = latex || '';
      if (latex) startTab = 'math';
    } else {
      if (this.mathfield) this.mathfield.value = '';
      this.sourceInput.value = '';
    }

    this._prevFocus = document.activeElement;
    this.root.hidden = false;
    this.isOpen = true;
    document.documentElement.classList.add('fmc-open');
    this.setTab(startTab);
  }

  getLatex() {
    if (this.tab === 'chem') {
      const body = this.chemInput.value.trim();
      return body ? `\\ce{${body}}` : '';
    }
    return (this.mathfield ? this.mathfield.value : this.sourceInput.value).trim();
  }

  _validate(latex, displayMode) {
    if (/\\placeholder\b/.test(latex)) return this.labels.placeholderLeft;
    const katex = window.katex;
    if (!katex) return '';
    try {
      katex.renderToString(latex, { ...this.katexOptions, displayMode, throwOnError: true });
    } catch (err) {
      return `${this.labels.invalidFormula}: ${String(err.message || err).replace(/^KaTeX parse error:\s*/, '')}`;
    }
    return '';
  }

  save() {
    const latex = this.getLatex();
    if (!latex) {
      this._showError(this.labels.empty);
      return;
    }
    const error = this._validate(latex, this.displayInput.checked);
    if (error) {
      this._showError(error);
      return;
    }
    this.onSave({ latex, displayMode: this.displayInput.checked, editing: this.isEditing });
    this.close(true);
  }

  close(saved = false) {
    if (!this.isOpen) return;
    this.isOpen = false;
    this.root.hidden = true;
    document.documentElement.classList.remove('fmc-open');
    if (window.mathVirtualKeyboard) window.mathVirtualKeyboard.hide();
    if (this._prevFocus && typeof this._prevFocus.focus === 'function' && document.contains(this._prevFocus)) {
      try { this._prevFocus.focus({ preventScroll: true }); } catch (e) { /* noop */ }
    }
    this._prevFocus = null;
    this.onClose({ saved });
  }

  _focusable() {
    const sel = 'button:not([disabled]):not([tabindex="-1"]), textarea, select, input, math-field';
    return [...this.dialog.querySelectorAll(sel)].filter((el) => !el.closest('[hidden]'));
  }

  _onKeydown(e) {
    if (e.key === 'Escape') {
      e.stopPropagation();
      if (e.defaultPrevented) return;
      e.preventDefault();
      const kb = window.mathVirtualKeyboard;
      if (kb && kb.visible) {
        kb.hide();
        return;
      }
      this.close();
    } else if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      this.save();
    } else if (e.key === 'Tab') {
      const items = this._focusable();
      if (!items.length) return;
      const first = items[0];
      const last = items[items.length - 1];
      const active = this.root.getRootNode().activeElement;
      if (e.shiftKey && (active === first || !this.dialog.contains(active))) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && active === last) { e.preventDefault(); first.focus(); }
    } else if ((e.key === 'ArrowLeft' || e.key === 'ArrowRight') && e.target.getAttribute && e.target.getAttribute('role') === 'tab') {
      this.setTab(this.tab === 'math' ? 'chem' : 'math', false);
      (this.tab === 'math' ? this.tabMathBtn : this.tabChemBtn).focus();
    }
  }

  destroy() {
    if (this.isOpen) this.close();
    if (this.root && this.root.parentNode) this.root.parentNode.removeChild(this.root);
    this.root = null;
    this.mathfield = null;
  }
}
