/**
 * Strips import lines from generated schema code so that the full code
 * generators can place a single, deduplicated import block at the top.
 * @param {string} schemaCode - The generated schema code containing imports
 * @returns {string} The schema code without import statements
 */
export function stripSchemaImports(schemaCode: string): string {
  return schemaCode
    .split("\n")
    .filter((line) => !line.startsWith("import "))
    .join("\n")
    .trim();
}
