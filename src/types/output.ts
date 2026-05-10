import type { FieldSchema } from "./field";

/**
 * Options for the programming language of the generated code
 */
export type LanguageOptions = "TypeScript" | "JavaScript";

/**
 * Options for the combination of form and validation libraries
 */
export type LibraryOptions = "React Hook Form + Zod" | "React Hook Form + Yup" | "Formik + Yup" | "Formik + Zod";

/**
 * Represents a saved form template
 */
export type TemplateType = {
    fields: FieldSchema[]; // The fields making up the template
    lastModified: Date;    // When the template was last updated
};

/**
 * Represents a parsed JSON version of a form template
 */
export type TemplateParsedType = {
    fields: FieldSchema[]; // The fields making up the template
    lastModified: string;  // ISO string representation of last modification date
};

/**
 * A collection of form templates keyed by a unique identifier
 */
export type TemplateCollection = Record<string, TemplateType>;

/**
 * A collection of parsed form templates keyed by a unique identifier
 */
export type TemplateCollectionParsed = Record<string, TemplateParsedType>;