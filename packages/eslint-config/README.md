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
  - [VSCode](#vscode)

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

### VSCode

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
