import type {
  TextField,
  TextareaField,
  FieldOption,
} from "@/types/field";

import type {
  TextValidation,
  NumberValidation,
  TextareaValidation,
} from "@/types/fieldValidation";

/**
 * Stringifies and quotes a value for use in generated code.
 * @param {unknown} value - The value to stringify
 * @returns {string} The quoted string representation
 */
export const q = (value: unknown) => JSON.stringify(String(value));

/**
 * Formats a string as a valid object key, quoting it if it contains invalid characters.
 * @param {string} key - The object key to format
 * @returns {string} The formatted object key
 */
export const asKey = (key: string) =>
  /^[A-Za-z_$][A-Za-z0-9_$]*$/.test(key) ? key : JSON.stringify(key);

/**
 * Extracts all non-empty values from a field's options array.
 * @param {{ options?: FieldOption[] }} field - The field containing options
 * @returns {string[]} An array of option values
 */
export const optionValues = (field: { options?: FieldOption[] }) =>
  (field.options ?? [])
    .map((opt) => opt.value)
    .filter((v): v is string => v.length > 0);

/**
 * Generated Yup transform function to convert blank strings to undefined.
 */
export const yupBlankToUndefined = `(value, originalValue) => {
    if (originalValue == null) return undefined;
    if (typeof originalValue === "string") {
      const trimmed = originalValue.trim();
      return trimmed === "" ? undefined : trimmed;
    }
    return value;
  }`;

/**
 * Generated Zod transform function to convert a FileList to a single File.
 */
export const zodFileListToFile = `(value) => {
    if (value == null) return undefined;
    if (typeof FileList !== "undefined" && value instanceof FileList) {
      return value.item(0) ?? undefined;
    }
    if (Array.isArray(value)) return value[0];
    return value;
  }`;

/**
 * Generated Yup transform function to convert a FileList to a single File.
 */
export const yupFileListToFile = `(value, originalValue) => {
    if (originalValue == null) return undefined;
    if (typeof FileList !== "undefined" && originalValue instanceof FileList) {
      return originalValue.item(0) ?? undefined;
    }
    if (Array.isArray(originalValue)) return originalValue[0];
    return value;
  }`;

/**
 * Generates an array includes check for a given set of allowed values.
 * @param {string[]} values - Allowed values
 * @returns {string} The generated condition check
 */
export const allowedCheck = (values: string[]) => `${JSON.stringify(values)}.includes(value)`;

/**
 * Generates a file validation check for MIME types and extensions.
 * @param {string} fileVar - Variable name of the file
 * @param {string[]} values - Array of accepted MIME types or extensions
 * @returns {string} The generated condition check
 */
export const fileAcceptedCheck = (fileVar: string, values: string[]) => {
  const arr = JSON.stringify(values);
  return `${arr}.some((expected) => {
      const lower = expected.toLowerCase();
      return lower.startsWith(".")
        ? ${fileVar}.name.toLowerCase().endsWith(lower)
        : ${fileVar}.type.toLowerCase() === lower;
    })`;
};

/**
 * Joins an array of chained method calls onto separate lines
 * with consistent indentation (4 spaces).
 */
function formatChain(base: string, parts: string[]): string {
  if (parts.length === 0) return base;
  return base + "\n" + parts.map((p) => `    ${p}`).join("\n");
}

/**
 * Builds a Zod validation chain for text-like fields (text, textarea, password, tel).
 * @param {TextField | TextareaField} field - The text field configuration
 * @param {TextValidation | TextareaValidation} validation - Validation rules
 * @returns {string} The generated Zod validation string
 */
export function buildZodTextLike(
  field: TextField | TextareaField,
  validation: TextValidation | TextareaValidation,
) {
  const requiredMessage = "This field is required";
  const invalidMessage = "Invalid value";

  const base = `z.string({
    error: (issue) => issue.input === undefined ? ${q(requiredMessage)} : ${q(invalidMessage)}
  })`;

  const parts: string[] = [`.trim()`];

  if (field.required) {
    parts.push(`.min(1, { error: ${q(requiredMessage)} })`);
  }

  if (validation.minLength.value !== null) {
    parts.push(`.min(${validation.minLength.value}, { error: ${q(validation.minLength.errorMessage)} })`);
  }

  if (validation.maxLength.value !== null) {
    parts.push(`.max(${validation.maxLength.value}, { error: ${q(validation.maxLength.errorMessage)} })`);
  }

  if ("pattern" in validation && validation.pattern.value !== "") {
    parts.push(`.regex(new RegExp(${q(validation.pattern.value)}), { error: ${q(validation.pattern.errorMessage)} })`);
  }

  if (!field.required) {
    parts.push(`.optional()`);
  }

  const inner = formatChain(base, parts);

  return inner;
}

/**
 * Builds a Yup validation chain for text-like fields.
 * @param {TextField | TextareaField} field - The text field configuration
 * @param {TextValidation | TextareaValidation} validation - Validation rules
 * @returns {string} The generated Yup validation string
 */
export function buildYupTextLike(
  field: TextField | TextareaField,
  validation: TextValidation | TextareaValidation,
) {
  const parts: string[] = [`.trim()`];

  if (!field.required) {
    parts.push(`.transform(${yupBlankToUndefined})`);
  }

  if (validation.minLength.value !== null) {
    parts.push(`.min(${validation.minLength.value}, ${q(validation.minLength.errorMessage)})`);
  }

  if (validation.maxLength.value !== null) {
    parts.push(`.max(${validation.maxLength.value}, ${q(validation.maxLength.errorMessage)})`);
  }

  if ("pattern" in validation && validation.pattern.value !== "") {
    parts.push(`.matches(new RegExp(${q(validation.pattern.value)}), ${q(validation.pattern.errorMessage)})`);
  }

  parts.push(field.required ? `.required(${q("This field is required")})` : `.notRequired()`);

  return formatChain(`yup.string()`, parts);
}

/**
 * Generated Zod preprocess function to convert NaN to undefined.
 */
export const zodNaNToUndefined = `(val) => (typeof val === "number" && Number.isNaN(val)) ? undefined : val`;

/**
 * Builds a Zod validation chain for number fields.
 * @param {NumberValidation} validation - Validation rules for the number
 * @param {boolean} required - Whether the field is required
 * @returns {string} The generated Zod validation string
 */
export function buildZodNumber(validation: NumberValidation, required: boolean) {
  const base = `z.number({
    error: (issue) => issue.input === undefined ? ${q("This field is required")} : ${q("Must be a number")}
  })`;

  const parts: string[] = [];

  if (validation.positive.value) {
    parts.push(`.positive({ error: ${q(validation.positive.errorMessage)} })`);
  }

  if (validation.integer.value) {
    parts.push(`.int({ error: ${q(validation.integer.errorMessage)} })`);
  }

  if (validation.min.value !== null) {
    parts.push(`.min(${validation.min.value}, { error: ${q(validation.min.errorMessage)} })`);
  }

  if (validation.max.value !== null) {
    parts.push(`.max(${validation.max.value}, { error: ${q(validation.max.errorMessage)} })`);
  }

  if (!required) {
    parts.push(`.optional()`);
  }

  const inner = formatChain(base, parts);
  return `z.preprocess(\n    ${zodNaNToUndefined},\n    ${inner.split("\\n").join("\\n    ")}\n  )`;
}

/**
 * Builds a Yup validation chain for number fields.
 * @param {NumberValidation} validation - Validation rules for the number
 * @param {boolean} required - Whether the field is required
 * @returns {string} The generated Yup validation string
 */
export function buildYupNumber(validation: NumberValidation, required: boolean) {
  const base = `yup.number()
    .transform((value, originalValue) => {
      if (originalValue == null || originalValue === "") return undefined;
      return Number.isNaN(value) ? undefined : value;
    })`;

  const parts: string[] = [];

  if (validation.positive.value) {
    parts.push(`.positive(${q(validation.positive.errorMessage)})`);
  }

  if (validation.integer.value) {
    parts.push(`.integer(${q(validation.integer.errorMessage)})`);
  }

  if (validation.min.value !== null) {
    parts.push(`.min(${validation.min.value}, ${q(validation.min.errorMessage)})`);
  }

  if (validation.max.value !== null) {
    parts.push(`.max(${validation.max.value}, ${q(validation.max.errorMessage)})`);
  }

  parts.push(required ? `.required(${q("This field is required")})` : `.notRequired()`);

  return formatChain(base, parts);
}

/**
 * Builds a Zod validation chain for fields with predefined options (select, radio).
 * @param {string[]} values - Array of allowed option values
 * @param {string} requiredMessage - Error message for missing required field
 * @param {string} invalidMessage - Error message for invalid selection
 * @param {boolean} required - Whether the field is required
 * @returns {string} The generated Zod validation string
 */
export function buildZodOptionString(values: string[], requiredMessage: string, invalidMessage: string, required: boolean) {
  const base = `z.string({
    error: (issue) => issue.input === undefined ? ${q(requiredMessage)} : ${q(invalidMessage)}
  })`;

  const parts: string[] = [
    `.trim()`,
  ];

  if (required) {
    parts.push(`.min(1, { error: ${q(requiredMessage)} })`);
    parts.push(`.refine((value) => ${allowedCheck(values)}, { error: ${q(invalidMessage)} })`);
  } else {
    parts.push(`.refine((value) => value === "" || ${allowedCheck(values)}, { error: ${q(invalidMessage)} })`);
    parts.push(`.transform(v => v === "" ? undefined : v)`);
    parts.push(`.optional()`);
  }

  const inner = formatChain(base, parts);

  return inner;
}

/**
 * Builds a Yup validation chain for fields with predefined options.
 * @param {string[]} values - Array of allowed option values
 * @param {string} requiredMessage - Error message for missing required field
 * @param {string} invalidMessage - Error message for invalid selection
 * @param {boolean} required - Whether the field is required
 * @returns {string} The generated Yup validation string
 */
export function buildYupOptionString(values: string[], requiredMessage: string, invalidMessage: string, required: boolean) {
  const parts: string[] = [`.trim()`];

  if (!required) {
    parts.push(`.transform(${yupBlankToUndefined})`);
  }

  parts.push(`.test("valid-option", ${q(invalidMessage)}, (value) => !value || ${JSON.stringify(values)}.includes(value))`);
  parts.push(required ? `.required(${q(requiredMessage)})` : `.notRequired()`);

  return formatChain(`yup.string()`, parts);
}