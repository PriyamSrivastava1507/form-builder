import type { CheckboxField, CheckboxGroupField, DateField, FieldSchema, FileField, RadioGroupField, RangeField, SelectField, TextareaField, TextField } from "@/types/field";
import type { CheckboxGroupValidation, DateValidation, FileValidation, NumberValidation, RangeValidation, TextareaValidation, TextValidation } from "@/types/fieldValidation";
import { asKey, buildYupNumber, buildYupOptionString, buildYupTextLike, fileAcceptedCheck, optionValues, q, yupBlankToUndefined, yupFileListToFile } from "../schemaHelper";
import { sanitizeName } from "../sanitizeName";

export function yupText(field: TextField & { subtype: "text" | "password" | "tel" }) {
  const v = field.validations as TextValidation;
  return `  ${asKey(sanitizeName(field.name))}: ${buildYupTextLike(field, v)},`;
}

export function yupTextarea(field: TextareaField) {
  const v = field.validations as TextareaValidation;
  return `  ${asKey(sanitizeName(field.name))}: ${buildYupTextLike(field, v)},`;
}

export function yupEmail(field: TextField & { subtype: "email" }) {
  const parts: string[] = [
    `.trim()`,
  ];

  if (!field.required) {
    parts.push(`.transform(${yupBlankToUndefined})`);
  }

  parts.push(`.email(${q("Invalid email address")})`);
  parts.push(field.required ? `.required(${q("This field is required")})` : `.notRequired()`);

  const schema = `yup.string()` + "\n" + parts.map((p) => `    ${p}`).join("\n");
  return `  ${asKey(sanitizeName(field.name))}: ${schema},`;
}

export function yupUrl(field: TextField & { subtype: "url" }) {
  const parts: string[] = [
    `.trim()`,
  ];

  if (!field.required) {
    parts.push(`.transform(${yupBlankToUndefined})`);
  }

  parts.push(`.url(${q("Invalid URL")})`);
  parts.push(field.required ? `.required(${q("This field is required")})` : `.notRequired()`);

  const schema = `yup.string()` + "\n" + parts.map((p) => `    ${p}`).join("\n");
  return `  ${asKey(sanitizeName(field.name))}: ${schema},`;
}

export function yupNumber(field: TextField & { subtype: "number" }) {
  const v = field.validations as NumberValidation;
  return `  ${asKey(sanitizeName(field.name))}: ${buildYupNumber(v, !!field.required)},`;
}

export function yupSelect(field: SelectField) {
  const values = optionValues(field);
  const requiredMessage = field.multiselect
    ? "Please select at least one option"
    : "Please select an option";

  const invalidMessage = "Invalid option";

  if (field.multiselect) {
    const inner = values.length
      ? `yup.string()\n      .test("valid-option", ${q(invalidMessage)}, (value) => !value || ${JSON.stringify(values)}.includes(value))`
      : `yup.string()`;

    const parts: string[] = [];
    if (field.required) {
      parts.push(`.min(1, ${q(requiredMessage)})`);
      parts.push(`.required(${q("This field is required")})`);
    } else {
      parts.push(`.notRequired()`);
    }

    const schema = `yup.array()\n    .of(${inner})` +
      "\n" + parts.map((p) => `    ${p}`).join("\n");

    return `  ${asKey(sanitizeName(field.name))}: ${schema},`;
  }

  if (values.length > 0) {
    const schema = buildYupOptionString(values, requiredMessage, invalidMessage, !!field.required);
    return `  ${asKey(sanitizeName(field.name))}: ${schema},`;
  }

  const parts: string[] = [`.trim()`];
  if (!field.required) {
    parts.push(`.transform(${yupBlankToUndefined})`);
  }
  parts.push(field.required ? `.required(${q(requiredMessage)})` : `.notRequired()`);

  const schema = `yup.string()` + "\n" + parts.map((p) => `    ${p}`).join("\n");
  return `  ${asKey(sanitizeName(field.name))}: ${schema},`;
}

export function yupRadioGroup(field: RadioGroupField) {
  const values = optionValues(field);
  const requiredMessage = "Please select an option";
  const invalidMessage = "Invalid option";

  if (values.length > 0) {
    const schema = buildYupOptionString(values, requiredMessage, invalidMessage, !!field.required);
    return `  ${asKey(sanitizeName(field.name))}: ${schema},`;
  }

  const schema = field.required
    ? `yup.string()\n    .trim()\n    .required(${q(requiredMessage)})`
    : `yup.string()\n    .trim()\n    .transform(${yupBlankToUndefined})\n    .notRequired()`;

  return `  ${asKey(sanitizeName(field.name))}: ${schema},`;
}

export function yupCheckbox(field: CheckboxField) {
  const schema = field.required
    ? `yup.boolean()\n    .oneOf([true], ${q("This field is required")})`
    : `yup.boolean()\n    .notRequired()`;

  return `  ${asKey(sanitizeName(field.name))}: ${schema},`;
}

export function yupCheckboxGroup(field: CheckboxGroupField) {
  const v = field.validations as CheckboxGroupValidation;

  const parts: string[] = [];

  if (v.minSelected.value !== null) {
    parts.push(`.min(${v.minSelected.value}, ${q(v.minSelected.errorMessage)})`);
  } else if (field.required) {
    parts.push(`.min(1, ${q("This field is required")})`);
  }

  if (v.maxSelected.value !== null) {
    parts.push(`.max(${v.maxSelected.value}, ${q(v.maxSelected.errorMessage)})`);
  }

  parts.push(field.required || v.minSelected.value !== null
    ? `.required(${q("This field is required")})`
    : `.notRequired()`);

  const schema = `yup.array()\n    .of(yup.string())` +
    "\n" + parts.map((p) => `    ${p}`).join("\n");

  return `  ${asKey(sanitizeName(field.name))}: ${schema},`;
}

export function yupDate(field: DateField) {
  const v = field.validations as DateValidation;

  const parts: string[] = [`.trim()`];

  if (!field.required) {
    parts.push(`.transform(${yupBlankToUndefined})`);
  }

  if (v.minDate.value !== "") {
    parts.push(`.test(
      "min-date",
      ${q(v.minDate.errorMessage)},
      (value) => !value || new Date(value) >= new Date(${q(v.minDate.value)})
    )`);
  }

  if (v.maxDate.value !== "") {
    parts.push(`.test(
      "max-date",
      ${q(v.maxDate.errorMessage)},
      (value) => !value || new Date(value) <= new Date(${q(v.maxDate.value)})
    )`);
  }

  parts.push(field.required ? `.required(${q("This field is required")})` : `.notRequired()`);

  const schema = `yup.string()` + "\n" + parts.map((p) => `    ${p}`).join("\n");
  return `  ${asKey(sanitizeName(field.name))}: ${schema},`;
}

export function yupFile(field: FileField) {
  const v = field.validations as FileValidation;

  const parts: string[] = [
    `.transform(${yupFileListToFile})`,
  ];

  parts.push(field.required
    ? `.required(${q("This field is required")})`
    : `.notRequired()`);

  if (v.minSize.value !== null) {
    parts.push(`.test(
      "min-size",
      ${q(v.minSize.errorMessage)},
      (file) => !file || (typeof File !== "undefined" && file instanceof File && file.size >= ${v.minSize.value})
    )`);
  }

  if (v.maxSize.value !== null) {
    parts.push(`.test(
      "max-size",
      ${q(v.maxSize.errorMessage)},
      (file) => !file || (typeof File !== "undefined" && file instanceof File && file.size <= ${v.maxSize.value})
    )`);
  }

  if (v.acceptMimeTypes.value.length > 0) {
    parts.push(`.test(
      "mime-types",
      ${q(v.acceptMimeTypes.errorMessage)},
      (file) => !file || (typeof File !== "undefined" && file instanceof File && ${fileAcceptedCheck("file", v.acceptMimeTypes.value)})
    )`);
  }

  if (v.acceptExtensions.value.length > 0) {
    parts.push(`.test(
      "extensions",
      ${q(v.acceptExtensions.errorMessage)},
      (file) => !file || (typeof File !== "undefined" && file instanceof File && ${fileAcceptedCheck("file", v.acceptExtensions.value)})
    )`);
  }

  const schema = `yup.mixed()` + "\n" + parts.map((p) => `    ${p}`).join("\n");
  return `  ${asKey(sanitizeName(field.name))}: ${schema},`;
}

export function yupRange(field: RangeField) {
  const v = field.validations as RangeValidation;

  const parts: string[] = [
    `.min(${v.min.value}, ${q(v.min.errorMessage)})`,
    `.max(${v.max.value}, ${q(v.max.errorMessage)})`,
    `.test(
      "step",
      ${q(v.step.errorMessage)},
      (value) => value == null || Math.abs((value - ${v.min.value}) % ${v.step.value}) < 0.000001
    )`,
    field.required ? `.required(${q("This field is required")})` : `.notRequired()`,
  ];

  const schema = `yup.number()
    .transform((value, originalValue) => {
      if (originalValue == null || originalValue === "") return undefined;
      return Number.isNaN(value) ? undefined : value;
    })` + "\n" + parts.map((p) => `    ${p}`).join("\n");

  return `  ${asKey(sanitizeName(field.name))}: ${schema},`;
}

export function generateYupField(field: FieldSchema): string {
  switch (field.type) {
    case "text":
      switch (field.subtype) {
        case "text":
        case "password":
        case "tel":
          return yupText(field);
        case "email":
          return yupEmail(field);
        case "url":
          return yupUrl(field);
        case "number":
          return yupNumber(field);
      }
      break;
    case "textarea":
      return yupTextarea(field);
    case "select":
      return yupSelect(field);
    case "radioGroup":
      return yupRadioGroup(field);
    case "checkbox":
      return yupCheckbox(field);
    case "checkboxGroup":
      return yupCheckboxGroup(field);
    case "date":
      return yupDate(field);
    case "file":
      return yupFile(field);
    case "range":
      return yupRange(field);
  }
}