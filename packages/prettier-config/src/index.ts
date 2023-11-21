import { Config } from "prettier"

export default function config(): Config {
  return {
    bracketSpacing: true,
    printWidth: 80,
    semi: false,
    singleQuote: false,
    tabWidth: 2,
    useTabs: false,
  }
}
