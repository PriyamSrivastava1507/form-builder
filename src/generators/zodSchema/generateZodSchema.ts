import type { FieldSchema } from "@/types/field";
import { generateZodField } from "./zodSchemaGenerators";

export function generateZodObjectSchema(schemaName: string, fields: FieldSchema[], isTS: boolean) {
  const body = fields.map(generateZodField).join("\n");
  return `import * as z from "zod";

export const ${schemaName} = z.object({
${body}
});

${isTS ? `export type FormValues = z.infer<typeof ${schemaName}>;` : ``}`;
}