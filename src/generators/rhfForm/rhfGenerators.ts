import type { CheckboxField, CheckboxGroupField, DateField, FieldSchema, FileField, RadioGroupField, RangeField, SelectField, TextareaField, TextField } from "@/types/field";
import { q } from "../schemaHelper";
import { sanitizeName } from "../sanitizeName";

export function rhfText(field: TextField): string {
  const name = sanitizeName(field.name);
  const registerPart =
    field.subtype === "number"
      ? `{...register("${name}", { valueAsNumber: true })}`
      : `{...register("${name}")}`;

  const placeholder = field.placeholder ? `\n      placeholder=${q(field.placeholder)}` : "";

  return `
  <div>
    <label htmlFor="${name}">${field.label}${field.required ? " *" : ""}</label>
    <input
      type="${field.subtype}"
      id="${name}"${placeholder}
      disabled={${field.disabled}}
      ${registerPart}
    />
    <br/>
    {errors.${name} && <span role="alert">{errors.${name}.message}</span>}
  </div>
  <br/>`;
}

export function rhfTextarea(field: TextareaField): string {
  const name = sanitizeName(field.name);
  const placeholder = field.placeholder ? `\n      placeholder=${q(field.placeholder)}` : "";

  return `
  <div>
    <label htmlFor="${name}">${field.label}${field.required ? " *" : ""}</label>
    <textarea
      id="${name}"${placeholder}
      disabled={${field.disabled}}
      {...register("${name}")}
    ></textarea>
    <br/>
    {errors.${name} && <span role="alert">{errors.${name}.message}</span>}
  </div>
  <br/>`;
}

export function rhfSelect(field: SelectField): string {
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
  const size = field.size ? `\n      size={${field.size}}` : "";

  return `
  <div>
    <label htmlFor="${name}">${field.label}${field.required ? " *" : ""}</label>
    <select
      id="${name}"
      disabled={${field.disabled}}${multiple}${size}
      {...register("${name}")}
    >
      ${options}
    </select>
    <br/>
    {errors.${name} && <span role="alert">{errors.${name}.message}</span>}
  </div>
  <br/>`;
}

export function rhfRadioGroup(field: RadioGroupField): string {
  const name = sanitizeName(field.name);
  const options = field.options
    .map(
      (opt) => `
      <label htmlFor="${name}-${opt.value}">
        <input
          type="radio"
          id="${name}-${opt.value}"
          value="${opt.value}"
          disabled={${opt.disabled || field.disabled}}
          {...register("${name}")}
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
      {errors.${name} && <span role="alert">{errors.${name}.message}</span>}
    </fieldset>
  </div>
  <br/>`;
}

export function rhfCheckbox(field: CheckboxField): string {
  const name = sanitizeName(field.name);
  return `
  <div>
    <label htmlFor="${name}">
      <input
        type="checkbox"
        id="${name}"
        disabled={${field.disabled}}
        {...register("${name}")}
      />
      ${field.label}${field.required ? " *" : ""}
    </label>
    <br/>
    {errors.${name} && <span role="alert">{errors.${name}.message}</span>}
  </div>
  <br/>`;
}

export function rhfCheckboxGroup(field: CheckboxGroupField): string {
  const name = sanitizeName(field.name);
  const options = field.options
    .map(
      (opt) => `
      <label htmlFor="${name}-${opt.value}">
        <input
          type="checkbox"
          id="${name}-${opt.value}"
          value="${opt.value}"
          disabled={${opt.disabled || field.disabled}}
          {...register("${name}")}
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
      {errors.${name} && <span role="alert">{errors.${name}.message}</span>}
    </fieldset>
  </div>
  <br/>`;
}

export function rhfDate(field: DateField): string {
  const name = sanitizeName(field.name);
  return `
  <div>
    <label htmlFor="${name}">${field.label}${field.required ? " *" : ""}</label>
    <input
      type="date"
      id="${name}"
      disabled={${field.disabled}}
      {...register("${name}")}
    />
    <br/>
    {errors.${name} && <span role="alert">{errors.${name}.message}</span>}
  </div>
  <br/>`;
}

export function rhfFile(field: FileField): string {
  const name = sanitizeName(field.name);
  return `
  <div>
    <label htmlFor="${name}">${field.label}${field.required ? " *" : ""}</label>
    <input
      type="file"
      id="${name}"
      disabled={${field.disabled}}
      {...register("${name}")}
    />
    <br/>
    {errors.${name} && <span role="alert">{errors.${name}.message}</span>}
  </div>
  <br/>`;
}

export function rhfRange(field: RangeField): string {
  const name = sanitizeName(field.name);
  return `
  <div>
    <label htmlFor="${name}">${field.label}${field.required ? " *" : ""}</label>
    <input
      type="range"
      id="${name}"
      min={${field.validations.min.value}}
      max={${field.validations.max.value}}
      step={${field.validations.step.value}}
      disabled={${field.disabled}}
      {...register("${name}", { valueAsNumber: true })}
    />
    <br/>
    {errors.${name} && <span role="alert">{errors.${name}.message}</span>}
  </div>
  <br/>`;
}

export function generateRHFField(field: FieldSchema): string {
  switch (field.type) {
    case "text":
      return rhfText(field);
    case "textarea":
      return rhfTextarea(field);
    case "select":
      return rhfSelect(field);
    case "radioGroup":
      return rhfRadioGroup(field);
    case "checkbox":
      return rhfCheckbox(field);
    case "checkboxGroup":
      return rhfCheckboxGroup(field);
    case "date":
      return rhfDate(field);
    case "file":
      return rhfFile(field);
    case "range":
      return rhfRange(field);
  }
}