import { describe, expect, test } from "vitest"

import { cleanSortImportsArray } from "../src/utils"

const inputA1 = ["hey", "jude"]
const inputA2 = ["hey", "", "", "jude"]
const inputA3 = ["hey", "", "jude", ""]
const inputA4 = ["", "hey", "", "jude", ""]

const outputExpectedA = ["hey", "", "jude"]

describe("cleanSortImportsArray", () => {
  test("test with ['hey', 'jude']", async () => {
    const output = cleanSortImportsArray(inputA1)
    expect(output).toStrictEqual(outputExpectedA)
  })

  test("test with ['hey', '', '', 'jude']", async () => {
    const output = cleanSortImportsArray(inputA2)
    expect(output).toStrictEqual(outputExpectedA)
  })

  test("test with ['hey', '', 'jude', '']", async () => {
    const output = cleanSortImportsArray(inputA3)
    expect(output).toStrictEqual(outputExpectedA)
  })

  test("test with ['', 'hey', '', 'jude', '']", async () => {
    const output = cleanSortImportsArray(inputA4)
    expect(output).toStrictEqual(outputExpectedA)
  })
})
