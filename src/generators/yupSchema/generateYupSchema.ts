import type { FieldSchema } from "@/types/field";
import { generateYupField } from "./yupSchemaGenerators";

/**
 * Generates a complete Yup object schema declaration.
 * @param {string} schemaName - The validation schema variable name
 * @param {FieldSchema[]} fields - The form fields schema
 * @param {boolean} isTs - Whether to output TypeScript
 * @returns {string} The generated Yup schema code
 */
export function generateYupObjectSchema(schemaName: string, fields: FieldSchema[], isTs: boolean) {
  const body = fields.map(generateYupField).join("\n");
  return `import * as yup from "yup";

export const ${schemaName} = yup.object({
${body}
});

${isTs ? `export type FormValues = yup.InferType<typeof ${schemaName}>;` : ""}`;
}