import type { PluginOptions as PrettierTailwindOptions } from "prettier-plugin-tailwindcss"

export interface PrettierConfigParams {
  tailwind?: boolean | PrettierTailwindOptions
}
