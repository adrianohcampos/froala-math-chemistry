# Froala Math & Chemistry Plugin

[![npm version](https://img.shields.io/npm/v/froala-math-chemistry.svg)](https://www.npmjs.com/package/froala-math-chemistry)
[![license](https://img.shields.io/github/license/adrianohcampos/froala-math-chemistry.svg)](./LICENSE)
[![build](https://img.shields.io/github/actions/workflow/status/adrianohcampos/froala-math-chemistry/build.yml?branch=main)](https://github.com/adrianohcampos/froala-math-chemistry/actions)

Open-source alternative to Wiris / MathType for [Froala Editor](https://froala.com/wysiwyg-editor/) v3/v4. Visual formula input with [MathLive](https://cortexjs.io/mathlive/), chemistry with `mhchem`, client-side rendering with [KaTeX](https://katex.org/).

## Introduction

Features:

- `mathEditor` toolbar button: MathLive visual editor + virtual keyboard + editable LaTeX source.
- `chemEditor` toolbar button: `\ce{...}` (mhchem) input with quick-insert chips, examples and live KaTeX preview.
- Edit existing formulas by double-clicking them (or selecting one and clicking the toolbar button).
- Inline or display mode (`\( ... \)` / `\[ ... \]`).
- Clean HTML payload: `<span class="math-tex" data-latex="...">\( ... \)</span>`. Rendered in the editor, saved as plain LaTeX.
- Backend agnostic (Laravel, Node, PHP, ...), no build step required, keyboard accessible, responsive.

## Requirements

- Froala Editor >= 3 (a valid [Froala license](https://froala.com/wysiwyg-editor/pricing/) is required for production use)
- MathLive >= 0.100 (input UI)
- KaTeX >= 0.16 with `mhchem` and `auto-render` (rendering)

## Installation

### NPM

```bash
npm install froala-math-chemistry froala-editor mathlive katex
```

```js
import FroalaEditor from 'froala-editor';
import 'mathlive';
import katex from 'katex';
import 'katex/contrib/mhchem';
import install from 'froala-math-chemistry';
import 'froala-math-chemistry/style.css';

window.katex = katex;
install(FroalaEditor);
```

### CDN

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/froala-editor@4/css/froala_editor.pkgd.min.css">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/katex.min.css">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/froala-math-chemistry/dist/froala-math-chemistry.min.css">

<script src="https://cdn.jsdelivr.net/npm/froala-editor@4/js/froala_editor.pkgd.min.js"></script>
<script src="https://unpkg.com/mathlive"></script>
<script src="https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/katex.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/contrib/mhchem.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/contrib/auto-render.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/froala-math-chemistry/dist/froala-math-chemistry.umd.min.js"></script>
```

The plugin registers itself automatically when `window.FroalaEditor` exists.

## Usage

### Editor setup

```js
new FroalaEditor('#editor', {
  licenseKey: 'YOUR_FROALA_LICENSE_KEY',
  toolbarButtons: ['bold', 'italic', '|', 'mathEditor', 'chemEditor', '|', 'html']
});
```

Do not set `htmlAllowedAttrs: ['.*']`: it disables Froala's attribute sanitization (allowing `onerror=`, `onclick=`, ...). Froala's defaults already keep the `class`, `data-latex`, `data-display` and `contenteditable` attributes used by this plugin.

### Quick Insert

`mathEditor` and `chemEditor` are also registered as Quick Insert buttons (the `+` shown on empty lines). Add them to `quickInsertButtons`:

```js
new FroalaEditor('#editor', {
  quickInsertButtons: ['mathEditor', 'chemEditor', 'image', 'table', 'ul', 'ol', 'hr']
});
```

### Rendering saved content

```js
renderMathInElement(document.getElementById('content'), {
  delimiters: [
    { left: '\\(', right: '\\)', display: false },
    { left: '\\[', right: '\\]', display: true }
  ],
  throwOnError: false
});
```

Run the demos: `npm install && npm start`, then open:

- `http://localhost:3000/demo/` – basic demo using `src/` (no build needed).
- `http://localhost:3000/demo/dist.html` – realistic example using the built `dist/` files (question bank: create, edit and render saved content, pt-BR).

### Options

| Option | Default | Description |
| --- | --- | --- |
| `mathChemistryRender` | `true` | Render formulas with KaTeX inside the editor. |
| `mathChemistryKatexOptions` | `{ throwOnError: false }` | Options passed to `katex.render`. |
| `mathChemistryLanguage` | `null` | UI language (`en`, `pt-BR`, `pt`, `es`, `fr`, `de`, `it`). Falls back to Froala's `language`, then `<html lang>`, then `en`. |
| `mathChemistryTheme` | `'light'` | Modal theme: `'light'`, `'dark'` or `'auto'` (follows `prefers-color-scheme`). |
| `mathChemistryMathliveLocale` | `true` | Also set MathLive's keyboard/tooltips language. MathLive only supports a global locale (`MathfieldElement.locale`), so this affects every `<math-field>` on the page. Set `false` to leave it untouched. |
| `mathChemistryLabels` | `{}` | Override individual UI strings (see `DEFAULT_LABELS` in `src/locales.js`). |
| `mathChemistryChemSnippets` | built-in | Array of `{ label, insert }` quick-insert chips. |
| `mathChemistryChemExamples` | built-in | Array of `{ label, value }` examples. |

### Languages (i18n)

Built-in: English, Português (BR/PT), Español, Français, Deutsch, Italiano. Region codes fall back to the base language (`es_MX` → `es`). Add or extend a language:

```js
FroalaMathChemistry.registerLocale('ja', {
  title: '数学と化学',
  mathEditorTitle: '数式エディタ',
  chemEditorTitle: '化学式エディタ',
  tabMath: '数学',
  tabChem: '化学',
  insert: '挿入',
  cancel: 'キャンセル'
});

new FroalaEditor('#editor', { mathChemistryLanguage: 'ja' });
```

Missing keys fall back to English. The MathLive keyboard locale follows the same language (see `mathChemistryMathliveLocale`).

To translate the toolbar tooltips, load Froala's language file (e.g. `js/languages/pt_br.js`) **before** this plugin and set Froala's `language` option.

### Script load order and compatibility

- Load Froala, its language files and Froala plugins (including `quick_insert`) before this plugin. With the `pkgd` bundle this is automatic.
- `iframe: true` is supported: KaTeX/plugin stylesheets (`<link>` whose URL contains `katex` or `froala-math-chemistry`) are copied into the iframe. For other setups use Froala's `iframeStyleFiles`.
- `toolbarInline: true` works as the modal is independent from the toolbar.
- TypeScript types are provided in `index.d.ts` (`MathChemistryOptions` describes the extra Froala options).
- The CDN links above and the npm badge only resolve after the package is published to npm.

### Laravel / Blade

```blade
{{-- resources/views/layouts/app.blade.php --}}
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/froala-editor@4/css/froala_editor.pkgd.min.css">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/katex.min.css">
<link rel="stylesheet" href="{{ asset('vendor/froala-math-chemistry/froala-math-chemistry.min.css') }}">

{{-- resources/views/posts/edit.blade.php --}}
<form method="POST" action="{{ route('posts.update', $post) }}">
  @csrf @method('PUT')
  <textarea id="editor" name="body">{{ old('body', $post->body) }}</textarea>
  <button type="submit">Save</button>
</form>

@push('scripts')
<script src="https://cdn.jsdelivr.net/npm/froala-editor@4/js/froala_editor.pkgd.min.js"></script>
<script src="https://unpkg.com/mathlive"></script>
<script src="https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/katex.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/contrib/mhchem.min.js"></script>
<script src="{{ asset('vendor/froala-math-chemistry/froala-math-chemistry.umd.min.js') }}"></script>
<script>
  new FroalaEditor('#editor', {
    licenseKey: @json(config('services.froala.key')),
    toolbarButtons: ['bold', 'italic', '|', 'mathEditor', 'chemEditor', '|', 'html']
  });
</script>
@endpush

{{-- resources/views/posts/show.blade.php --}}
<div id="content">{!! clean($post->body) !!}</div>

@push('scripts')
<script src="https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/katex.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/contrib/mhchem.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/contrib/auto-render.min.js"></script>
<script>
  renderMathInElement(document.getElementById('content'), {
    delimiters: [
      { left: '\\(', right: '\\)', display: false },
      { left: '\\[', right: '\\]', display: true }
    ]
  });
</script>
@endpush
```

Keep the Froala key in `.env` / `config/services.php`; never commit it. Always sanitize stored HTML server-side (e.g. HTMLPurifier / `mews/purifier`). Purifiers usually strip `data-*` attributes. That is safe for display: the `\( ... \)` text inside `span.math-tex` is kept and `renderMathInElement` renders it. Only if you need to re-edit formulas from sanitized HTML must you allow `class`, `data-latex` and `data-display` on `span` (HTMLPurifier needs a custom definition for the `data-*` attributes).

## Contributing

1. Fork and create a feature branch.
2. `npm install`, then `npm start` to test via the demo.
3. `npm test` rebuilds `dist/` and runs the unit tests (`test/unit.test.mjs`, Node's built-in test runner). Commit the regenerated `dist/`; CI fails if it is out of date.
4. Open a pull request describing the change.

Changes are tracked in [CHANGELOG.md](./CHANGELOG.md).

## License

[MIT](./LICENSE)
