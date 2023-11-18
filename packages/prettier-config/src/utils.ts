/**
 * Takes in an array of import order strings and groups them into chunks by adding an empty string between each item in the array.
 *
 * Reference: [README `prettier-plugin-sort-imports`](https://github.com/IanVS/prettier-plugin-sort-imports#3-add-spaces-between-import-groups)
 * @param arr an array of import order strings
 * @returns same array item separated by exactly one empty string between each item
 */

export const cleanSortImportsArray = (arr: Array<string>): Array<string> => {
  // remove empty strings
  const arrRemoveEmpty = arr.filter((val) => val !== "")

  // clean array
  const clean: Array<string> = arrRemoveEmpty.reduce(
    (result: Array<string>, item: string, index: number) => {
      result.push(item)

      if (index < arrRemoveEmpty.length - 1) {
        result.push("")
      }
      return result
    },
    [],
  )

  return clean
}
