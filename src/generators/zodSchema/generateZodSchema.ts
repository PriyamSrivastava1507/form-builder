import type { FieldSchema } from "@/types/field";
import { generateZodField } from "./zodSchemaGenerators";

/**
 * Generates a complete Zod object schema declaration.
 * @param {string} schemaName - The validation schema variable name
 * @param {FieldSchema[]} fields - The form fields schema
 * @param {boolean} isTS - Whether to output TypeScript
 * @returns {string} The generated Zod schema code
 */
export function generateZodObjectSchema(schemaName: string, fields: FieldSchema[], isTS: boolean) {
  const body = fields.map(generateZodField).join("\n");
  return `import * as z from "zod";

export const ${schemaName} = z.object({
${body}
});

${isTS ? `export type FormValues = z.infer<typeof ${schemaName}>;` : ``}`;
}