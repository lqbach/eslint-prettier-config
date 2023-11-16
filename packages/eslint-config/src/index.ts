import {
  pluginUnusedImports,
  pluginTypeScript,
  pluginReact,
  pluginVue,
  pluginJsonc,
  parserTypeScript,
  parserVue,
  jsConfig,
  configPrettier,
  pluginYaml,
  parserYaml,
  parserJsonc,
  pluginMarkdown,
} from "./libs"

import { ConfigParams, ConfigObject } from "./types"

import globals from "globals"

export default function config(params: ConfigParams = {}) {
  // TypeScript Config
  const typescriptConfig: ConfigObject =
    params.typescript ?? true
      ? {
          files: ["**/*.{ts,tsx}"],
          languageOptions: {
            parser: parserTypeScript,
            parserOptions: {
              sourceType: "module",
            },
          },
          plugins: {
            "@typescript-eslint": pluginTypeScript,
          },
          rules: {
            ...pluginTypeScript.configs.recommended.rules,
          },
        }
      : {}

  // React Config: turned off by default
  const reactConfig: ConfigObject =
    params.react ?? false
      ? {
          files: ["**/*.{js,jsx,mjs,cjs,ts,tsx}"],
          plugins: {
            react: pluginReact,
          },
          rules: {
            ...pluginReact.configs.recommended.rules,
          },
        }
      : {}

  // Vue Config: turned off by default
  const vueConfig: ConfigObject =
    params.vue ?? false
      ? {
          files: ["**/*.vue"],
          languageOptions: {
            parser: parserVue,
            parserOptions: {
              parser: params.typescript ? parserTypeScript : null,
              sourceType: "module",
            },
          },
          rules: {
            ...pluginVue.configs["base"].rules,
            ...pluginVue.configs["vue3-essential"].rules,
            ...pluginVue.configs["vue3-strongly-recommended"].rules,
          },
        }
      : {}

  // YAML Config
  const yamlConfig: ConfigObject =
    params.yaml ?? false
      ? {
          files: ["**/*.{yaml, yml}"],
          languageOptions: {
            parser: parserYaml,
          },
          plugins: {
            yaml: pluginYaml,
          },
          rules: {
            ...pluginYaml.configs["standard"],
            ...pluginYaml.configs["prettier"],
          },
        }
      : {}

  // JSONC Config
  const jsoncConfig: ConfigObject =
    params.json ?? false
      ? {
          files: ["**/*.{json, json5, jsonc}"],
          languageOptions: {
            parser: parserJsonc,
          },
          plugins: {
            jsonc: pluginJsonc,
          },
          rules: {
            ...pluginJsonc.configs.base,
            ...pluginJsonc.configs["recommended-with-json"],
            ...pluginJsonc.configs["recommended-with-jsonc"],
            ...pluginJsonc.configs["recommended-with-json5"],
            ...pluginJsonc.configs["prettier"],
          },
        }
      : {}

  // Markdown Config
  const markdownConfig: Array<ConfigObject> =
    params.json ?? false
      ? [
          {
            files: ["**/*.md"],
            processor: "markdown/markdown",
            plugins: {
              markdown: pluginMarkdown,
            },
          },
        ]
      : [{}]

  return [
    // Files to ignore
    {
      ignores: [
        "**/node_modules",
        "**/dist",
        "**/package-lock.json",
        "**/yarn.lock",
        "**/pnpm-lock.yaml",
        "**/bun.lockb",

        "**/output",
        "**/coverage",
        "**/temp",
        "**/.nuxt",
        "**/.next",
        "**/.vercel",
        "**/.changeset",
        "**/.idea",
        "**/.cache",
        "**/.output",

        "**/*.min.*",
        "**/LICENSE*",
      ],
    },

    // Default
    jsConfig.configs.recommended,
    {
      files: ["**/*.js", "**/*.mjs"],
      languageOptions: {
        ecmaVersion: 2022,
        parserOptions: {
          sourceType: "module",
        },
        globals: {
          ...globals.browser,
          ...globals.node,
          ...globals.es6,
          ...globals.commonjs,
        },
      },
      plugins: {
        "unused-imports": pluginUnusedImports,
      },
      rules: {
        "unused-imports/no-unused-imports": "error",
        "unused-imports/no-unused-vars": [
          "warn",
          {
            vars: "all",
            varsIgnorePattern: "^_",
            args: "after-used",
            argsIgnorePattern: "^_",
          },
        ],
      },
    },

    { ...typescriptConfig },
    { ...reactConfig },
    { ...vueConfig },
    { ...yamlConfig },
    { ...jsoncConfig },
    ...markdownConfig,

    configPrettier,
  ]
}
