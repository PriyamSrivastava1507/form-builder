/**
 * Validation rules for text-based input fields (text, password, tel).
 */
export type TextValidation = {
    minLength?: number;  // Minimum character count allowed
    maxLength?: number;  // Maximum character count allowed
    pattern?: string;    // Regex pattern the value must match
};

/**
 * Validation rules for numeric text inputs (subtype 'number').
 */
export type NumberValidation = {
    min?: number;      // Minimum numeric value allowed
    max?: number;      // Maximum numeric value allowed
    integer?: boolean; // Whether only whole numbers are accepted
    positive?: boolean; // Whether only positive numbers are accepted
};

/**
 * Validation rules for textarea fields.
 */
export type TextareaValidation = {
    minLength?: number; // Minimum character count allowed
    maxLength?: number; // Maximum character count allowed
};

/**
 * Validation rules for checkbox-group fields.
 */
export type CheckboxGroupValidation = {
    minSelected?: number; // Minimum number of options that must be checked
    maxSelected?: number; // Maximum number of options that can be checked
};

/**
 * Validation rules for date picker fields.
 */
export type DateValidation = {
    minDate?: string; // Earliest selectable date (ISO 8601 string)
    maxDate?: string; // Latest selectable date (ISO 8601 string)
};

/**
 * Validation rules for file upload fields.
 */
export type FileValidation = {
    maxSize?: number;   // Maximum file size in bytes
    accept?: string[];  // Allowed MIME types or extensions (e.g. ['image/png', '.pdf'])
};

/**
 * Validation rules for range (slider) fields.
 */
export type RangeValidation = {
    min?: number;  // Minimum slider value
    max?: number;  // Maximum slider value
    step?: number; // Increment between selectable values
};