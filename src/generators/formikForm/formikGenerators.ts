import type { CheckboxField, CheckboxGroupField, DateField, FieldSchema, FileField, RadioGroupField, RangeField, SelectField, TextareaField, TextField } from "@/types/field";
import { q } from "../schemaHelper";
import { sanitizeName } from "../sanitizeName";

export function formikText(field: TextField): string {
  const name = sanitizeName(field.name);
  const placeholder = field.placeholder ? `\n      placeholder=${q(field.placeholder)}` : "";

  return `
  <div>
    <label htmlFor="${name}">${field.label}${field.required ? " *" : ""}</label>
    <Field
      as="input"
      type="${field.subtype}"
      id="${name}"
      name="${name}"${placeholder}
      disabled={${field.disabled}}
    />
    <br/>
    <ErrorMessage name="${name}" component="span" />
  </div>
  <br/>`;
}

export function formikTextarea(field: TextareaField): string {
  const name = sanitizeName(field.name);
  const placeholder = field.placeholder ? `\n      placeholder=${q(field.placeholder)}` : "";

  return `
  <div>
    <label htmlFor="${name}">${field.label}${field.required ? " *" : ""}</label>
    <Field
      as="textarea"
      id="${name}"
      name="${name}"${placeholder}
      disabled={${field.disabled}}
    />
    <br/>
    <ErrorMessage name="${name}" component="span" />
  </div>
  <br/>`;
}

export function formikSelect(field: SelectField): string {
  const name = sanitizeName(field.name);
  const options = field.options
    .map(
      (opt) => `
        <option value="${opt.value}" disabled={${!!opt.disabled}}>
          ${opt.label}
        </option>`,
    )
    .join("");

  const multiple = field.multiselect ? `\n      multiple={true}` : "";

  return `
  <div>
    <label htmlFor="${name}">${field.label}${field.required ? " *" : ""}</label>
    <Field
      as="select"
      id="${name}"
      name="${name}"
      disabled={${field.disabled}}${multiple}
    >
      ${options}
    </Field>
    <br/>
    <ErrorMessage name="${name}" component="span" />
  </div>
  <br/>`;
}

export function formikRadioGroup(field: RadioGroupField): string {
  const name = sanitizeName(field.name);
  const options = field.options
    .map(
      (opt) => `
      <label htmlFor="${name}-${opt.value}">
        <Field
          type="radio"
          name="${name}"
          value="${opt.value}"
          id="${name}-${opt.value}"
          disabled={${opt.disabled || field.disabled}}
        />
        ${opt.label}
      </label>`,
    )
    .join("");

  return `
  <div>
    <fieldset>
      <legend>${field.label}${field.required ? " *" : ""}</legend>
      ${options}
      <br/>
      <ErrorMessage name="${name}" component="span" />
    </fieldset>
  </div>
  <br/>`;
}

export function formikCheckbox(field: CheckboxField): string {
  const name = sanitizeName(field.name);
  return `
  <div>
    <label htmlFor="${name}">
      <Field
        type="checkbox"
        name="${name}"
        id="${name}"
        disabled={${field.disabled}}
      />
      ${field.label}${field.required ? " *" : ""}
    </label>
    <br/>
    <ErrorMessage name="${name}" component="span" />
  </div>
  <br/>`;
}

export function formikCheckboxGroup(field: CheckboxGroupField): string {
  const name = sanitizeName(field.name);
  const options = field.options
    .map(
      (opt) => `
      <label htmlFor="${name}-${opt.value}">
        <Field
          type="checkbox"
          name="${name}"
          value="${opt.value}"
          id="${name}-${opt.value}"
          disabled={${opt.disabled || field.disabled}}
        />
        ${opt.label}
      </label>`,
    )
    .join("");

  return `
  <div>
    <fieldset>
      <legend>${field.label}${field.required ? " *" : ""}</legend>
      ${options}
      <br/>
      <ErrorMessage name="${name}" component="span" />
    </fieldset>
  </div>
  <br/>`;
}

export function formikDate(field: DateField): string {
  const name = sanitizeName(field.name);
  return `
  <div>
    <label htmlFor="${name}">${field.label}${field.required ? " *" : ""}</label>
    <Field
      type="date"
      name="${name}"
      id="${name}"
      disabled={${field.disabled}}
    />
    <br/>
    <ErrorMessage name="${name}" component="span" />
  </div>
  <br/>`;
}

export function formikFile(field: FileField): string {
  const name = sanitizeName(field.name);
  return `
  <div>
    <label htmlFor="${name}">${field.label}${field.required ? " *" : ""}</label>
    <input
      type="file"
      name="${name}"
      id="${name}"
      disabled={${field.disabled}}
      onChange={(e) => setFieldValue("${name}", e.currentTarget.files?.[0] ?? undefined)}
    />
    <br/>
    <ErrorMessage name="${name}" component="span" />
  </div>
  <br/>`;
}

export function formikRange(field: RangeField): string {
  const name = sanitizeName(field.name);
  return `
  <div>
    <label htmlFor="${name}">${field.label}${field.required ? " *" : ""}</label>
    <input
      type="range"
      id="${name}"
      name="${name}"
      min={${field.validations.min.value}}
      max={${field.validations.max.value}}
      step={${field.validations.step.value}}
      disabled={${field.disabled}}
      value={values.${name}}
      onChange={(e) => setFieldValue("${name}", parseFloat(e.target.value))}
    />
    <br/>
    <ErrorMessage name="${name}" component="span" />
  </div>
  <br/>`;
}

export function generateFormikField(field: FieldSchema): string {
  switch (field.type) {
    case "text":
      return formikText(field);
    case "textarea":
      return formikTextarea(field);
    case "select":
      return formikSelect(field);
    case "radioGroup":
      return formikRadioGroup(field);
    case "checkbox":
      return formikCheckbox(field);
    case "checkboxGroup":
      return formikCheckboxGroup(field);
    case "date":
      return formikDate(field);
    case "file":
      return formikFile(field);
    case "range":
      return formikRange(field);
  }
}
