import type { FieldSchema } from "./field";

export type LanguageOptions = "TypeScript" | "JavaScript";

export type LibraryOptions = "React Hook Form + Zod" | "React Hook Form + Yup" | "Formik + Yup" | "Formik + Zod";

export type TemplateType = {
    fields: FieldSchema[],
    lastModified: Date
}

export type TemplateParsedType= {
    fields: FieldSchema[],
    lastModified: string
}

export type TemplateCollection = Record<string, TemplateType>;
export type TemplateCollectionParsed = Record<string, TemplateParsedType>;