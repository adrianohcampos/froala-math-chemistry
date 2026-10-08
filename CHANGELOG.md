# Changelog

## [1.3.1] - 2026-10-08

- Tests: 24 unit tests (`npm test`) for LaTeX helpers, `\ce{}` parsing, formula serialization, locales and plugin registration.
- CI: runs tests on Node 20/22 and fails when `dist/` is out of date.
- Exports `parsePureCe`, `getLabels` and `resolveLocaleCode`.

## [1.3.0] - 2026-10-08

- New: `mathChemistryTheme` (`light` | `dark` | `auto`) replaces the previous dead dark-mode CSS.
- New: `mathChemistryMathliveLocale` option; MathLive locale is documented as global.
- New: TypeScript declarations (`index.d.ts`).
- Fix: `iframe: true` (selection/range now use the editor window; KaTeX styles are copied into the iframe).
- Fix: Shift/Ctrl/Alt/Meta+click on a formula no longer replaces the selection.
- Fix: Quick Insert buttons are also registered when the plugin loads before `quick_insert`.
- Fix: `--keyboard-zindex` is only applied to the page while the modal is open.
- Docs: load order, compatibility and publication notes.

## [1.2.1] - 2026-10-08

- Fix: formulas are validated with KaTeX before saving; leftover MathLive `\placeholder{}` and invalid LaTeX now show an error in the modal.
- Fix: `html.get` serialization no longer parses HTML through the DOM (inert, faster, skipped when nothing needs cleaning).
- Fix: a trailing text node is added after a formula at the end of a block, so the cursor can leave it (display mode included).
- Fix: Escape closes the MathLive virtual keyboard first instead of discarding the dialog.
- Docs: removed `htmlAllowedAttrs: ['.*']` from examples; demos sanitize rendered HTML.

## [1.2.0] - 2026-10-08

- Quick Insert support: `mathEditor` and `chemEditor` can be used in `quickInsertButtons`.

## [1.1.1] - 2026-10-08

- Fix: formulas lost their layout after pressing Enter (Froala removed KaTeX's empty/styled spans). Damaged formulas are now re-rendered automatically.

## [1.1.0] - 2026-10-08

- i18n: built-in en, pt-BR, pt, es, fr, de, it; `mathChemistryLanguage` option; `registerLocale()` API.

## [1.0.0] - 2026-10-08

- Initial release: `mathEditor` and `chemEditor` toolbar buttons, MathLive modal, mhchem tab with live KaTeX preview, formula editing via double-click, `span.math-tex` HTML output.
