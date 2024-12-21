import { describe, expect, test } from "vitest"

import eslintConfig from "../src"
import { getConfigObjectByName } from "./utils"

const NEXT_CONFIG_OBJECT_NAME = "lqbach/next"

// test tailwind configuration
describe("test nextjs eslint configuration", () => {
  describe("if next parameter is not true", () => {
    const config = eslintConfig({ next: false })

    test("should not include the ignored folder **/.next in the `ignores` object", () => {
      expect(config.some((obj) => obj.ignores?.includes("**/.next"))).toBe(true)
    })
    test("should not have a configuration object lqbach/next", () => {
      expect(getConfigObjectByName(NEXT_CONFIG_OBJECT_NAME, config)).toBe(
        undefined,
      )
    })
  })
  describe("if next parameter is true", () => {
    const config = eslintConfig({ next: true })

    test("should include react config", () => {
      expect(getConfigObjectByName("lqbach/react", config)).toBeTruthy()
    })
    test("should include react hooks config", () => {
      expect(getConfigObjectByName("lqbach/react-hooks", config)).toBeTruthy()
    })

    test("should include the ignored folder **/.next in the `ignores` object", () => {
      expect(
        getConfigObjectByName("lqbach/ignores", config)?.ignores?.includes(
          "**/.next",
        ),
      ).toBe(true)
    })
  })
  describe("if next parameter is a config object", () => {
    test("should include react config", () => {
      const config = eslintConfig({ next: { rootDir: "packages/example" } })
      expect(getConfigObjectByName("lqbach/react", config)).toBeTruthy()
    })
    test("should include react hooks config", () => {
      const config = eslintConfig({ next: { rootDir: "packages/example" } })
      expect(getConfigObjectByName("lqbach/react-hooks", config)).toBeTruthy()
    })
    test("should parse rootDir properly", () => {
      const config = eslintConfig({ next: { rootDir: "packages/example" } })
      expect(
        getConfigObjectByName("lqbach/next", config)?.settings?.nextjs?.rootDir,
      ).toEqual("packages/example")
    })
  })
})
