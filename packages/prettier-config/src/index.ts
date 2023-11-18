import { PrettierConfig } from "@ianvs/prettier-plugin-sort-imports"

import { PrettierConfigParams } from "./types"
import { cleanSortImportsArray } from "./utils"

export default function config(
  params: PrettierConfigParams = {},
): PrettierConfig {
  let defaultImportOrder = [
    "<BUILTIN_MODULES>", // Node.js built-in modules
    "<THIRD_PARTY_MODULES>", // Imports not matched by other special words or groups.
    "<TYPES>", // Types
    "<TYPES>^[.]",
    "^[.]", // relative imports
  ]

  const importOrder = cleanSortImportsArray(
    params.importOrder ?? defaultImportOrder,
  )

  return {
    printWidth: 80,
    tabWidth: 2,
    useTabs: false,
    semi: false,
    singleQuote: false,
    bracketSpacing: true,

    plugins: ["@ianvs/prettier-plugin-sort-imports"],
    importOrder: importOrder,
  }
}
