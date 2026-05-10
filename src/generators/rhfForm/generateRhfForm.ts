import type { FieldSchema } from "@/types/field";
import { collectDefaultValues } from "../colledDefault";
import { generateRHFField } from "./rhfGenerators";

/**
 * Generates a React Hook Form component using Zod for validation.
 * @param {FieldSchema[]} fields - The form fields schema
 * @param {string} schemaName - The validation schema variable name
 * @param {boolean} isTS - Whether to output TypeScript
 * @returns {string} The generated React component code
 */
export function generateRHFForm(fields: FieldSchema[], schemaName: string, isTS: boolean): string {
  const defaultValues = collectDefaultValues(fields, 4, isTS);
  const fieldsStr = fields.map(generateRHFField).join("\n");

  return `import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { ${schemaName} } from "./schema"
${isTS ? `import type { FormValues } from "./schema"` : ""}

export default function GeneratedForm() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm${isTS ? "<FormValues>" : ""}({
    resolver: zodResolver(${schemaName})${isTS ? " as Resolver<FormValues>" : ""},
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
}`;
}

/**
 * Generates a React Hook Form component using Yup for validation.
 * @param {FieldSchema[]} fields - The form fields schema
 * @param {string} schemaName - The validation schema variable name
 * @param {boolean} isTS - Whether to output TypeScript
 * @returns {string} The generated React component code
 */
export function generateRHFYupForm(fields: FieldSchema[], schemaName: string, isTS: boolean): string {
  const defaultValues = collectDefaultValues(fields, 4, isTS);
  const fieldsStr = fields.map(generateRHFField).join("\n");

  return `import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { ${schemaName} } from "./schema"
${isTS ? `import type { FormValues } from "./schema"` : ""}

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
}`;
}