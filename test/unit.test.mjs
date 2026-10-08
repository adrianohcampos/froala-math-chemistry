import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import * as lib from '../dist/froala-math-chemistry.esm.mjs';

const {
  wrapLatex, extractLatex, buildFormulaHtml, serializeFormulas, parsePureCe,
  getLabels, resolveLocaleCode, registerLocale, LOCALES, DEFAULT_LABELS, install
} = lib;

describe('wrapLatex / extractLatex', () => {
  test('wraps inline and display', () => {
    assert.equal(wrapLatex('x^2'), '\\(x^2\\)');
    assert.equal(wrapLatex('x^2', true), '\\[x^2\\]');
  });

  test('extracts supported delimiters', () => {
    assert.deepEqual(extractLatex('\\( a+b \\)'), { latex: 'a+b', display: false });
    assert.deepEqual(extractLatex('\\[a\\]'), { latex: 'a', display: true });
    assert.deepEqual(extractLatex('$$a$$'), { latex: 'a', display: true });
  });

  test('returns null for plain text or empty input', () => {
    assert.equal(extractLatex('hello'), null);
    assert.equal(extractLatex(''), null);
    assert.equal(extractLatex(null), null);
  });
});

describe('buildFormulaHtml', () => {
  test('escapes attribute and text content', () => {
    const html = buildFormulaHtml('a<b & "c"');
    assert.ok(html.includes('data-latex="a&lt;b &amp; &quot;c&quot;"'));
    assert.ok(html.includes('>\\(a&lt;b &amp; &quot;c&quot;\\)</span>'));
    assert.ok(!html.includes('data-display'));
  });

  test('marks display mode', () => {
    const html = buildFormulaHtml('x', true);
    assert.ok(html.includes('data-display="true"'));
    assert.ok(html.includes('\\[x\\]'));
  });
});

describe('parsePureCe', () => {
  test('returns the body of a pure \\ce{}', () => {
    assert.equal(parsePureCe('\\ce{H2O + CO2 -> H2CO3}'), 'H2O + CO2 -> H2CO3');
    assert.equal(parsePureCe('  \\ce{A}  '), 'A');
    assert.equal(parsePureCe('\\ce{^{227}_{90}Th+}'), '^{227}_{90}Th+');
  });

  test('rejects mixed or malformed input', () => {
    assert.equal(parsePureCe('\\ce{A}+\\ce{B}'), null);
    assert.equal(parsePureCe('x + \\ce{A}'), null);
    assert.equal(parsePureCe('\\ce{A'), null);
    assert.equal(parsePureCe('\\frac{1}{2}'), null);
    assert.equal(parsePureCe(''), null);
    assert.equal(parsePureCe(null), null);
  });

  test('respects escaped braces', () => {
    assert.equal(parsePureCe('\\ce{a\\}b}'), 'a\\}b');
  });
});

describe('serializeFormulas', () => {
  const rendered = (attrs, inner = '<span class="katex"><span class="katex-html"><span class="base">q</span></span></span>') =>
    `<span class="math-tex"${attrs} contenteditable="false">${inner}</span>`;

  test('replaces rendered KaTeX DOM with plain LaTeX and drops contenteditable', () => {
    const out = serializeFormulas(`<p>a ${rendered(' data-latex="x^2"')} b</p>`);
    assert.equal(out, '<p>a <span class="math-tex" data-latex="x^2">\\(x^2\\)</span> b</p>');
  });

  test('supports display mode', () => {
    const out = serializeFormulas(rendered(' data-latex="x" data-display="true"'));
    assert.equal(out, '<span class="math-tex" data-latex="x" data-display="true">\\[x\\]</span>');
  });

  test('handles several formulas and leaves other spans untouched', () => {
    const html = `<p><span class="other">k</span>${rendered(' data-latex="a"')}<span><b>x</b></span>${rendered(' data-latex="b"')}</p>`;
    assert.equal(
      serializeFormulas(html),
      '<p><span class="other">k</span><span class="math-tex" data-latex="a">\\(a\\)</span><span><b>x</b></span><span class="math-tex" data-latex="b">\\(b\\)</span></p>'
    );
  });

  test('handles a formula nested inside another span', () => {
    const out = serializeFormulas(`<span class="fr-x">${rendered(' data-latex="a"')}</span>`);
    assert.equal(out, '<span class="fr-x"><span class="math-tex" data-latex="a">\\(a\\)</span></span>');
  });

  test('keeps escaped entities and ">" inside quoted attributes', () => {
    const out = serializeFormulas(rendered(' data-latex="a&lt;b&gt;c -&gt; d"'));
    assert.equal(out, '<span class="math-tex" data-latex="a&lt;b&gt;c -&gt; d">\\(a&lt;b&gt;c -&gt; d\\)</span>');
    const raw = serializeFormulas(rendered(' data-latex="a -> b"'));
    assert.equal(raw, '<span class="math-tex" data-latex="a -> b">\\(a -> b\\)</span>');
  });

  test('leaves formulas without data-latex untouched', () => {
    const html = '<span class="math-tex"><span>z</span></span>';
    assert.equal(serializeFormulas(html), html);
  });

  test('is idempotent and round-trips buildFormulaHtml', () => {
    const plain = buildFormulaHtml('\\ce{H2O}', false);
    assert.equal(serializeFormulas(plain), plain);
    const once = serializeFormulas(rendered(' data-latex="x"'));
    assert.equal(serializeFormulas(once), once);
  });

  test('does not touch content without formulas', () => {
    const html = '<p>hello <span class="a">w</span></p>';
    assert.equal(serializeFormulas(html), html);
  });
});

describe('locales', () => {
  test('resolves region codes and unknown languages', () => {
    assert.equal(resolveLocaleCode('pt_BR'), 'pt-br');
    assert.equal(resolveLocaleCode('pt-BR'), 'pt-br');
    assert.equal(resolveLocaleCode('es_MX'), 'es');
    assert.equal(resolveLocaleCode('xx'), 'en');
    assert.equal(resolveLocaleCode(null), 'en');
  });

  test('every built-in locale defines only known keys and the required ones', () => {
    const known = new Set(Object.keys(DEFAULT_LABELS));
    for (const [code, labels] of Object.entries(LOCALES)) {
      for (const key of Object.keys(labels)) assert.ok(known.has(key), `${code}: unknown key ${key}`);
      for (const key of ['title', 'tabMath', 'tabChem', 'insert', 'update', 'cancel', 'close', 'empty', 'placeholderLeft', 'invalidFormula', 'mathEditorTitle', 'chemEditorTitle']) {
        assert.ok(labels[key] && labels[key].length, `${code}: missing ${key}`);
      }
    }
  });

  test('getLabels merges defaults, locale and overrides', () => {
    const labels = getLabels('pt-BR', { insert: 'Add' });
    assert.equal(labels.insert, 'Add');
    assert.equal(labels.cancel, 'Cancelar');
    assert.equal(labels.latexSource, DEFAULT_LABELS.latexSource);
  });

  test('registerLocale adds a language with English fallback', () => {
    registerLocale('ja', { insert: '挿入' });
    const labels = getLabels('ja_JP');
    assert.equal(labels.insert, '挿入');
    assert.equal(labels.cancel, DEFAULT_LABELS.cancel);
  });
});

describe('install()', () => {
  const makeFE = () => {
    const calls = { commands: [], icons: [], quick: [] };
    const FE = {
      PLUGINS: {},
      DEFAULTS: {},
      LANGUAGE: { pt_br: { translation: {} } },
      QUICK_INSERT_BUTTONS: {},
      DefineIconTemplate() {},
      DefineIcon(name) { calls.icons.push(name); },
      RegisterCommand(name, opts) { calls.commands.push([name, opts]); },
      RegisterQuickInsertButton(name) { calls.quick.push(name); FE.QUICK_INSERT_BUTTONS[name] = true; }
    };
    return { FE, calls };
  };

  test('throws without Froala', () => {
    assert.throws(() => install(null), /FroalaEditor not found/);
  });

  test('registers plugin, commands, icons, quick insert, defaults and titles', () => {
    const { FE, calls } = makeFE();
    install(FE);
    assert.equal(typeof FE.PLUGINS.mathChemistry, 'function');
    assert.deepEqual(calls.commands.map(([n]) => n), ['mathEditor', 'chemEditor']);
    assert.deepEqual(calls.icons, ['mathEditor', 'chemEditor']);
    assert.deepEqual(calls.quick, ['mathEditor', 'chemEditor']);
    assert.equal(FE.DEFAULTS.mathChemistryRender, true);
    assert.equal(FE.DEFAULTS.mathChemistryTheme, 'light');
    assert.equal(FE.LANGUAGE.pt_br.translation['Math Editor'], 'Editor de Matemática');
    assert.equal(FE.LANGUAGE.pt_br.translation['Chemistry Editor'], 'Editor de Química');
  });

  test('is idempotent', () => {
    const { FE, calls } = makeFE();
    install(FE);
    install(FE);
    assert.equal(calls.commands.length, 2);
  });

  test('registers quick insert buttons only once and skips when unavailable', () => {
    const { FE } = makeFE();
    delete FE.RegisterQuickInsertButton;
    install(FE);
    assert.deepEqual(FE.QUICK_INSERT_BUTTONS, {});
  });
});
