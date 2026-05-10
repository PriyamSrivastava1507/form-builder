import type { FieldSchema } from "@/types/field";
import { generateYupObjectSchema } from "../yupSchema/generateYupSchema";
import { collectDefaultValues } from "../colledDefault";
import { generateRHFField } from "../rhfForm/rhfGenerators";

import { stripSchemaImports } from "./stripSchemaImports";

/**
 * Generates a complete React component file string using React Hook Form and Yup.
 * Includes imports, form schema, and component implementation.
 * @param {FieldSchema[]} fields - Array of form fields to generate code for
 * @param {string} schemaName - Name of the validation schema variable
 * @param {boolean} isTS - Whether to generate TypeScript code
 * @returns {string} The generated React component code
 */
export function generateRHFYupSingleFile(
  fields: FieldSchema[],
  schemaName: string,
  isTS: boolean
): string {
  const schemaCode = generateYupObjectSchema(schemaName, fields, isTS);
  const schemaBody = stripSchemaImports(schemaCode);
  const defaultValues = collectDefaultValues(fields, 4, isTS);
  const fieldsStr = fields.map(generateRHFField).join("\n");

  return `import * as yup from "yup"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"

${schemaBody}

export default function GeneratedForm() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm${isTS ? "<FormValues>" : ""}({
    resolver: yupResolver(${schemaName})${isTS ? " as Resolver<FormValues>" : ""},
    defaultValues: ${defaultValues}
  })

  const onSubmit = (data${isTS ? ": FormValues" : ""}) => {
    console.log(data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      ${fieldsStr}
      <button type="submit">Submit</button>
    </form>
  )
}
`;
}