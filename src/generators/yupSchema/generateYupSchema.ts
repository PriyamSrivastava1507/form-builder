import type { FieldSchema } from "@/types/field";
import { generateYupField } from "./yupSchemaGenerators";

export function generateYupObjectSchema(schemaName: string, fields: FieldSchema[], isTs: boolean) {
  const body = fields.map(generateYupField).join("\n");
  return `import * as yup from "yup";

export const ${schemaName} = yup.object({
${body}
});

${isTs ? `export type FormValues = yup.InferType<typeof ${schemaName}>;` : ""}`;
}