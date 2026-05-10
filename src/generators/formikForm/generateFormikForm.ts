import type { FieldSchema } from "@/types/field";
import { collectDefaultValues } from "../colledDefault";
import { generateFormikField } from "./formikGenerators";

function needsRenderProps(fields: FieldSchema[]): boolean {
  return fields.some((f) => f.type === "file" || f.type === "range");
}

export function generateFormikZodForm(fields: FieldSchema[], schemaName: string, isTS: boolean): string {
  const defaultValues = collectDefaultValues(fields, 6, isTS);
  const fieldsStr = fields.map(generateFormikField).join("\n");
  const useRenderProps = needsRenderProps(fields);

  const renderPropsOpen = useRenderProps
    ? `{({ setFieldValue, values }) => (`
    : `{() => (`;

  return `import * as z from "zod"
import { Formik, Form, Field, ErrorMessage } from "formik"
import { ${schemaName} } from "./schema"
${isTS ? `import type { FormValues } from "./schema"` : ""}

export default function GeneratedForm() {
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
      ${renderPropsOpen}
        <Form>
          ${fieldsStr}
          <button type="submit">Submit</button>
        </Form>
      )}
    </Formik>
  )
}`;
}

export function generateFormikYupForm(fields: FieldSchema[], schemaName: string, isTS: boolean): string {
  const defaultValues = collectDefaultValues(fields, 6, isTS);
  const fieldsStr = fields.map(generateFormikField).join("\n");
  const useRenderProps = needsRenderProps(fields);

  const renderPropsOpen = useRenderProps
    ? `{({ setFieldValue }) => (`
    : `{() => (`;

  return `import { Formik, Form, Field, ErrorMessage } from "formik"
import { ${schemaName} } from "./schema"
${isTS ? `import type { FormValues } from "./schema"` : ""}

export default function GeneratedForm() {
  return (
    <Formik${isTS ? "<FormValues>" : ""}
      initialValues={${defaultValues}}
      validationSchema={${schemaName}}
      onSubmit={(values${isTS ? ": FormValues" : ""}) => console.log(values)}
    >
      ${renderPropsOpen}
        <Form>
          ${fieldsStr}
          <button type="submit">Submit</button>
        </Form>
      )}
    </Formik>
  )
}`;
}