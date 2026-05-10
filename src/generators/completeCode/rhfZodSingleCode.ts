import type { FieldSchema } from "@/types/field";
import { generateZodObjectSchema } from "../zodSchema/generateZodSchema";
import { collectDefaultValues } from "../colledDefault";
import { generateRHFField } from "../rhfForm/rhfGenerators";

import { stripSchemaImports } from "./stripSchemaImports";

export function generateRHFZodSingleFile(
  fields: FieldSchema[],
  schemaName: string,
  isTS: boolean
): string {
  const schemaCode = generateZodObjectSchema(schemaName, fields, isTS);
  const schemaBody = stripSchemaImports(schemaCode);
  const defaultValues = collectDefaultValues(fields, 4, isTS);
  const fieldsStr = fields.map(generateRHFField).join("\n");

  return `import * as z from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

${schemaBody}

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
}
`;
}