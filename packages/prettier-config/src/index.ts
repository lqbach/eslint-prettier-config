import { Config } from "prettier"

import { PrettierConfigParams } from "./types"

export default function config(params?: PrettierConfigParams): Config {
  const tailwind = params?.tailwind

  const plugins = [...(tailwind ? ["prettier-plugin-tailwindcss"] : [])]

  const tailwindOptions = typeof tailwind !== "boolean" ? tailwind : {}

  return {
    bracketSpacing: true,
    plugins,
    printWidth: 80,
    semi: false,
    singleQuote: false,
    tabWidth: 2,
    useTabs: false,
    ...tailwindOptions,
  }
}
