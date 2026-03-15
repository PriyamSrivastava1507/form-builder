import { FIELD_DEFAULTS } from "../constants/fieldPalette";
import type { FieldSchema } from "../types/field";
import type { FieldConfigIdentifier } from "../types/palette";

export const createFieldFromDefaults = (fieldIdentifier: FieldConfigIdentifier): FieldSchema => {
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