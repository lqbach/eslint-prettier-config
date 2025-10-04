import globals from "globals"

import {
  configPrettier,
  jsConfig,
  parserAstro,
  parserJsonc,
  parserTypeScript,
  parserVue,
  parserYaml,
  pluginAstro,
  pluginJsonc,
  pluginNext,
  pluginPerfectionist,
  pluginReact,
  pluginReactHooks,
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

      "**/web/public",
      "**/studio/build",
      "**/studio/.sanity",

      ...(params.next ? ["**/.next"] : []),
      ...(params.ignores ? params.ignores : []),
    ],
    name: "lqbach/ignores",
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
          ...globals.commonjs,
        },
        parserOptions: {
          sourceType: "module",
        },
      },
      name: "lqbach/javascript",
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
    (params.typescript ?? true)
      ? {
          files: ["**/*.{ts,tsx}"],
          languageOptions: {
            parser: parserTypeScript,
            parserOptions: {
              sourceType: "module",
            },
          },
          name: "lqbach/typescript",
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
    ((params.next || params.react) ?? false)
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
          name: "lqbach/react",
          plugins: {
            react: pluginReact,
          },
          rules: {
            ...pluginReact.configs.flat?.recommended.rules,
            // ignore `css` for emotion usage
            "react/no-unknown-property": ["error", { ignore: ["css"] }],
          },
        }
      : {}

  const reactHooksConfig: ConfigObject =
    ((params.next ||
      (typeof params.react !== "boolean" && params.react?.hooks === true)) ??
    false)
      ? {
          files: ["**/*.{js,jsx,mjs,cjs,ts,tsx}"],
          name: "lqbach/react-hooks",
          plugins: {
            "react-hooks": pluginReactHooks,
          },
          rules: {
            "react-hooks/exhaustive-deps": "warn",
            "react-hooks/rules-of-hooks": "error",
          },
        }
      : {}

  // Vue Config: turned off by default
  const vueConfig: ConfigObject =
    (params.vue ?? false)
      ? {
          files: ["**/*.vue"],
          languageOptions: {
            parser: parserVue,
            parserOptions: {
              parser: params.typescript ? parserTypeScript : null,
              sourceType: "module",
            },
          },
          name: "lqbach/vue",
          plugins: {
            vue: pluginVue,
          },
          processor: pluginVue.processors[".vue"],
          rules: {
            ...pluginVue.configs["base"].rules,
            ...pluginVue.configs["essential"].rules,
            ...pluginVue.configs["strongly-recommended"].rules,
          },
        }
      : {}

  // NextJS Config
  const nextConfig: ConfigObject =
    (params.next ?? false)
      ? {
          files: ["**/*.{js,jsx,ts,tsx}"],
          name: "lqbach/next",
          plugins: {
            "@next/next": pluginNext,
          },
          rules: {
            ...pluginNext.configs.recommended.rules,
            ...pluginNext.configs["core-web-vitals"].rules,
          },
          ...(typeof params.next !== "boolean" &&
            params.next?.rootDir && {
              settings: {
                nextjs: {
                  rootDir: params.next.rootDir,
                },
              },
            }),
        }
      : {}

  // YAML Config
  const yamlConfig: ConfigObject =
    (params.yaml ?? true)
      ? {
          files: ["**/*.{yaml, yml}"],
          languageOptions: {
            parser: parserYaml,
          },
          name: "lqbach/yaml",
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
    (params.json ?? true)
      ? [
          {
            name: "lqbach/jsonc-plugin",
            plugins: {
              jsonc: pluginJsonc,
            },
          },
          {
            files: ["**/*.{json, json5, jsonc}"],
            languageOptions: {
              parser: parserJsonc,
            },
            name: "lqbach/json",
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
    (params.perfectionist ?? true)
      ? {
          name: "lqbach/perfectionist",
          plugins: {
            perfectionist: pluginPerfectionist,
          },
          rules: {
            ...pluginPerfectionist.configs["recommended-natural"].rules,
          },
        }
      : {}

  // Astro Config
  const astroConfig: ConfigObject =
    (params.astro ?? false)
      ? {
          files: ["**/*.astro"],
          languageOptions: {
            parser: parserAstro,
            parserOptions: params.typescript
              ? {
                  extraFileExtensions: [".astro"],
                  parser: parserTypeScript,
                  sourceType: "module",
                }
              : {},
          },
          name: "lqbach/astro",
          plugins: {
            astro: pluginAstro,
          },
          rules: {
            "astro/missing-client-only-directive-value": "error",
            "astro/no-conflict-set-directives": "error",
            "astro/no-deprecated-astro-canonicalurl": "error",
            "astro/no-deprecated-astro-fetchcontent": "error",
            "astro/no-deprecated-astro-resolve": "error",
            "astro/no-deprecated-getentrybyslug": "error",
            "astro/no-unused-define-vars-in-style": "error",
            "astro/valid-compile": "error",
          },
        }
      : {}

  const prettierConfig: ConfigObject = configPrettier

  let config: Array<ConfigObject> = []
  config.push(ignoresConfig)
  config.push(...javascriptConfig)
  config.push(typescriptConfig)
  config.push(reactConfig)
  config.push(reactHooksConfig)
  config.push(vueConfig)
  config.push(nextConfig)
  config.push(astroConfig)
  config.push(yamlConfig)
  config.push(...jsoncConfig)
  config.push(perfectionistConfig)
  config.push(prettierConfig)

  return config
}
