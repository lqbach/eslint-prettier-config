import { describe, expect, test } from "vitest"

import prettierConfig from "../src"

// test tailwind configuration
describe("test tailwind plugin configuration", () => {
  describe("if tailwind option not given", () => {
    const config = prettierConfig()

    test("should not have anything in `plugin` options", () => {
      expect(config.plugins).toHaveLength(0)
    })

    test("should not add extra options", () => {
      expect(config).not.toHaveProperty("tailwindConfig")
      expect(config).not.toHaveProperty("tailwindEntryPoint")
      expect(config).not.toHaveProperty("tailwindAttributes")
      expect(config).not.toHaveProperty("tailwindFunctions")
      expect(config).not.toHaveProperty("tailwindPreserveWhitespace")
      expect(config).not.toHaveProperty("tailwindPreserveDuplicates")
    })
  })

  describe("if tailwind option is true", () => {
    const config = prettierConfig({ tailwind: true })

    test("should have `plugin` options", () => {
      expect(config.plugins).toHaveLength(1)
      expect(config.plugins).toContain("prettier-plugin-tailwindcss")
    })

    test("should not add extra options", () => {
      expect(config).not.toHaveProperty("tailwindConfig")
      expect(config).not.toHaveProperty("tailwindEntryPoint")
      expect(config).not.toHaveProperty("tailwindAttributes")
      expect(config).not.toHaveProperty("tailwindFunctions")
      expect(config).not.toHaveProperty("tailwindPreserveWhitespace")
      expect(config).not.toHaveProperty("tailwindPreserveDuplicates")
    })
  })

  describe("if tailwind option is an option object", () => {
    const config = prettierConfig({
      tailwind: { tailwindAttributes: ["myClassList"] },
    })

    test("should have `plugin` options", () => {
      expect(config.plugins).toHaveLength(1)
      expect(config.plugins).toContain("prettier-plugin-tailwindcss")
    })

    test("should not add extra options", () => {
      expect(config).not.toHaveProperty("tailwindConfig")
      expect(config).not.toHaveProperty("tailwindEntryPoint")
      expect(config).toHaveProperty("tailwindAttributes")
      expect(config).not.toHaveProperty("tailwindFunctions")
      expect(config).not.toHaveProperty("tailwindPreserveWhitespace")
      expect(config).not.toHaveProperty("tailwindPreserveDuplicates")
    })
  })
})
