import { describe, expect, test } from "vitest"

import eslintConfig from "../src"
import { getConfigObjectByName } from "./utils"

const ASTRO_CONFIG_OBJECT_NAME = "lqbach/astro"

// test astro configuration
describe("test astro eslint configuration", () => {
  describe("if astro parameter is not true", () => {
    const config = eslintConfig({ astro: false })

    test("should not have a configuration object lqbach/astro", () => {
      expect(getConfigObjectByName(ASTRO_CONFIG_OBJECT_NAME, config)).toBe(
        undefined,
      )
    })
  })

  describe("if astro parameter is true", () => {
    const config = eslintConfig({ astro: true })

    test("should have a configuration object lqbach/astro", () => {
      expect(
        getConfigObjectByName(ASTRO_CONFIG_OBJECT_NAME, config),
      ).toBeTruthy()
    })

    test("should target *.astro files", () => {
      const astroConfig = getConfigObjectByName(
        ASTRO_CONFIG_OBJECT_NAME,
        config,
      )
      expect(astroConfig?.files).toEqual(["**/*.astro"])
    })

    test("should include astro plugin", () => {
      const astroConfig = getConfigObjectByName(
        ASTRO_CONFIG_OBJECT_NAME,
        config,
      )
      expect(astroConfig?.plugins).toHaveProperty("astro")
    })

    test("should include astro recommended rules", () => {
      const astroConfig = getConfigObjectByName(
        ASTRO_CONFIG_OBJECT_NAME,
        config,
      )
      expect(astroConfig?.rules).toBeDefined()
      expect(Object.keys(astroConfig?.rules || {})).toContain(
        "astro/no-conflict-set-directives",
      )
    })

    test("should not have typescript parser options when typescript is not enabled", () => {
      const astroConfig = getConfigObjectByName(
        ASTRO_CONFIG_OBJECT_NAME,
        config,
      )
      expect(astroConfig?.languageOptions?.parserOptions).toEqual({})
    })
  })

  describe("if astro parameter is a config object", () => {
    test("should have a configuration object lqbach/astro when typescript is enabled", () => {
      const config = eslintConfig({
        astro: { typescript: true },
        typescript: true,
      })
      expect(
        getConfigObjectByName(ASTRO_CONFIG_OBJECT_NAME, config),
      ).toBeTruthy()
    })

    test("should include typescript parser options when typescript is enabled", () => {
      const config = eslintConfig({
        astro: { typescript: true },
        typescript: true,
      })
      const astroConfig = getConfigObjectByName(
        ASTRO_CONFIG_OBJECT_NAME,
        config,
      )
      expect(astroConfig?.languageOptions?.parserOptions).toEqual({
        extraFileExtensions: [".astro"],
        parser: expect.any(Object),
        sourceType: "module",
      })
    })

    test("should not include typescript parser options when typescript is disabled", () => {
      const config = eslintConfig({
        astro: { typescript: false },
        typescript: false,
      })
      const astroConfig = getConfigObjectByName(
        ASTRO_CONFIG_OBJECT_NAME,
        config,
      )
      expect(astroConfig?.languageOptions?.parserOptions).toEqual({})
    })
  })

  describe("default behavior", () => {
    test("should not include astro config by default", () => {
      const config = eslintConfig({})
      expect(getConfigObjectByName(ASTRO_CONFIG_OBJECT_NAME, config)).toBe(
        undefined,
      )
    })

    test("should not include astro config when astro is undefined", () => {
      const config = eslintConfig({ astro: undefined })
      expect(getConfigObjectByName(ASTRO_CONFIG_OBJECT_NAME, config)).toBe(
        undefined,
      )
    })
  })
})
