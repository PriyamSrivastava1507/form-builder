import type { FieldSchema } from "@/types/field";
import { generateYupObjectSchema } from "../yupSchema/generateYupSchema";
import { collectDefaultValues } from "../colledDefault";
import { generateFormikField } from "../formikForm/formikGenerators";

import { stripSchemaImports } from "./stripSchemaImports";

/**
 * Generates a complete React component file string using Formik and Yup.
 * Includes imports, form schema, and component implementation.
 * @param {FieldSchema[]} fields - Array of form fields to generate code for
 * @param {string} schemaName - Name of the validation schema variable
 * @param {boolean} isTS - Whether to generate TypeScript code
 * @returns {string} The generated React component code
 */
export function generateFormikYupSingleFile(
  fields: FieldSchema[],
  schemaName: string,
  isTS: boolean
): string {
  const schemaCode = generateYupObjectSchema(schemaName, fields, isTS);
  const schemaBody = stripSchemaImports(schemaCode);
  const defaultValues = collectDefaultValues(fields, 6, isTS);
  const fieldsStr = fields.map(generateFormikField).join("\n");

  return `import * as yup from "yup"
import { Formik, Form, Field, ErrorMessage } from "formik"

${schemaBody}

export default function FormComponent() {
  return (
    <Formik${isTS ? "<FormValues>" : ""}
      initialValues={${defaultValues}}
      validationSchema={${schemaName}}
      onSubmit={(values${isTS ? ": FormValues" : ""}) => console.log(values)}
    >
      {({ setFieldValue, values }) => (
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