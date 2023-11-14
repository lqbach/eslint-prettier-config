export interface ConfigParams {
  typescript?: boolean
  vue?: boolean
  react?: boolean
  json?: boolean
  yaml?: boolean
  markdown?: boolean
}

export interface LanguageOptions {
  ecmaVersion?: string
  sourceType?: string
  globals?: object
  parser?: object
  parserOptions?: object
}

export interface LinterOptions {
  noInlineConfig?: boolean
  reportUnusedDisableDirectives?: boolean
}

export interface ConfigObject {
  files?: Array<string>
  ignores?: Array<string>
  languageOptions?: LanguageOptions
  linterOptions?: LinterOptions
  processor?: object
  plugins?: object
  rules?: object
  settings?: object
}
