import { describe, expect, test } from "vitest"

import eslintConfig from "../src"

// test tailwind configuration
describe("test ignore list in eslint configuration", () => {
  describe("if ignores array is populated", () => {
    const IGNORE_FILE_NAME = "**/.ignorethisfile"

    const IGNORE_LOCK_FILES = [
      "**/package-lock.json",
      "**/yarn.lock",
      "**/pnpm-lock.yaml",
      "**/bun.lockb",
    ]

    const config = eslintConfig({ ignores: [IGNORE_FILE_NAME] })

    test("should include the ignored file name in an `ignores` object", () => {
      expect(
        config.some((obj) => obj.ignores?.includes(IGNORE_FILE_NAME)),
      ).toBe(true)
    })

    test("edge case test for random files", () => {
      expect(config.some((obj) => obj.ignores?.includes("fakefile"))).toBe(
        false,
      )
    })

    test("test lock files are included", () => {
      expect(
        IGNORE_LOCK_FILES.every((lock) =>
          config.some((obj) => obj.ignores?.includes(lock)),
        ),
      ).toBe(true)
    })
  })
})
