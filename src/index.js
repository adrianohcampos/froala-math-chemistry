import { MathChemModal, DEFAULT_CHEM_SNIPPETS, DEFAULT_CHEM_EXAMPLES, parsePureCe } from './modal.js';
import { DEFAULT_LABELS, LOCALES, getLabels, registerLocale, resolveLocaleCode } from './locales.js';

const PLUGIN = 'mathChemistry';
const SELECTOR = '.math-tex';

const escapeHtml = (s) => String(s)
  .replace(/&/g, '&amp;')
  .replace(/</g, '&lt;')
  .replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;');

export const wrapLatex = (latex, display = false) => (display ? `\\[${latex}\\]` : `\\(${latex}\\)`);

export function extractLatex(text) {
  const t = String(text || '').trim();
  let m = /^\\\(([\s\S]*)\\\)$/.exec(t);
  if (m) return { latex: m[1].trim(), display: false };
  m = /^\\\[([\s\S]*)\\\]$/.exec(t);
  if (m) return { latex: m[1].trim(), display: true };
  m = /^\$\$([\s\S]*)\$\$$/.exec(t);
  if (m) return { latex: m[1].trim(), display: true };
  return null;
}

export function buildFormulaHtml(latex, display = false) {
  const disp = display ? ' data-display="true"' : '';
  return `<span class="math-tex" data-latex="${escapeHtml(latex)}"${disp}>${escapeHtml(wrapLatex(latex, display))}</span>`;
}

const TAG_RE = /<span\b(?:"[^"]*"|'[^']*'|[^>"'])*>|<\/span\s*>/gi;
const CLASS_RE = /\sclass\s*=\s*(?:"([^"]*)"|'([^']*)')/i;
const CE_RE = /\scontenteditable\s*=\s*(?:"[^"]*"|'[^']*')/i;

function tagAttr(tag, name) {
  const m = new RegExp(`\\s${name}\\s*=\\s*(?:"([^"]*)"|'([^']*)')`, 'i').exec(tag);
  return m ? (m[1] !== undefined ? m[1] : m[2]) : null;
}

export function serializeFormulas(html) {
  const re = new RegExp(TAG_RE.source, 'gi');
  let out = '';
  let last = 0;
  let start = -1;
  let depth = 0;
  let open = '';
  let m;
  while ((m = re.exec(html))) {
    const tok = m[0];
    const closing = tok.charAt(1) === '/';
    if (start === -1) {
      if (closing) continue;
      const cls = CLASS_RE.exec(tok);
      if (cls && /(^|\s)math-tex(\s|$)/.test(cls[1] !== undefined ? cls[1] : cls[2])) {
        start = m.index;
        open = tok;
        depth = 1;
      }
      continue;
    }
    depth += closing ? -1 : 1;
    if (depth > 0) continue;
    const latex = tagAttr(open, 'data-latex');
    if (latex !== null) {
      const display = tagAttr(open, 'data-display') === 'true';
      out += html.slice(last, start) + open.replace(CE_RE, '') + wrapLatex(latex, display) + tok;
      last = m.index + tok.length;
    }
    start = -1;
  }
  return out + html.slice(last);
}

function translateTitles(FE, froalaLang, labels) {
  if (!froalaLang || !FE.LANGUAGE) return;
  const entry = FE.LANGUAGE[froalaLang] || (FE.LANGUAGE[froalaLang] = { translation: {} });
  const tr = entry.translation || (entry.translation = {});
  if (!tr['Math Editor']) tr['Math Editor'] = labels.mathEditorTitle;
  if (!tr['Chemistry Editor']) tr['Chemistry Editor'] = labels.chemEditorTitle;
}

function registerQuickInsert(FE) {
  if (typeof FE.RegisterQuickInsertButton !== 'function') return;
  const registered = FE.QUICK_INSERT_BUTTONS || {};
  if (!registered.mathEditor) {
    FE.RegisterQuickInsertButton('mathEditor', {
      icon: 'mathEditor',
      requiredPlugin: PLUGIN,
      title: 'Math Editor',
      undo: false,
      callback() { this.mathChemistry.open('math'); }
    });
  }
  if (!registered.chemEditor) {
    FE.RegisterQuickInsertButton('chemEditor', {
      icon: 'chemEditor',
      requiredPlugin: PLUGIN,
      title: 'Chemistry Editor',
      undo: false,
      callback() { this.mathChemistry.open('chem'); }
    });
  }
}

export function install(FE) {
  FE = FE || (typeof window !== 'undefined' ? window.FroalaEditor : null);
  if (!FE) throw new Error('[froala-math-chemistry] FroalaEditor not found. Load Froala before the plugin or call install(FroalaEditor).');
  if (FE.PLUGINS[PLUGIN]) return FE;

  Object.keys(FE.LANGUAGE || {}).forEach((key) => translateTitles(FE, key, getLabels(key)));

  Object.assign(FE.DEFAULTS, {
    mathChemistryRender: true,
    mathChemistryKatexOptions: { throwOnError: false },
    mathChemistryLanguage: null,
    mathChemistryTheme: 'light',
    mathChemistryMathliveLocale: true,
    mathChemistryLabels: {},
    mathChemistryChemSnippets: null,
    mathChemistryChemExamples: null
  });

  const svg = (cls) => `<svg class="${cls}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="[PATH]"/></svg>`;
  FE.DefineIconTemplate('fmcIcon', svg('fmc-icon'));
  FE.DefineIcon('mathEditor', { NAME: 'mathEditor', template: 'fmcIcon', PATH: 'M18 4H6v2l6.5 6L6 18v2h12v-3h-7l5-5-5-5h7z' });
  FE.DefineIcon('chemEditor', { NAME: 'chemEditor', template: 'fmcIcon', PATH: 'M19.8 18.4L14 10.67V6.5l1.35-1.69c.26-.33.03-.81-.39-.81H9.04c-.42 0-.65.48-.39.81L10 6.5v4.17L4.2 18.4c-.49.66-.02 1.6.8 1.6h14c.82 0 1.29-.94.8-1.6z' });

  FE.PLUGINS[PLUGIN] = function (editor) {
    let modal = null;
    let target = null;
    let restoreSelection = false;
    let observer = null;
    let repairing = false;
    const signatures = new WeakMap();
    const signature = (el) => `${el.getElementsByTagName('*').length}:${el.querySelectorAll('[style]').length}`;

    const win = () => editor.win || editor.o_win || window;
    const doc = () => editor.doc || editor.o_doc || document;

    function syncIframeStyles() {
      const target = doc();
      if (!editor.opts.iframe || target === document || !target.head) return;
      document.querySelectorAll('link[rel="stylesheet"]').forEach((link) => {
        if (!/katex|froala-math-chemistry/i.test(link.href)) return;
        if ([...target.head.querySelectorAll('link')].some((l) => l.href === link.href)) return;
        target.head.appendChild(link.cloneNode(true));
      });
    }

    function renderElement(el) {
      let latex = el.getAttribute('data-latex');
      let display = el.getAttribute('data-display') === 'true';
      if (latex == null) {
        const parsed = extractLatex(el.textContent);
        if (!parsed) return;
        latex = parsed.latex;
        display = parsed.display;
        el.setAttribute('data-latex', latex);
        if (display) el.setAttribute('data-display', 'true');
      }
      el.setAttribute('contenteditable', 'false');
      const katex = window.katex;
      if (!editor.opts.mathChemistryRender || !katex) return;
      if (el.querySelector('.katex')) {
        if (signatures.get(el) === signature(el)) return;
        el.textContent = '';
      }
      try {
        katex.render(latex, el, { ...editor.opts.mathChemistryKatexOptions, displayMode: display });
        signatures.set(el, signature(el));
      } catch (err) {
        el.textContent = wrapLatex(latex, display);
      }
    }

    function renderAll() {
      if (!editor.el) return;
      editor.el.querySelectorAll(SELECTOR).forEach(renderElement);
    }

    function repair(records) {
      if (repairing) return;
      const touched = records.some((r) => {
        const n = r.target.nodeType === 1 ? r.target : r.target.parentElement;
        return n && n.closest && n.closest(SELECTOR);
      });
      if (!touched) return;
      repairing = true;
      renderAll();
      observer.takeRecords();
      repairing = false;
    }

    function serialize(html) {
      if (typeof html !== 'string' || html.indexOf('math-tex') === -1) return html;
      if (html.indexOf('katex') === -1 && html.indexOf('contenteditable') === -1) return html;
      return serializeFormulas(html);
    }

    function formulaFromNode(node) {
      const base = node && node.nodeType === 1 ? node : node && node.parentElement;
      const el = base && base.closest ? base.closest(SELECTOR) : null;
      return el && editor.el.contains(el) ? el : null;
    }

    function selectedFormula() {
      const sel = win().getSelection && win().getSelection();
      if (!sel || !sel.rangeCount) return null;
      const range = sel.getRangeAt(0);
      const inside = formulaFromNode(range.commonAncestorContainer);
      if (inside) return inside;
      const { startContainer: c, startOffset: s, endContainer, endOffset } = range;
      if (c === endContainer && c.nodeType === 1 && endOffset - s === 1) return formulaFromNode(c.childNodes[s]);
      return null;
    }

    function selectNode(el) {
      const sel = win().getSelection();
      const range = doc().createRange();
      range.selectNode(el);
      sel.removeAllRanges();
      sel.addRange(range);
    }

    function ensureTrailing(el) {
      if (!el.nextSibling) el.after(doc().createTextNode('\u00a0'));
    }

    function applySave({ latex, displayMode }) {
      if (restoreSelection) {
        editor.selection.restore();
        restoreSelection = false;
      }
      editor.undo.saveStep();
      if (target && editor.el.contains(target)) {
        target.setAttribute('data-latex', latex);
        if (displayMode) target.setAttribute('data-display', 'true');
        else target.removeAttribute('data-display');
        target.textContent = wrapLatex(latex, displayMode);
        renderElement(target);
        ensureTrailing(target);
      } else {
        const html = buildFormulaHtml(latex, displayMode).replace('<span ', '<span data-fmc-new="1" ');
        editor.html.insert(html);
        const el = editor.el.querySelector('[data-fmc-new]');
        if (el) {
          el.removeAttribute('data-fmc-new');
          renderElement(el);
          ensureTrailing(el);
        }
        renderAll();
      }
      target = null;
      editor.undo.saveStep();
      editor.events.trigger('contentChanged');
    }

    function handleClose() {
      if (restoreSelection) {
        editor.selection.restore();
        restoreSelection = false;
      }
      target = null;
    }

    function language() {
      return resolveLocaleCode(editor.opts.mathChemistryLanguage || editor.opts.language || document.documentElement.lang || 'en');
    }

    function getModal() {
      if (!modal) {
        modal = new MathChemModal({
          language: language(),
          theme: editor.opts.mathChemistryTheme,
          setMathliveLocale: editor.opts.mathChemistryMathliveLocale,
          labels: editor.opts.mathChemistryLabels,
          chemSnippets: editor.opts.mathChemistryChemSnippets || DEFAULT_CHEM_SNIPPETS,
          chemExamples: editor.opts.mathChemistryChemExamples || DEFAULT_CHEM_EXAMPLES,
          katexOptions: editor.opts.mathChemistryKatexOptions,
          onSave: applySave,
          onClose: handleClose
        });
      }
      return modal;
    }

    function open(tab = 'math', el = null) {
      target = el || selectedFormula();
      if (!editor.core.hasFocus()) editor.events.focus(true);
      editor.selection.save();
      restoreSelection = true;

      let latex = '';
      let displayMode = false;
      if (target) {
        latex = target.getAttribute('data-latex') || '';
        displayMode = target.getAttribute('data-display') === 'true';
      }
      getModal().open({ latex, displayMode, tab: target && parsePureCe(latex) !== null ? 'chem' : tab });
    }

    function _init() {
      if (!editor.$el) return;

      translateTitles(FE, editor.opts.language, getLabels(language(), editor.opts.mathChemistryLabels));
      registerQuickInsert(FE);

      editor.events.on('initialized', () => {
        syncIframeStyles();
        renderAll();
      });
      editor.events.on('html.set', renderAll);
      editor.events.on('html.get', serialize);
      editor.events.on('commands.after', (cmd) => {
        if (cmd === 'undo' || cmd === 'redo') renderAll();
      });

      editor.events.$on(editor.$el, 'click', SELECTOR, (e) => {
        if (e.shiftKey || e.ctrlKey || e.metaKey || e.altKey) return;
        const el = formulaFromNode(e.target);
        if (el) selectNode(el);
      });

      editor.events.$on(editor.$el, 'dblclick', SELECTOR, (e) => {
        const el = formulaFromNode(e.target);
        if (!el) return;
        e.preventDefault();
        e.stopPropagation();
        open('math', el);
      });

      if (typeof MutationObserver !== 'undefined') {
        observer = new MutationObserver(repair);
        observer.observe(editor.el, { childList: true, subtree: true, attributes: true, attributeFilter: ['style', 'class'] });
      }

      editor.events.on('destroy', () => {
        if (observer) observer.disconnect();
        observer = null;
        if (modal) modal.destroy();
        modal = null;
      }, true);
    }

    return { _init, open, renderAll };
  };

  FE.RegisterCommand('mathEditor', {
    title: 'Math Editor',
    undo: false,
    focus: false,
    refreshAfterCallback: false,
    plugin: PLUGIN,
    callback() { this.mathChemistry.open('math'); }
  });

  FE.RegisterCommand('chemEditor', {
    title: 'Chemistry Editor',
    undo: false,
    focus: false,
    refreshAfterCallback: false,
    plugin: PLUGIN,
    callback() { this.mathChemistry.open('chem'); }
  });

  registerQuickInsert(FE);

  return FE;
}

if (typeof window !== 'undefined' && window.FroalaEditor) install(window.FroalaEditor);

export { MathChemModal, DEFAULT_LABELS, LOCALES, registerLocale, getLabels, resolveLocaleCode, parsePureCe, DEFAULT_CHEM_SNIPPETS, DEFAULT_CHEM_EXAMPLES };
export default install;
