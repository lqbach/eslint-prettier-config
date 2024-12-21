export interface ConfigParams {
  ignores?: Array<string>
  json?: boolean
  markdown?: boolean
  next?: boolean | NextJSConfigParams
  perfectionist?: boolean
  react?: boolean | ReactJSConfigParams
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
  name?: string
  plugins?: object
  processor?: object
  rules?: object
  // eslint-disable-next-line
  settings?: any
}

export interface NextJSConfigParams {
  rootDir?: string
}

export interface ReactJSConfigParams {
  /**
   * use react hooks
   */
  hooks?: boolean
}
