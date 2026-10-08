import { build, transform } from 'esbuild';
import { mkdir, readFile, writeFile } from 'node:fs/promises';

const NAME = 'froala-math-chemistry';
const GLOBAL = 'FroalaMathChemistry';

const umd = (code) => `(function (root, factory) {
  if (typeof define === 'function' && define.amd) define([], factory);
  else if (typeof module === 'object' && module.exports) module.exports = factory();
  else root.${GLOBAL} = factory();
})(typeof self !== 'undefined' ? self : this, function () {
  var module = { exports: {} }, exports = module.exports;
${code}
  return module.exports;
});
`;

await mkdir('dist', { recursive: true });

const common = { entryPoints: ['src/index.js'], bundle: true, write: false, target: 'es2019', legalComments: 'none' };

const esm = await build({ ...common, format: 'esm' });
const cjs = await build({ ...common, format: 'cjs' });
const cjsMin = await build({ ...common, format: 'cjs', minify: true });
const esmMin = await build({ ...common, format: 'esm', minify: true });

await writeFile(`dist/${NAME}.esm.mjs`, esm.outputFiles[0].text);
await writeFile(`dist/${NAME}.esm.min.mjs`, esmMin.outputFiles[0].text);
await writeFile(`dist/${NAME}.umd.js`, umd(cjs.outputFiles[0].text));
await writeFile(`dist/${NAME}.umd.min.js`, umd(cjsMin.outputFiles[0].text));

const css = await readFile('src/styles.css', 'utf8');
await writeFile(`dist/${NAME}.css`, css);
await writeFile(`dist/${NAME}.min.css`, (await transform(css, { loader: 'css', minify: true })).code);

console.log('Build complete: dist/');
