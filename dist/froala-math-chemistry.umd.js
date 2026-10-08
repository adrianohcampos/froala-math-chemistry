(function (root, factory) {
  if (typeof define === 'function' && define.amd) define([], factory);
  else if (typeof module === 'object' && module.exports) module.exports = factory();
  else root.FroalaMathChemistry = factory();
})(typeof self !== 'undefined' ? self : this, function () {
  var module = { exports: {} }, exports = module.exports;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.js
var index_exports = {};
__export(index_exports, {
  DEFAULT_CHEM_EXAMPLES: () => DEFAULT_CHEM_EXAMPLES,
  DEFAULT_CHEM_SNIPPETS: () => DEFAULT_CHEM_SNIPPETS,
  DEFAULT_LABELS: () => DEFAULT_LABELS,
  LOCALES: () => LOCALES,
  MathChemModal: () => MathChemModal,
  buildFormulaHtml: () => buildFormulaHtml,
  default: () => index_default,
  extractLatex: () => extractLatex,
  getLabels: () => getLabels,
  install: () => install,
  parsePureCe: () => parsePureCe,
  registerLocale: () => registerLocale,
  resolveLocaleCode: () => resolveLocaleCode,
  serializeFormulas: () => serializeFormulas,
  wrapLatex: () => wrapLatex
});
module.exports = __toCommonJS(index_exports);

// src/locales.js
var DEFAULT_LABELS = {
  title: "Math & Chemistry",
  mathEditorTitle: "Math Editor",
  chemEditorTitle: "Chemistry Editor",
  tabMath: "Math",
  tabChem: "Chemistry",
  latexSource: "LaTeX",
  chemInput: "Chemical formula (mhchem)",
  chemPlaceholder: "H2O + CO2 -> H2CO3",
  preview: "Preview",
  examples: "Examples\u2026",
  snippets: "Quick insert",
  display: "Display mode (own line)",
  insert: "Insert",
  update: "Update",
  cancel: "Cancel",
  close: "Close",
  empty: "Enter a formula first.",
  placeholderLeft: "Fill in or remove the empty placeholders (blue boxes) before saving.",
  invalidFormula: "Invalid formula",
  noMathlive: "MathLive is not loaded. Include the MathLive script before opening the editor.",
  noKatex: "KaTeX is not loaded: live preview is unavailable."
};
var LOCALES = {
  en: DEFAULT_LABELS,
  "pt-br": {
    title: "Matem\xE1tica e Qu\xEDmica",
    mathEditorTitle: "Editor de Matem\xE1tica",
    chemEditorTitle: "Editor de Qu\xEDmica",
    tabMath: "Matem\xE1tica",
    tabChem: "Qu\xEDmica",
    chemInput: "F\xF3rmula qu\xEDmica (mhchem)",
    preview: "Pr\xE9-visualiza\xE7\xE3o",
    examples: "Exemplos\u2026",
    snippets: "Inser\xE7\xE3o r\xE1pida",
    display: "Modo bloco (linha pr\xF3pria)",
    insert: "Inserir",
    update: "Atualizar",
    cancel: "Cancelar",
    close: "Fechar",
    empty: "Digite uma f\xF3rmula primeiro.",
    placeholderLeft: "Preencha ou remova os espa\xE7os vazios (caixas azuis) antes de salvar.",
    invalidFormula: "F\xF3rmula inv\xE1lida",
    noMathlive: "MathLive n\xE3o foi carregado. Inclua o script do MathLive antes de abrir o editor.",
    noKatex: "KaTeX n\xE3o foi carregado: pr\xE9-visualiza\xE7\xE3o indispon\xEDvel."
  },
  pt: {
    title: "Matem\xE1tica e Qu\xEDmica",
    mathEditorTitle: "Editor de Matem\xE1tica",
    chemEditorTitle: "Editor de Qu\xEDmica",
    tabMath: "Matem\xE1tica",
    tabChem: "Qu\xEDmica",
    chemInput: "F\xF3rmula qu\xEDmica (mhchem)",
    preview: "Pr\xE9-visualiza\xE7\xE3o",
    examples: "Exemplos\u2026",
    snippets: "Inser\xE7\xE3o r\xE1pida",
    display: "Modo bloco (linha pr\xF3pria)",
    insert: "Inserir",
    update: "Atualizar",
    cancel: "Cancelar",
    close: "Fechar",
    empty: "Introduza uma f\xF3rmula primeiro.",
    placeholderLeft: "Preencha ou remova os espa\xE7os vazios (caixas azuis) antes de guardar.",
    invalidFormula: "F\xF3rmula inv\xE1lida",
    noMathlive: "O MathLive n\xE3o foi carregado. Inclua o script do MathLive antes de abrir o editor.",
    noKatex: "O KaTeX n\xE3o foi carregado: pr\xE9-visualiza\xE7\xE3o indispon\xEDvel."
  },
  es: {
    title: "Matem\xE1ticas y Qu\xEDmica",
    mathEditorTitle: "Editor de Matem\xE1ticas",
    chemEditorTitle: "Editor de Qu\xEDmica",
    tabMath: "Matem\xE1ticas",
    tabChem: "Qu\xEDmica",
    chemInput: "F\xF3rmula qu\xEDmica (mhchem)",
    preview: "Vista previa",
    examples: "Ejemplos\u2026",
    snippets: "Inserci\xF3n r\xE1pida",
    display: "Modo bloque (l\xEDnea propia)",
    insert: "Insertar",
    update: "Actualizar",
    cancel: "Cancelar",
    close: "Cerrar",
    empty: "Escribe una f\xF3rmula primero.",
    placeholderLeft: "Completa o elimina los espacios vac\xEDos (cajas azules) antes de guardar.",
    invalidFormula: "F\xF3rmula no v\xE1lida",
    noMathlive: "MathLive no est\xE1 cargado. Incluye el script de MathLive antes de abrir el editor.",
    noKatex: "KaTeX no est\xE1 cargado: vista previa no disponible."
  },
  fr: {
    title: "Maths et Chimie",
    mathEditorTitle: "\xC9diteur de math\xE9matiques",
    chemEditorTitle: "\xC9diteur de chimie",
    tabMath: "Maths",
    tabChem: "Chimie",
    chemInput: "Formule chimique (mhchem)",
    preview: "Aper\xE7u",
    examples: "Exemples\u2026",
    snippets: "Insertion rapide",
    display: "Mode bloc (ligne d\xE9di\xE9e)",
    insert: "Ins\xE9rer",
    update: "Mettre \xE0 jour",
    cancel: "Annuler",
    close: "Fermer",
    empty: "Saisissez d\u2019abord une formule.",
    placeholderLeft: "Remplissez ou supprimez les emplacements vides (cases bleues) avant d\u2019enregistrer.",
    invalidFormula: "Formule invalide",
    noMathlive: "MathLive n\u2019est pas charg\xE9. Incluez le script MathLive avant d\u2019ouvrir l\u2019\xE9diteur.",
    noKatex: "KaTeX n\u2019est pas charg\xE9 : aper\xE7u indisponible."
  },
  de: {
    title: "Mathematik & Chemie",
    mathEditorTitle: "Mathematik-Editor",
    chemEditorTitle: "Chemie-Editor",
    tabMath: "Mathematik",
    tabChem: "Chemie",
    chemInput: "Chemische Formel (mhchem)",
    preview: "Vorschau",
    examples: "Beispiele\u2026",
    snippets: "Schnelleinf\xFCgung",
    display: "Blockmodus (eigene Zeile)",
    insert: "Einf\xFCgen",
    update: "Aktualisieren",
    cancel: "Abbrechen",
    close: "Schlie\xDFen",
    empty: "Bitte zuerst eine Formel eingeben.",
    placeholderLeft: "Leere Platzhalter (blaue Felder) vor dem Speichern ausf\xFCllen oder entfernen.",
    invalidFormula: "Ung\xFCltige Formel",
    noMathlive: "MathLive ist nicht geladen. Binden Sie das MathLive-Skript vor dem \xD6ffnen des Editors ein.",
    noKatex: "KaTeX ist nicht geladen: Vorschau nicht verf\xFCgbar."
  },
  it: {
    title: "Matematica e Chimica",
    mathEditorTitle: "Editor di matematica",
    chemEditorTitle: "Editor di chimica",
    tabMath: "Matematica",
    tabChem: "Chimica",
    chemInput: "Formula chimica (mhchem)",
    preview: "Anteprima",
    examples: "Esempi\u2026",
    snippets: "Inserimento rapido",
    display: "Modalit\xE0 blocco (riga propria)",
    insert: "Inserisci",
    update: "Aggiorna",
    cancel: "Annulla",
    close: "Chiudi",
    empty: "Inserisci prima una formula.",
    placeholderLeft: "Compila o rimuovi i segnaposto vuoti (riquadri blu) prima di salvare.",
    invalidFormula: "Formula non valida",
    noMathlive: "MathLive non \xE8 caricato. Includi lo script MathLive prima di aprire l\u2019editor.",
    noKatex: "KaTeX non \xE8 caricato: anteprima non disponibile."
  }
};
var norm = (code) => String(code || "").toLowerCase().replace(/_/g, "-").trim();
function registerLocale(code, labels) {
  LOCALES[norm(code)] = { ...LOCALES[norm(code)] || {}, ...labels };
}
function resolveLocaleCode(code) {
  const c = norm(code);
  if (c && LOCALES[c]) return c;
  const base = c.split("-")[0];
  return base && LOCALES[base] ? base : "en";
}
function getLabels(code, overrides = {}) {
  return { ...DEFAULT_LABELS, ...LOCALES[resolveLocaleCode(code)], ...overrides };
}

// src/modal.js
var DEFAULT_CHEM_SNIPPETS = [
  { label: "H\u2082O", insert: "H2O" },
  { label: "\u2192", insert: " -> " },
  { label: "\u21CC", insert: " <=> " },
  { label: "\u21C4", insert: " <-> " },
  { label: "+", insert: " + " },
  { label: "X\u207F\u207A", insert: "^2+" },
  { label: "X\u207F\u207B", insert: "^2-" },
  { label: "(aq)", insert: "(aq)" },
  { label: "(s)", insert: "(s)" },
  { label: "(l)", insert: "(l)" },
  { label: "(g)", insert: "(g)" },
  { label: "\u2191", insert: " ^" },
  { label: "\u2193", insert: " v" },
  { label: "\u0394", insert: "->[$\\Delta$]" }
];
var DEFAULT_CHEM_EXAMPLES = [
  { label: "H2O + CO2 -> H2CO3", value: "H2O + CO2 -> H2CO3" },
  { label: "CH4 + 2O2 -> CO2 + 2H2O", value: "CH4 + 2O2 -> CO2 + 2H2O" },
  { label: "N2 + 3H2 <=> 2NH3", value: "N2 + 3H2 <=> 2NH3" },
  { label: "SO4^2-", value: "SO4^2-" },
  { label: "Zn^2+ + 2e- -> Zn", value: "Zn^2+ + 2e- -> Zn" },
  { label: "^{227}_{90}Th+", value: "^{227}_{90}Th+" }
];
function parsePureCe(latex) {
  const s = String(latex || "").trim();
  if (!s.startsWith("\\ce{") || !s.endsWith("}")) return null;
  let depth = 0;
  for (let i = 3; i < s.length; i++) {
    const c = s[i];
    if (c === "\\") {
      i++;
      continue;
    }
    if (c === "{") depth++;
    else if (c === "}") {
      depth--;
      if (depth === 0) return i === s.length - 1 ? s.slice(4, -1) : null;
    }
  }
  return null;
}
var h = (tag, props = {}, ...children) => {
  const el = document.createElement(tag);
  for (const [key, val] of Object.entries(props)) {
    if (val == null || val === false) continue;
    if (key === "class") el.className = val;
    else if (key === "text") el.textContent = val;
    else if (key.startsWith("on")) el.addEventListener(key.slice(2).toLowerCase(), val);
    else el.setAttribute(key, val === true ? "" : val);
  }
  for (const child of children.flat()) if (child != null) el.append(child);
  return el;
};
var uid = 0;
var MathChemModal = class {
  constructor(options = {}) {
    this.language = options.language || "en";
    this.theme = options.theme || "light";
    this.setMathliveLocale = options.setMathliveLocale !== false;
    this.labels = getLabels(this.language, options.labels);
    this.snippets = options.chemSnippets || DEFAULT_CHEM_SNIPPETS;
    this.examples = options.chemExamples || DEFAULT_CHEM_EXAMPLES;
    this.katexOptions = options.katexOptions || {};
    this.onSave = options.onSave || (() => {
    });
    this.onClose = options.onClose || (() => {
    });
    this.id = `fmc-${++uid}`;
    this.root = null;
    this.mathfield = null;
    this.isOpen = false;
    this.isEditing = false;
    this.tab = "math";
    this._prevFocus = null;
  }
  create() {
    if (this.root) return this.root;
    const L = this.labels;
    const id = this.id;
    this.tabMathBtn = h("button", { type: "button", role: "tab", class: "fmc-tab", id: `${id}-tab-math`, "aria-controls": `${id}-panel-math`, text: L.tabMath, onClick: () => this.setTab("math") });
    this.tabChemBtn = h("button", { type: "button", role: "tab", class: "fmc-tab", id: `${id}-tab-chem`, "aria-controls": `${id}-panel-chem`, text: L.tabChem, onClick: () => this.setTab("chem") });
    this.mathPanel = h("div", { role: "tabpanel", class: "fmc-panel", id: `${id}-panel-math`, "aria-labelledby": `${id}-tab-math` });
    this.chemPanel = h("div", { role: "tabpanel", class: "fmc-panel", id: `${id}-panel-chem`, "aria-labelledby": `${id}-tab-chem` });
    this._buildMathPanel();
    this._buildChemPanel();
    this.displayInput = h("input", { type: "checkbox", id: `${id}-display` });
    this.errorEl = h("div", { class: "fmc-error", role: "alert", hidden: true });
    this.saveBtn = h("button", { type: "button", class: "fmc-btn fmc-btn-primary", text: L.insert, onClick: () => this.save() });
    const closeBtn = h("button", { type: "button", class: "fmc-close", "aria-label": L.close, text: "\xD7", onClick: () => this.close() });
    this.dialog = h(
      "div",
      { class: "fmc-dialog", role: "dialog", "aria-modal": "true", "aria-labelledby": `${id}-title` },
      h(
        "div",
        { class: "fmc-header" },
        h("h3", { class: "fmc-title", id: `${id}-title`, text: L.title }),
        closeBtn
      ),
      h("div", { class: "fmc-tabs", role: "tablist" }, this.tabMathBtn, this.tabChemBtn),
      h("div", { class: "fmc-body" }, this.mathPanel, this.chemPanel, this.errorEl),
      h(
        "div",
        { class: "fmc-footer" },
        h("label", { class: "fmc-check", for: `${id}-display` }, this.displayInput, h("span", { text: L.display })),
        h(
          "div",
          { class: "fmc-actions" },
          h("button", { type: "button", class: "fmc-btn", text: L.cancel, onClick: () => this.close() }),
          this.saveBtn
        )
      )
    );
    this.root = h("div", { class: `fmc-backdrop fmc-theme-${this.theme}`, hidden: true, lang: this.language.replace("_", "-") }, this.dialog);
    this.root.addEventListener("keydown", (e) => this._onKeydown(e));
    document.body.appendChild(this.root);
    return this.root;
  }
  _buildMathPanel() {
    const L = this.labels;
    const id = this.id;
    this.sourceInput = h("textarea", { class: "fmc-textarea", id: `${id}-source`, rows: "2", spellcheck: "false", autocomplete: "off", autocapitalize: "off" });
    if (window.customElements && window.customElements.get("math-field")) {
      if (this.setMathliveLocale && window.MathfieldElement) {
        try {
          window.MathfieldElement.locale = this.language.toLowerCase().split(/[-_]/)[0];
        } catch (e) {
        }
      }
      this.mathfield = document.createElement("math-field");
      this.mathfield.className = "fmc-mathfield";
      this.mathfield.mathVirtualKeyboardPolicy = "auto";
      this.mathfield.addEventListener("input", () => {
        this.sourceInput.value = this.mathfield.value;
        this._showError("");
      });
      this.sourceInput.addEventListener("input", () => {
        this.mathfield.value = this.sourceInput.value;
        this._showError("");
      });
      this.mathPanel.append(this.mathfield);
    } else {
      this.mathPanel.append(h("div", { class: "fmc-notice", text: L.noMathlive }));
    }
    this.mathPanel.append(
      h("label", { class: "fmc-label", for: `${id}-source`, text: L.latexSource }),
      this.sourceInput
    );
  }
  _buildChemPanel() {
    const L = this.labels;
    const id = this.id;
    this.chemInput = h("textarea", { class: "fmc-textarea fmc-chem-input", id: `${id}-chem`, rows: "2", spellcheck: "false", autocomplete: "off", autocapitalize: "off", placeholder: L.chemPlaceholder });
    this.chemInput.addEventListener("input", () => {
      this._showError("");
      this._renderChemPreview();
    });
    const snippetBar = h(
      "div",
      { class: "fmc-snippets", role: "group", "aria-label": L.snippets },
      this.snippets.map((s) => h("button", { type: "button", class: "fmc-chip", text: s.label, title: s.insert.trim(), onClick: () => this._insertSnippet(s.insert) }))
    );
    const select = h("select", { class: "fmc-select", "aria-label": L.examples, onChange: (e) => {
      if (e.target.value) {
        this.chemInput.value = e.target.value;
        this._renderChemPreview();
      }
      e.target.selectedIndex = 0;
    } }, h("option", { value: "", text: L.examples }), this.examples.map((x) => h("option", { value: x.value, text: x.label })));
    this.chemPreview = h("div", { class: "fmc-preview", "aria-live": "polite" });
    this.chemPanel.append(
      h("label", { class: "fmc-label", for: `${id}-chem`, text: L.chemInput }),
      this.chemInput,
      h("div", { class: "fmc-chem-tools" }, snippetBar, select),
      h("div", { class: "fmc-label", text: L.preview }),
      this.chemPreview
    );
  }
  _insertSnippet(text) {
    var _a, _b;
    const ta = this.chemInput;
    const start = (_a = ta.selectionStart) != null ? _a : ta.value.length;
    const end = (_b = ta.selectionEnd) != null ? _b : ta.value.length;
    ta.value = ta.value.slice(0, start) + text + ta.value.slice(end);
    const pos = start + text.length;
    ta.focus();
    ta.setSelectionRange(pos, pos);
    this._renderChemPreview();
  }
  _renderChemPreview() {
    const body = this.chemInput.value.trim();
    const katex = window.katex;
    this.chemPreview.classList.remove("fmc-preview-error");
    this.chemPreview.textContent = "";
    if (!body) return;
    if (!katex) {
      this.chemPreview.textContent = this.labels.noKatex;
      return;
    }
    try {
      katex.render(`\\ce{${body}}`, this.chemPreview, { ...this.katexOptions, displayMode: true, throwOnError: true });
    } catch (err) {
      this.chemPreview.classList.add("fmc-preview-error");
      this.chemPreview.textContent = String(err.message || err).replace(/^KaTeX parse error:\s*/, "");
    }
  }
  setTab(tab, focus = true) {
    this.tab = tab === "chem" ? "chem" : "math";
    const isMath = this.tab === "math";
    this.mathPanel.hidden = !isMath;
    this.chemPanel.hidden = isMath;
    this.tabMathBtn.setAttribute("aria-selected", String(isMath));
    this.tabChemBtn.setAttribute("aria-selected", String(!isMath));
    this.tabMathBtn.tabIndex = isMath ? 0 : -1;
    this.tabChemBtn.tabIndex = isMath ? -1 : 0;
    this.tabMathBtn.classList.toggle("fmc-tab-active", isMath);
    this.tabChemBtn.classList.toggle("fmc-tab-active", !isMath);
    this._showError("");
    if (!isMath && window.mathVirtualKeyboard) window.mathVirtualKeyboard.hide();
    if (focus) (isMath ? this.mathfield || this.sourceInput : this.chemInput).focus();
    if (!isMath) this._renderChemPreview();
  }
  _showError(msg) {
    this.errorEl.textContent = msg;
    this.errorEl.hidden = !msg;
  }
  open({ latex = "", displayMode = false, tab = "math" } = {}) {
    this.create();
    this.isEditing = Boolean(latex);
    this.saveBtn.textContent = this.isEditing ? this.labels.update : this.labels.insert;
    this.displayInput.checked = Boolean(displayMode);
    const ce = parsePureCe(latex);
    let startTab = tab;
    if (ce !== null) {
      startTab = "chem";
      this.chemInput.value = ce;
    } else {
      this.chemInput.value = "";
    }
    if (ce === null) {
      if (this.mathfield) this.mathfield.value = latex || "";
      this.sourceInput.value = latex || "";
      if (latex) startTab = "math";
    } else {
      if (this.mathfield) this.mathfield.value = "";
      this.sourceInput.value = "";
    }
    this._prevFocus = document.activeElement;
    this.root.hidden = false;
    this.isOpen = true;
    document.documentElement.classList.add("fmc-open");
    this.setTab(startTab);
  }
  getLatex() {
    if (this.tab === "chem") {
      const body = this.chemInput.value.trim();
      return body ? `\\ce{${body}}` : "";
    }
    return (this.mathfield ? this.mathfield.value : this.sourceInput.value).trim();
  }
  _validate(latex, displayMode) {
    if (/\\placeholder\b/.test(latex)) return this.labels.placeholderLeft;
    const katex = window.katex;
    if (!katex) return "";
    try {
      katex.renderToString(latex, { ...this.katexOptions, displayMode, throwOnError: true });
    } catch (err) {
      return `${this.labels.invalidFormula}: ${String(err.message || err).replace(/^KaTeX parse error:\s*/, "")}`;
    }
    return "";
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
    document.documentElement.classList.remove("fmc-open");
    if (window.mathVirtualKeyboard) window.mathVirtualKeyboard.hide();
    if (this._prevFocus && typeof this._prevFocus.focus === "function" && document.contains(this._prevFocus)) {
      try {
        this._prevFocus.focus({ preventScroll: true });
      } catch (e) {
      }
    }
    this._prevFocus = null;
    this.onClose({ saved });
  }
  _focusable() {
    const sel = 'button:not([disabled]):not([tabindex="-1"]), textarea, select, input, math-field';
    return [...this.dialog.querySelectorAll(sel)].filter((el) => !el.closest("[hidden]"));
  }
  _onKeydown(e) {
    if (e.key === "Escape") {
      e.stopPropagation();
      if (e.defaultPrevented) return;
      e.preventDefault();
      const kb = window.mathVirtualKeyboard;
      if (kb && kb.visible) {
        kb.hide();
        return;
      }
      this.close();
    } else if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      this.save();
    } else if (e.key === "Tab") {
      const items = this._focusable();
      if (!items.length) return;
      const first = items[0];
      const last = items[items.length - 1];
      const active = this.root.getRootNode().activeElement;
      if (e.shiftKey && (active === first || !this.dialog.contains(active))) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && active === last) {
        e.preventDefault();
        first.focus();
      }
    } else if ((e.key === "ArrowLeft" || e.key === "ArrowRight") && e.target.getAttribute && e.target.getAttribute("role") === "tab") {
      this.setTab(this.tab === "math" ? "chem" : "math", false);
      (this.tab === "math" ? this.tabMathBtn : this.tabChemBtn).focus();
    }
  }
  destroy() {
    if (this.isOpen) this.close();
    if (this.root && this.root.parentNode) this.root.parentNode.removeChild(this.root);
    this.root = null;
    this.mathfield = null;
  }
};

// src/index.js
var PLUGIN = "mathChemistry";
var SELECTOR = ".math-tex";
var escapeHtml = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
var wrapLatex = (latex, display = false) => display ? `\\[${latex}\\]` : `\\(${latex}\\)`;
function extractLatex(text) {
  const t = String(text || "").trim();
  let m = /^\\\(([\s\S]*)\\\)$/.exec(t);
  if (m) return { latex: m[1].trim(), display: false };
  m = /^\\\[([\s\S]*)\\\]$/.exec(t);
  if (m) return { latex: m[1].trim(), display: true };
  m = /^\$\$([\s\S]*)\$\$$/.exec(t);
  if (m) return { latex: m[1].trim(), display: true };
  return null;
}
function buildFormulaHtml(latex, display = false) {
  const disp = display ? ' data-display="true"' : "";
  return `<span class="math-tex" data-latex="${escapeHtml(latex)}"${disp}>${escapeHtml(wrapLatex(latex, display))}</span>`;
}
var TAG_RE = /<span\b(?:"[^"]*"|'[^']*'|[^>"'])*>|<\/span\s*>/gi;
var CLASS_RE = /\sclass\s*=\s*(?:"([^"]*)"|'([^']*)')/i;
var CE_RE = /\scontenteditable\s*=\s*(?:"[^"]*"|'[^']*')/i;
function tagAttr(tag, name) {
  const m = new RegExp(`\\s${name}\\s*=\\s*(?:"([^"]*)"|'([^']*)')`, "i").exec(tag);
  return m ? m[1] !== void 0 ? m[1] : m[2] : null;
}
function serializeFormulas(html) {
  const re = new RegExp(TAG_RE.source, "gi");
  let out = "";
  let last = 0;
  let start = -1;
  let depth = 0;
  let open = "";
  let m;
  while (m = re.exec(html)) {
    const tok = m[0];
    const closing = tok.charAt(1) === "/";
    if (start === -1) {
      if (closing) continue;
      const cls = CLASS_RE.exec(tok);
      if (cls && /(^|\s)math-tex(\s|$)/.test(cls[1] !== void 0 ? cls[1] : cls[2])) {
        start = m.index;
        open = tok;
        depth = 1;
      }
      continue;
    }
    depth += closing ? -1 : 1;
    if (depth > 0) continue;
    const latex = tagAttr(open, "data-latex");
    if (latex !== null) {
      const display = tagAttr(open, "data-display") === "true";
      out += html.slice(last, start) + open.replace(CE_RE, "") + wrapLatex(latex, display) + tok;
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
  if (!tr["Math Editor"]) tr["Math Editor"] = labels.mathEditorTitle;
  if (!tr["Chemistry Editor"]) tr["Chemistry Editor"] = labels.chemEditorTitle;
}
function registerQuickInsert(FE) {
  if (typeof FE.RegisterQuickInsertButton !== "function") return;
  const registered = FE.QUICK_INSERT_BUTTONS || {};
  if (!registered.mathEditor) {
    FE.RegisterQuickInsertButton("mathEditor", {
      icon: "mathEditor",
      requiredPlugin: PLUGIN,
      title: "Math Editor",
      undo: false,
      callback() {
        this.mathChemistry.open("math");
      }
    });
  }
  if (!registered.chemEditor) {
    FE.RegisterQuickInsertButton("chemEditor", {
      icon: "chemEditor",
      requiredPlugin: PLUGIN,
      title: "Chemistry Editor",
      undo: false,
      callback() {
        this.mathChemistry.open("chem");
      }
    });
  }
}
function install(FE) {
  FE = FE || (typeof window !== "undefined" ? window.FroalaEditor : null);
  if (!FE) throw new Error("[froala-math-chemistry] FroalaEditor not found. Load Froala before the plugin or call install(FroalaEditor).");
  if (FE.PLUGINS[PLUGIN]) return FE;
  Object.keys(FE.LANGUAGE || {}).forEach((key) => translateTitles(FE, key, getLabels(key)));
  Object.assign(FE.DEFAULTS, {
    mathChemistryRender: true,
    mathChemistryKatexOptions: { throwOnError: false },
    mathChemistryLanguage: null,
    mathChemistryTheme: "light",
    mathChemistryMathliveLocale: true,
    mathChemistryLabels: {},
    mathChemistryChemSnippets: null,
    mathChemistryChemExamples: null
  });
  const svg = (cls) => `<svg class="${cls}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="[PATH]"/></svg>`;
  FE.DefineIconTemplate("fmcIcon", svg("fmc-icon"));
  FE.DefineIcon("mathEditor", { NAME: "mathEditor", template: "fmcIcon", PATH: "M18 4H6v2l6.5 6L6 18v2h12v-3h-7l5-5-5-5h7z" });
  FE.DefineIcon("chemEditor", { NAME: "chemEditor", template: "fmcIcon", PATH: "M19.8 18.4L14 10.67V6.5l1.35-1.69c.26-.33.03-.81-.39-.81H9.04c-.42 0-.65.48-.39.81L10 6.5v4.17L4.2 18.4c-.49.66-.02 1.6.8 1.6h14c.82 0 1.29-.94.8-1.6z" });
  FE.PLUGINS[PLUGIN] = function(editor) {
    let modal = null;
    let target = null;
    let restoreSelection = false;
    let observer = null;
    let repairing = false;
    const signatures = /* @__PURE__ */ new WeakMap();
    const signature = (el) => `${el.getElementsByTagName("*").length}:${el.querySelectorAll("[style]").length}`;
    const win = () => editor.win || editor.o_win || window;
    const doc = () => editor.doc || editor.o_doc || document;
    function syncIframeStyles() {
      const target2 = doc();
      if (!editor.opts.iframe || target2 === document || !target2.head) return;
      document.querySelectorAll('link[rel="stylesheet"]').forEach((link) => {
        if (!/katex|froala-math-chemistry/i.test(link.href)) return;
        if ([...target2.head.querySelectorAll("link")].some((l) => l.href === link.href)) return;
        target2.head.appendChild(link.cloneNode(true));
      });
    }
    function renderElement(el) {
      let latex = el.getAttribute("data-latex");
      let display = el.getAttribute("data-display") === "true";
      if (latex == null) {
        const parsed = extractLatex(el.textContent);
        if (!parsed) return;
        latex = parsed.latex;
        display = parsed.display;
        el.setAttribute("data-latex", latex);
        if (display) el.setAttribute("data-display", "true");
      }
      el.setAttribute("contenteditable", "false");
      const katex = window.katex;
      if (!editor.opts.mathChemistryRender || !katex) return;
      if (el.querySelector(".katex")) {
        if (signatures.get(el) === signature(el)) return;
        el.textContent = "";
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
      if (typeof html !== "string" || html.indexOf("math-tex") === -1) return html;
      if (html.indexOf("katex") === -1 && html.indexOf("contenteditable") === -1) return html;
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
      if (!el.nextSibling) el.after(doc().createTextNode("\xA0"));
    }
    function applySave({ latex, displayMode }) {
      if (restoreSelection) {
        editor.selection.restore();
        restoreSelection = false;
      }
      editor.undo.saveStep();
      if (target && editor.el.contains(target)) {
        target.setAttribute("data-latex", latex);
        if (displayMode) target.setAttribute("data-display", "true");
        else target.removeAttribute("data-display");
        target.textContent = wrapLatex(latex, displayMode);
        renderElement(target);
        ensureTrailing(target);
      } else {
        const html = buildFormulaHtml(latex, displayMode).replace("<span ", '<span data-fmc-new="1" ');
        editor.html.insert(html);
        const el = editor.el.querySelector("[data-fmc-new]");
        if (el) {
          el.removeAttribute("data-fmc-new");
          renderElement(el);
          ensureTrailing(el);
        }
        renderAll();
      }
      target = null;
      editor.undo.saveStep();
      editor.events.trigger("contentChanged");
    }
    function handleClose() {
      if (restoreSelection) {
        editor.selection.restore();
        restoreSelection = false;
      }
      target = null;
    }
    function language() {
      return resolveLocaleCode(editor.opts.mathChemistryLanguage || editor.opts.language || document.documentElement.lang || "en");
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
    function open(tab = "math", el = null) {
      target = el || selectedFormula();
      if (!editor.core.hasFocus()) editor.events.focus(true);
      editor.selection.save();
      restoreSelection = true;
      let latex = "";
      let displayMode = false;
      if (target) {
        latex = target.getAttribute("data-latex") || "";
        displayMode = target.getAttribute("data-display") === "true";
      }
      getModal().open({ latex, displayMode, tab: target && parsePureCe(latex) !== null ? "chem" : tab });
    }
    function _init() {
      if (!editor.$el) return;
      translateTitles(FE, editor.opts.language, getLabels(language(), editor.opts.mathChemistryLabels));
      registerQuickInsert(FE);
      editor.events.on("initialized", () => {
        syncIframeStyles();
        renderAll();
      });
      editor.events.on("html.set", renderAll);
      editor.events.on("html.get", serialize);
      editor.events.on("commands.after", (cmd) => {
        if (cmd === "undo" || cmd === "redo") renderAll();
      });
      editor.events.$on(editor.$el, "click", SELECTOR, (e) => {
        if (e.shiftKey || e.ctrlKey || e.metaKey || e.altKey) return;
        const el = formulaFromNode(e.target);
        if (el) selectNode(el);
      });
      editor.events.$on(editor.$el, "dblclick", SELECTOR, (e) => {
        const el = formulaFromNode(e.target);
        if (!el) return;
        e.preventDefault();
        e.stopPropagation();
        open("math", el);
      });
      if (typeof MutationObserver !== "undefined") {
        observer = new MutationObserver(repair);
        observer.observe(editor.el, { childList: true, subtree: true, attributes: true, attributeFilter: ["style", "class"] });
      }
      editor.events.on("destroy", () => {
        if (observer) observer.disconnect();
        observer = null;
        if (modal) modal.destroy();
        modal = null;
      }, true);
    }
    return { _init, open, renderAll };
  };
  FE.RegisterCommand("mathEditor", {
    title: "Math Editor",
    undo: false,
    focus: false,
    refreshAfterCallback: false,
    plugin: PLUGIN,
    callback() {
      this.mathChemistry.open("math");
    }
  });
  FE.RegisterCommand("chemEditor", {
    title: "Chemistry Editor",
    undo: false,
    focus: false,
    refreshAfterCallback: false,
    plugin: PLUGIN,
    callback() {
      this.mathChemistry.open("chem");
    }
  });
  registerQuickInsert(FE);
  return FE;
}
if (typeof window !== "undefined" && window.FroalaEditor) install(window.FroalaEditor);
var index_default = install;

  return module.exports;
});
