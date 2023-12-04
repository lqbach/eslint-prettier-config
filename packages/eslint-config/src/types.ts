export interface ConfigParams {
  ignores?: Array<string>
  json?: boolean
  markdown?: boolean
  perfectionist?: boolean
  react?: boolean
  typescript?: boolean
  vue?: boolean
  yaml?: boolean
}

export interface LanguageOptions {
  ecmaVersion?: string
  globals?: object
  parser?: object
  parserOptions?: object
  sourceType?: string
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
  plugins?: object
  processor?: object
  rules?: object
  settings?: object
}
