<div align="center">
  <img src="https://raw.githubusercontent.com/igorskyflyer/npm-astro-render-component/main/assets/astro-render-component.png" alt="Icon of Astro Render Component" width="256" height="256">
<h1 align="center">Astro Render Component</h1>
</div>

<br>

<div align="center">
  🤖 Plug-and-play Astro component renderer for fast, zero-config testing in any DOM-like JS/TS environment. 🐬
</div>

<br>
<br>

## 📃 Table of Contents

- [Features](#-features)
- [Usage](#-usage)
- [Example](#️-example)
- [Changelog](#-changelog)
- [Support](#-support)
- [License](#-license)
- [Related](#-related)
- [Author](#-author)

---

## 🤖 Features

- 🔧 Server-side rendering of Astro components in non-Astro environments like Vitest or Node.js
- 🧪 Test-friendly API for rendering `.astro` components with props, slots, and hydration strategies
- 🪄 Zero-config usage—just import and render, no need for full Astro setup
- 🧩 Supports static, lazy, and client-only hydration modes
- 🧠 Typed API with JSDoc annotations for IntelliSense and DX-first workflows
- 🕸️ Compatible with Astro v5+, leveraging the experimental [AstroContainer API](https://docs.astro.build/en/reference/container-reference/)
- 🚀 Ideal for unit and integration testing of UI components

---

## 🕵🏼 Usage

Install the package using your favorite package manager:

```bash
npm install "@igor.dvlpr/astro-render-component"
# or
pnpm add "@igor.dvlpr/astro-render-component"
# or
yarn add "@igor.dvlpr/astro-render-component"
```  

Bring your own testing framework, e.g. [Vitest](https://vitest.dev/) and your own DOM-like environment, e.g. [Happy-Dom](https://www.npmjs.com/package/happy-dom) and start rendering your Astro components in order to test them.

---

## 🗒️ Example

```ts
// @​vitest-environment happy-dom
import { renderAstroComponent } from '@igor.dvlpr/astro-render-component'
import MyComponent from '../components/MyComponent.astro'
import { expect } from 'vitest'

const fragment = await renderAstroComponent(MyComponent, { props: { title: 'Hello' } })
expect(fragment.querySelector('h1')?.textContent).toBe('Hello')
```

---

## 📝 Changelog

📑 The changelog is available here: [CHANGELOG.md](https://github.com/igorskyflyer/npm-astro-render-component/blob/main/CHANGELOG.md).

---

## 🪪 License

Licensed under the MIT license which is available here, [MIT license](https://github.com/igorskyflyer/npm-astro-render-component/blob/main/LICENSE.txt).

---

## 💖 Support

<div align="center">
  I work hard for every project, including this one and your support means a lot to me!
  <br>
  Consider buying me a coffee. ☕
  <br>
  <br>
  <a href="https://ko-fi.com/igorskyflyer" target="_blank"><img src="https://raw.githubusercontent.com/igorskyflyer/igorskyflyer/main/assets/ko-fi.png" alt="Donate to igorskyflyer" width="180" height="46"></a>
  <br>
  <br>
  <em>Thank you for supporting my efforts!</em> 🙏😊
</div>

---

## 🧬 Related

[@igor.dvlpr/astro-easynav-button](https://www.npmjs.com/package/@igor.dvlpr/astro-easynav-button)

> _🧭 Add an easy-to-use navigational button (jump to top/bottom) to your Astro site. 🔼_

<br>

[@igor.dvlpr/astro-post-excerpt](https://www.npmjs.com/package/@igor.dvlpr/astro-post-excerpt)

> _⭐ An Astro component that renders post excerpts for your Astro blog - directly from your Markdown and MDX files. Astro v2+ collections are supported as well! 💎_

<br>

[@igor.dvlpr/chars-in-string](https://www.npmjs.com/package/@igor.dvlpr/chars-in-string)

> _🪐 Provides ways of testing whether an array of chars is present inside a given String. ☄_

<br>

[@igor.dvlpr/magic-queryselector](https://www.npmjs.com/package/@igor.dvlpr/magic-queryselector)

> _🪄 A TypeScript-types patch for querySelector/querySelectorAll, make them return types you expect them to! 🔮_

<br>

[@igor.dvlpr/vscode-folderpicker](https://www.npmjs.com/package/@igor.dvlpr/vscode-folderpicker)

> _✨ Provides a custom Folder Picker API + UI for Visual Studio Code. 🎨_

---

## 👨🏻‍💻 Author
Created by **Igor Dimitrijević** ([*@igorskyflyer*](https://github.com/igorskyflyer/)).
