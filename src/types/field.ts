import type {
    TextValidation,
    NumberValidation,
    TextareaValidation,
    CheckboxGroupValidation,
    DateValidation,
    FileValidation,
    RangeValidation
} from "./fieldValidation";

/**
 * All supported field types available in the form builder.
 */
export type FieldType = 'text'
    | 'textarea'
    | 'select'
    | 'radio'
    | 'checkbox'
    | 'checkbox-group'
    | 'date'
    | 'file'
    | 'range'
    | 'switch';

/**
 * Subtypes available for the 'text' field type.
 * Each subtype maps to a different HTML input type.
 */
export type TextSubtype = 'text'
    | 'email'
    | 'password'
    | 'number'
    | 'tel'
    | 'url';

/**
 * A label/value pair used by fields that present a list of choices
 * (select, radio, checkbox-group).
 */
export type FieldOption = {
    label: string; // Display text shown to the user
    value: string; // Underlying value submitted with the form
};

/**
 * Shared properties common to every field in the form schema.
 */
type BaseField = {
    id: string;           // Unique identifier for the field
    label: string;        // Display label shown above the input
    required: boolean;    // Whether the field must be filled before submission
    placeholder?: string; // Hint text shown inside the input when empty
};

/**
 * Internal base for all text-type field variants.
 * Locks the discriminant `type` to 'text'.
 */
type TextBaseField = BaseField & {
    type: 'text';
}

/**
 * Plain text input field (HTML `<input type="text">`).
 */
export type PlainTextField = TextBaseField & {
    subtype: 'text';
    validations: TextValidation;
}

/**
 * Numeric text input field (HTML `<input type="number">`).
 */
export type NumberTextField = TextBaseField & {
    subtype: 'number';
    validations: NumberValidation;
}

/**
 * Email text input field (HTML `<input type="email">`).
 * Browser handles format validation; no custom validations needed.
 */
export type EmailTextField = TextBaseField & {
    subtype: 'email';
    validations: Record<string, never>;
}

/**
 * Password text input field (HTML `<input type="password">`).
 */
export type PasswordTextField = TextBaseField & {
    subtype: 'password';
    validations: TextValidation;
}

/**
 * Telephone text input field (HTML `<input type="tel">`).
 */
export type TelTextField = TextBaseField & {
    subtype: 'tel';
    validations: TextValidation;
}

/**
 * URL text input field (HTML `<input type="url">`).
 * Browser handles format validation; no custom validations needed.
 */
export type UrlTextField = TextBaseField & {
    subtype: 'url';
    validations: Record<string, never>;
}

/**
 * Discriminated union of all text-field subtypes.
 * Discriminant: `subtype`.
 */
export type TextField = PlainTextField
    | NumberTextField
    | EmailTextField
    | PasswordTextField
    | TelTextField
    | UrlTextField;

/**
 * Multi-line text input field (HTML `<textarea>`).
 */
export type TextareaField = BaseField & {
    type: 'textarea';
    validations: TextareaValidation;
};

/**
 * Dropdown select field (HTML `<select>`).
 */
export type SelectField = BaseField & {
    type: 'select';
    options: FieldOption[];
    validations: Record<string, never>;
};

/**
 * Radio button group field.
 * Only one option can be selected at a time.
 */
export type RadioField = BaseField & {
    type: 'radio';
    options: FieldOption[];
    validations: Record<string, never>;
};

/**
 * Single checkbox field (boolean toggle).
 */
export type CheckboxField = BaseField & {
    type: 'checkbox';
    validations: Record<string, never>;
};

/**
 * Group of checkboxes allowing multiple selections.
 */
export type CheckboxGroupField = BaseField & {
    type: 'checkbox-group';
    options: FieldOption[];
    validations: CheckboxGroupValidation;
};

/**
 * Date picker field (HTML `<input type="date">`).
 */
export type DateField = BaseField & {
    type: 'date';
    validations: DateValidation;
};

/**
 * File upload field (HTML `<input type="file">`).
 */
export type FileField = BaseField & {
    type: 'file';
    validations: FileValidation;
};

/**
 * Range slider field (HTML `<input type="range">`).
 */
export type RangeField = BaseField & {
    type: 'range';
    validations: RangeValidation;
};

/**
 * Toggle switch field (rendered as a styled checkbox).
 * No custom validations needed.
 */
export type SwitchField = BaseField & {
    type: 'switch';
    validations: Record<string, never>;
};

/**
 * Discriminated union of every possible form field.
 * Discriminant: `type` (and `subtype` for TextField variants).
 * This is the primary type used by the form store.
 */
export type FieldSchema = TextField
    | TextareaField
    | SelectField
    | RadioField
    | CheckboxField
    | CheckboxGroupField
    | DateField
    | FileField
    | RangeField
    | SwitchField;
