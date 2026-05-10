import type { CheckboxField, CheckboxGroupField, DateField, FieldSchema, FileField, RadioGroupField, RangeField, SelectField, TextareaField, TextField } from "@/types/field";
import type { CheckboxGroupValidation, DateValidation, FileValidation, NumberValidation, RangeValidation, TextareaValidation, TextValidation } from "@/types/fieldValidation";
import { allowedCheck, asKey, buildZodNumber, buildZodOptionString, buildZodTextLike, fileAcceptedCheck, optionValues, q, zodFileListToFile, zodNaNToUndefined } from "../schemaHelper";
import { sanitizeName } from "../sanitizeName";

export function zodText(field: TextField & { subtype: "text" | "password" | "tel" }) {
  const v = field.validations as TextValidation;
  return `  ${asKey(sanitizeName(field.name))}: ${buildZodTextLike(field, v)},`;
}

export function zodTextarea(field: TextareaField) {
  const v = field.validations as TextareaValidation;
  return `  ${asKey(sanitizeName(field.name))}: ${buildZodTextLike(field, v)},`;
}

export function zodEmail(field: TextField & { subtype: "email" }) {
  const requiredMessage = "This field is required";
  const invalidMessage = "Invalid email address";

  const base = field.required
    ? `z.string({
    error: (issue) => issue.input === undefined ? ${q(requiredMessage)} : ${q("Invalid value")}
  })`
    : `z.string({ error: ${q("Invalid value")} })`;

  const parts: string[] = [`.trim()`];

  if (field.required) {
    parts.push(`.min(1, { error: ${q(requiredMessage)} })`);
    parts.push(`.pipe(z.email({ error: ${q(invalidMessage)} }))`);
  } else {
    parts.push(`.transform(v => v === "" ? undefined : v)`);
    parts.push(`.pipe(z.email({ error: ${q(invalidMessage)} }).optional())`);
  }

  const schema = base + "\n" + parts.map((p) => `    ${p}`).join("\n");

  return `  ${asKey(sanitizeName(field.name))}: ${schema},`;
}

export function zodUrl(field: TextField & { subtype: "url" }) {
  const requiredMessage = "This field is required";
  const invalidMessage = "Invalid URL";

  const base = field.required
    ? `z.string({
    error: (issue) => issue.input === undefined ? ${q(requiredMessage)} : ${q("Invalid value")}
  })`
    : `z.string({ error: ${q("Invalid value")} })`;

  const parts: string[] = [`.trim()`];

  if (field.required) {
    parts.push(`.min(1, { error: ${q(requiredMessage)} })`);
    parts.push(`.pipe(z.url({ error: ${q(invalidMessage)} }))`);
  } else {
    parts.push(`.transform(v => v === "" ? undefined : v)`);
    parts.push(`.pipe(z.url({ error: ${q(invalidMessage)} }).optional())`);
  }

  const schema = base + "\n" + parts.map((p) => `    ${p}`).join("\n");

  return `  ${asKey(sanitizeName(field.name))}: ${schema},`;
}

export function zodNumber(field: TextField & { subtype: "number" }) {
  const v = field.validations as NumberValidation;
  return `  ${asKey(sanitizeName(field.name))}: ${buildZodNumber(v, !!field.required)},`;
}

export function zodSelect(field: SelectField) {
  const values = optionValues(field);
  const requiredMessage = field.multiselect
    ? "Please select at least one option"
    : "Please select an option";

  const invalidMessage = "Invalid option";

  if (field.multiselect) {
    const element = values.length
      ? `z.string()\n      .trim()\n      .refine((value) => ${allowedCheck(values)}, { error: ${q(invalidMessage)} })`
      : `z.string()\n      .trim()`;

    const parts: string[] = [];
    if (field.required) {
      parts.push(`.min(1, { error: ${q(requiredMessage)} })`);
    } else {
      parts.push(`.optional()`);
    }

    const schema = `z.array(\n    ${element}\n  )` +
      (parts.length ? "\n" + parts.map((p) => `    ${p}`).join("\n") : "");

    return `  ${asKey(sanitizeName(field.name))}: ${schema},`;
  }

  if (values.length > 0) {
    const schema = buildZodOptionString(values, requiredMessage, invalidMessage, !!field.required);
    return `  ${asKey(sanitizeName(field.name))}: ${schema},`;
  }

  const fallbackInner = field.required
    ? `z.string({
    error: (issue) => issue.input === undefined ? ${q(requiredMessage)} : ${q(invalidMessage)}
  })
    .trim()
    .min(1, { error: ${q(requiredMessage)} })`
    : `z.string({ error: ${q(invalidMessage)} })
    .trim()
    .transform(v => v === "" ? undefined : v)
    .optional()`;

  const schema = fallbackInner;

  return `  ${asKey(sanitizeName(field.name))}: ${schema},`;
}

export function zodRadioGroup(field: RadioGroupField) {
  const values = optionValues(field);
  const requiredMessage = "Please select an option";
  const invalidMessage = "Invalid option";

  if (values.length > 0) {
    const schema = buildZodOptionString(values, requiredMessage, invalidMessage, !!field.required);
    return `  ${asKey(sanitizeName(field.name))}: ${schema},`;
  }

  const fallbackInner = field.required
    ? `z.string({
    error: (issue) => issue.input === undefined ? ${q(requiredMessage)} : ${q(invalidMessage)}
  })
    .trim()
    .min(1, { error: ${q(requiredMessage)} })`
    : `z.string({ error: ${q(invalidMessage)} })
    .trim()
    .transform(v => v === "" ? undefined : v)
    .optional()`;

  const schema = fallbackInner;

  return `  ${asKey(sanitizeName(field.name))}: ${schema},`;
}

export function zodCheckbox(field: CheckboxField) {
  const requiredMessage = "This field is required";

  const schema = field.required
    ? `z.boolean({
    error: (issue) => issue.input === undefined ? ${q(requiredMessage)} : ${q("Must be a boolean")}
  })
    .refine((value) => value === true, { error: ${q(requiredMessage)} })`
    : `z.boolean({ error: ${q("Must be a boolean")} })
    .optional()`;

  return `  ${asKey(sanitizeName(field.name))}: ${schema},`;
}

export function zodCheckboxGroup(field: CheckboxGroupField) {
  const v = field.validations as CheckboxGroupValidation;

  const parts: string[] = [];

  if (v.minSelected.value !== null) {
    parts.push(`.min(${v.minSelected.value}, { error: ${q(v.minSelected.errorMessage)} })`);
  } else if (field.required) {
    parts.push(`.min(1, { error: ${q("This field is required")} })`);
  }

  if (v.maxSelected.value !== null) {
    parts.push(`.max(${v.maxSelected.value}, { error: ${q(v.maxSelected.errorMessage)} })`);
  }

  if (!field.required && v.minSelected.value === null) {
    parts.push(`.optional()`);
  }

  const schema = `z.array(z.string())` +
    (parts.length ? "\n" + parts.map((p) => `    ${p}`).join("\n") : "");

  return `  ${asKey(sanitizeName(field.name))}: ${schema},`;
}

export function zodDate(field: DateField) {
  const v = field.validations as DateValidation;
  const requiredMessage = "This field is required";
  const invalidMessage = "Invalid date";

  const innerParts: string[] = [];

  if (v.minDate.value !== "") {
    innerParts.push(`.refine((value) => new Date(value) >= new Date(${q(v.minDate.value)}), { error: ${q(v.minDate.errorMessage)} })`);
  }

  if (v.maxDate.value !== "") {
    innerParts.push(`.refine((value) => new Date(value) <= new Date(${q(v.maxDate.value)}), { error: ${q(v.maxDate.errorMessage)} })`);
  }

  if (!field.required) {
    innerParts.push(`.optional()`);
  }

  const inner = `z.iso.date({
    error: (issue) => issue.input === undefined ? ${q(requiredMessage)} : ${q(invalidMessage)}
  })` + (innerParts.length ? "\n" + innerParts.map((p) => `    ${p}`).join("\n") : "");

  const schema = inner;

  return `  ${asKey(sanitizeName(field.name))}: ${schema},`;
}

export function zodFile(field: FileField) {
  const v = field.validations as FileValidation;
  const requiredMessage = "This field is required";
  const invalidMessage = "Invalid file";

  const parts: string[] = [];

  const customCheck = field.required
    ? `(val) => typeof File !== "undefined" && val instanceof File`
    : `(val) => val == null || (typeof File !== "undefined" && val instanceof File)`;
  const customError = field.required ? requiredMessage : invalidMessage;

  const innerBase = `z.custom<File>(${customCheck}, {\n    error: ${q(customError)}\n  })`;

  if (v.minSize.value !== null) {
    parts.push(`.refine(
      (file) => file == null || (file instanceof File && file.size >= ${v.minSize.value}),
      { error: ${q(v.minSize.errorMessage)} }
    )`);
  }

  if (v.maxSize.value !== null) {
    parts.push(`.refine(
      (file) => file == null || (file instanceof File && file.size <= ${v.maxSize.value}),
      { error: ${q(v.maxSize.errorMessage)} }
    )`);
  }

  if (v.acceptMimeTypes.value.length > 0) {
    parts.push(`.refine(
      (file) => file == null || (file instanceof File && ${fileAcceptedCheck("file", v.acceptMimeTypes.value)}),
      { error: ${q(v.acceptMimeTypes.errorMessage)} }
    )`);
  }

  if (v.acceptExtensions.value.length > 0) {
    parts.push(`.refine(
      (file) => file == null || (file instanceof File && ${fileAcceptedCheck("file", v.acceptExtensions.value)}),
      { error: ${q(v.acceptExtensions.errorMessage)} }
    )`);
  }

  if (!field.required) {
    parts.push(`.optional()`);
  }

  const innerFormatted = innerBase + (parts.length ? "\n" + parts.map((p) => `    ${p}`).join("\n") : "");

  const schema = `z.preprocess(
    ${zodFileListToFile},
    ${innerFormatted}
  )`;

  return `  ${asKey(sanitizeName(field.name))}: ${schema},`;
}

export function zodRange(field: RangeField) {
  const v = field.validations as RangeValidation;

  const innerParts: string[] = [
    `.min(${v.min.value}, { error: ${q(v.min.errorMessage)} })`,
    `.max(${v.max.value}, { error: ${q(v.max.errorMessage)} })`,
    `.refine(
      (value) => Math.abs((value - ${v.min.value}) % ${v.step.value}) < 0.000001,
      { error: ${q(v.step.errorMessage)} }
    )`,
  ];

  if (!field.required) {
    innerParts.push(`.optional()`);
  }

  const inner = `z.coerce.number({
    error: (issue) => issue.input === undefined ? ${q("This field is required")} : ${q("Must be a number")}
  })` + "\n" + innerParts.map((p) => `    ${p}`).join("\n");

  const schema = `z.preprocess(
    ${zodNaNToUndefined},
    ${inner.split("\\n").join("\\n    ")}
  )`;

  return `  ${asKey(sanitizeName(field.name))}: ${schema},`;
}

export function generateZodField(field: FieldSchema): string {
  switch (field.type) {
    case "text":
      switch (field.subtype) {
        case "text":
        case "password":
        case "tel":
          return zodText(field);
        case "email":
          return zodEmail(field);
        case "url":
          return zodUrl(field);
        case "number":
          return zodNumber(field);
      }
      break;
    case "textarea":
      return zodTextarea(field);
    case "select":
      return zodSelect(field);
    case "radioGroup":
      return zodRadioGroup(field);
    case "checkbox":
      return zodCheckbox(field);
    case "checkboxGroup":
      return zodCheckboxGroup(field);
    case "date":
      return zodDate(field);
    case "file":
      return zodFile(field);
    case "range":
      return zodRange(field);
  }
}