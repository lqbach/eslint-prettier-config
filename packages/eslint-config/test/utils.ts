import type { ConfigObject } from "../src/types"

/**
 *
 * @param name A name for the configuration object. Use naming convention recommended by ESLint (https://eslint.org/docs/latest/use/configure/configuration-files#configuration-naming-conventions)
 * @param config ESLint config
 * @returns config object based on the configuration object name
 */
export const getConfigObjectByName = (
  name: string,
  config: Array<ConfigObject>,
) => {
  return config.find((configObj) => {
    return configObj.name === name
  })
}
