import type { FieldSchema } from "@/types/field";
import { generateZodObjectSchema } from "../zodSchema/generateZodSchema";
import { collectDefaultValues } from "../colledDefault";
import { generateFormikField } from "../formikForm/formikGenerators";

import { stripSchemaImports } from "./stripSchemaImports";

/**
 * Generates a complete React component file string using Formik and Zod.
 * Includes imports, form schema, and component implementation.
 * @param {FieldSchema[]} fields - Array of form fields to generate code for
 * @param {string} schemaName - Name of the validation schema variable
 * @param {boolean} isTS - Whether to generate TypeScript code
 * @returns {string} The generated React component code
 */
export function generateFormikZodSingleFile(
  fields: FieldSchema[],
  schemaName: string,
  isTS: boolean
): string {
  const schemaCode = generateZodObjectSchema(schemaName, fields, isTS);
  const schemaBody = stripSchemaImports(schemaCode);
  const defaultValues = collectDefaultValues(fields, 6, isTS);
  const fieldsStr = fields.map(generateFormikField).join("\n");

  return `import * as z from "zod"
import { Formik, Form, Field, ErrorMessage } from "formik"

${schemaBody}

export default function FormComponent() {
  return (
    <Formik${isTS ? "<FormValues>" : ""}
      initialValues={${defaultValues}}
      validate={(values${isTS ? ": FormValues" : ""}) => {
        try {
          ${schemaName}.parse(values)
          return {}
        } catch (err: unknown) {
          if (!(err instanceof z.ZodError)) return {}
          const fieldErrors = err.flatten().fieldErrors as Record<string, string[]>
          return Object.fromEntries(
            Object.entries(fieldErrors).map(([key, messages]) => [
              key,
              messages?.[0] ?? "Invalid value"
            ])
          )
        }
      }}
      onSubmit={(values${isTS ? ": FormValues" : ""}) => console.log(values)}
    >
      {({ setFieldValue }) => (
        <Form>
          ${fieldsStr}
          <button type="submit">Submit</button>
        </Form>
      )}
    </Formik>
  )
}
`;
}