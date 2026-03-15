import { FIELD_DEFAULTS } from "../constants/fieldPalette";
import type { FieldSchema } from "../types/field";
import type { FieldConfigIdentifier } from "../types/palette";

/**
 * Creates a new form field instance populated with default properties
 * @param {FieldConfigIdentifier} fieldIdentifier - The type and optional subtype of the field to create
 * @returns {FieldSchema} A fully formed field object with a newly generated UUID
 */
export const createFieldFromDefaults = (fieldIdentifier: FieldConfigIdentifier): FieldSchema => {
    // Generate base field according to whether it is a text subtype or a standard type
    if (fieldIdentifier.type === "text") {
        return {
            id: crypto.randomUUID(),
            ...FIELD_DEFAULTS.text[fieldIdentifier.subtype]
        };
    }
    return {
        id: crypto.randomUUID(),
        ...FIELD_DEFAULTS[fieldIdentifier.type]
    };
};