import globals from "globals"

import {
  configPrettier,
  jsConfig,
  parserJsonc,
  parserTypeScript,
  parserVue,
  parserYaml,
  pluginJsonc,
  pluginPerfectionist,
  pluginReact,
  pluginTypeScript,
  pluginUnusedImports,
  pluginVue,
  pluginYaml,
} from "./libs"
import { ConfigObject, ConfigParams } from "./types"

export default function config(params: ConfigParams = {}): Array<ConfigObject> {
  // Ignores Config
  const ignoresConfig: ConfigObject = {
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
      ...(params.ignores as []),
    ],
  }

  //JavaScript Config
  const javascriptConfig: Array<ConfigObject> = [
    // Default
    jsConfig.configs.recommended,
    {
      files: ["**/*.js", "**/*.mjs"],
      languageOptions: {
        ecmaVersion: 2022,
        globals: {
          ...globals.browser,
          ...globals.node,
          ...globals.es6,
          ...globals.commonjs,
        },
        parserOptions: {
          sourceType: "module",
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
            args: "after-used",
            argsIgnorePattern: "^_",
            vars: "all",
            varsIgnorePattern: "^_",
          },
        ],
      },
    },
  ]

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
          languageOptions: {
            globals: {
              ...globals.serviceworker,
              ...globals.browser,
            },
            parserOptions: {
              ecmaFeatures: {
                jsx: true,
              },
            },
          },
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
          plugins: {
            vue: pluginVue,
          },
          processor: pluginVue.processors[".vue"],
          rules: {
            ...pluginVue.configs["base"].rules,
            ...pluginVue.configs["vue3-essential"].rules,
            ...pluginVue.configs["vue3-strongly-recommended"].rules,
          },
        }
      : {}

  // YAML Config
  const yamlConfig: ConfigObject =
    params.yaml ?? true
      ? {
          files: ["**/*.{yaml, yml}"],
          languageOptions: {
            parser: parserYaml,
          },
          plugins: {
            yml: pluginYaml,
          },
          rules: {
            ...pluginYaml.configs["standard"].rules,
            ...pluginYaml.configs["prettier"].rules,
          },
        }
      : {}

  // JSONC Config
  const jsoncConfig: Array<ConfigObject> =
    params.json ?? true
      ? [
          {
            plugins: {
              jsonc: pluginJsonc,
            },
          },
          {
            files: ["**/*.{json, json5, jsonc}"],
            languageOptions: {
              parser: parserJsonc,
            },
            rules: {
              ...pluginJsonc.configs["recommended-with-json"].rules,
              ...pluginJsonc.configs["recommended-with-jsonc"].rules,
              ...pluginJsonc.configs["recommended-with-json5"].rules,
              ...pluginJsonc.configs["prettier"].rules,
              "jsonc/no-comments": "off",
            },
          },
        ]
      : []

  // Perfectionist Config
  const perfectionistConfig: ConfigObject =
    params.perfectionist ?? true
      ? {
          plugins: {
            perfectionist: pluginPerfectionist,
          },
          rules: {
            ...pluginPerfectionist.configs["recommended-natural"].rules,
          },
        }
      : {}

  const prettierConfig: ConfigObject = configPrettier

  let config: Array<ConfigObject> = []
  config.push(ignoresConfig)
  config.push(...javascriptConfig)
  config.push(typescriptConfig)
  config.push(reactConfig)
  config.push(vueConfig)
  config.push(yamlConfig)
  config.push(...jsoncConfig)
  config.push(perfectionistConfig)
  config.push(prettierConfig)

  return config
}
