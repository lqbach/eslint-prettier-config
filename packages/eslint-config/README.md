<h1 align="center">@lqbach/eslint-config</h1>

<div align="center">
    <a href="https://www.npmjs.com/package/@lqbach/eslint-config">
        <img src="https://img.shields.io/npm/v/@lqbach/eslint-config?color=444E5F&label=version&labelColor=BDD4E7" alt="npm-package"/>
    </a>
    <a href="https://www.npmjs.com/package/@lqbach/eslint-config">
        <img src="https://img.shields.io/github/license/lqbach/eslint-prettier-config?labelColor=BDD4E7&color=444E5F" alt="license"/>
    </a>
    <img src="https://img.shields.io/github/release-date/lqbach/eslint-prettier-config?labelColor=BDD4E7&color=444E5F" alt="release-date"/>

</div>

- [Usage](#usage)
  - [Installation](#installation)
    - [pnpm](#pnpm)
    - [yarn](#yarn)
    - [npm](#npm)
  - [Setup](#setup)
  - [VSCode Support](#vscode-support)
- [Features](#features)
  - [Ignoring Files](#ignoring-files)
  - [React and Vue](#react-and-vue)

## Usage

### Installation

#### pnpm

```
pnpm add -D @lqbach/eslint-config eslint
```

#### yarn

```
yarn add -D @lqbach/eslint-config eslint
```

#### npm

```
npm install -D @lqbach/eslint-config eslint
```

### Setup

This configuration file uses the new [flat ESLint Configuration](https://eslint.org/docs/latest/use/configure/configuration-files-new). Setting this up can be as seamless as one line of code.

```js
// eslint.config.js
import eslintConfig from "@lqbach/eslint-config"

export default eslintConfig()
```

> [!WARNING]  
> ESLint flat configs don't really support `.eslintignore` files anymore. To ignore files, you should use the new global `ignores` that can be easily configured with this config library See [ignoring files](#ignoring-files) below.

### VSCode Support

Visual Studio Code has an [ESLint extension](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) (or search _`dbaeumer.vscode-eslint`_ in the Extension Marketplace search bar) that supports rich editing features. This will help lint file saves and provide linting documentation in the code.
The following should be added to `.vscode/settings.json` at the root of your project:

```json
{
  // Include the below if using Prettier
  //   "editor.formatOnSave": true,

  // Tell the ESLint plugin to run on save
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },

  // To enable proper ESLint behavior with flat configurations
  "eslint.experimental.useFlatConfig": true
}
```

## Features

### Ignoring Files

You can ignore files by using the `ignores` parameter which accepts an array of strings. Reference the [ignore patterns](https://eslint.org/docs/latest/use/configure/ignore) from the ESLint documentation for proper glob syntax.

```js
// eslint.config.js
import eslintConfig from "@lqbach/eslint-config"

export default eslintConfig({
  ignores: ["./sanity", "./public/*.js"],
})
```

The above will ignore the `sanity` folder and all JavaScript files in the `public` folder.

### React and Vue

If you are writing with React or Vue, you will need to toggle them on. Both `vue` and `react` parameters default to `false` until set by the user.

```js
// eslint.config.js
import eslintConfig from "@lqbach/eslint-config"

export default eslintConfig({
  vue: true, // defaults to false

  // uncomment below and comment above to use react
  // react: true,
})
```
