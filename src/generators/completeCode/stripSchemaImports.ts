/**
 * Strips import lines from generated schema code so that the full code
 * generators can place a single, deduplicated import block at the top.
 */
export function stripSchemaImports(schemaCode: string): string {
  return schemaCode
    .split("\n")
    .filter((line) => !line.startsWith("import "))
    .join("\n")
    .trim();
}
