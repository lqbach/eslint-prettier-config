import { Config } from "prettier"

export default function config(): Config {
  return {
    printWidth: 80,
    tabWidth: 2,
    useTabs: false,
    semi: false,
    singleQuote: false,
    bracketSpacing: true,
  }
}
