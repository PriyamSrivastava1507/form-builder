import type { FieldSchema } from "@/types/field";
import { asKey, q } from "./schemaHelper";
import { sanitizeName } from "./sanitizeName";

/**
 * Generates a stringified object literal representing the default values for an array of fields.
 * Extracted values are typed based on field type and whether the output is TypeScript.
 *
 * @param {FieldSchema[]} fields - Array of fields to extract default values from.
 * @param {number} [indent=4] - Number of spaces to indent the generated object entries.
 * @param {boolean} [isTS=false] - Whether to generate TypeScript specific syntax (e.g. `as string`).
 * @returns {string} Stringified code for the default values object.
 */
export function collectDefaultValues(fields: FieldSchema[], indent: number = 4, isTS: boolean = false): string {
  const entries: string[] = [];

  for (const field of fields) {
    if (field.type === "file") continue;

    const name = sanitizeName(field.name);

    if (field.type === "text") {
      if (field.subtype === "number") {
        if (field.defaultValue === null) entries.push(`${asKey(name)}: ${field.validations.min.value ?? 0}`);
        else entries.push(`${asKey(name)}: ${field.defaultValue}`);
      } else {
        entries.push(`${asKey(name)}: ${q(field.defaultValue ?? "")}`);
      }
      continue;
    }

    if (field.type === "textarea") {
      entries.push(`${asKey(name)}: ${q(field.defaultValue ?? "")}`);
      continue;
    }

    if (field.type === "select") {
      if (field.multiselect) {
        entries.push(`${asKey(name)}: ${JSON.stringify(field.defaultValue ?? [])}`);
      } else {
        const val = field.defaultValue?.[0] ?? "";
        const cast = (val === "" && isTS) ? " as string" : "";
        entries.push(`${asKey(name)}: ${q(val)}${cast}`);
      }
      continue;
    }

    if (field.type === "radioGroup") {
      const val = field.defaultValue ?? "";
      const cast = (val === "" && isTS) ? " as string" : "";
      entries.push(`${asKey(name)}: ${q(val)}${cast}`);
      continue;
    }

    if (field.type === "checkbox") {
      entries.push(`${asKey(name)}: ${field.defaultValue}`);
      continue;
    }

    if (field.type === "checkboxGroup") {
      entries.push(`${asKey(name)}: ${JSON.stringify(field.defaultValue ?? [])}`);
      continue;
    }

    if (field.type === "date") {
      entries.push(`${asKey(name)}: ${q(field.defaultValue ?? "")}`);
      continue;
    }

    if (field.type === "range") {
      const value = field.defaultValue ?? field.validations.min.value;
      entries.push(`${asKey(name)}: ${value}`);
      continue;
    }
  }

  if (entries.length === 0) return "{}";

  const entryIndent = " ".repeat(indent + 2);
  const closingIndent = " ".repeat(indent);

  return `{\n${entries.map((e) => `${entryIndent}${e},`).join("\n")}\n${closingIndent}}`;
}