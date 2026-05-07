/**
 * Shared length constraints reused by text-based validation types.
 */
type LengthValidation = {
    minLength: {value: number | null, errorMessage: string};  // Minimum character count allowed
    maxLength: {value: number | null, errorMessage: string};  // Maximum character count allowed
}

/**
 * Validation rules for text-based input fields (text, password, tel).
 */
export type TextValidation = LengthValidation & {
    pattern: {value: string, errorMessage: string};    // Regex pattern the value must match
};

/**
 * Validation rules for numeric text inputs (subtype 'number').
 */
export type NumberValidation = {
    min: {value: number | null, errorMessage: string};      // Minimum numeric value allowed
    max: {value: number | null, errorMessage: string};      // Maximum numeric value allowed
    integer: {value: boolean, errorMessage: string}; // Whether only whole numbers are accepted
    positive: {value: boolean, errorMessage: string}; // Whether only positive numbers are accepted
};

/**
 * Validation rules for textarea fields.
 */
export type TextareaValidation = LengthValidation;

/**
 * Validation rules for checkbox-group fields.
 */
export type CheckboxGroupValidation = {
    minSelected: {value: number | null, errorMessage: string}; // Minimum number of options that must be checked
    maxSelected: {value: number | null, errorMessage: string}; // Maximum number of options that can be checked
};

/**
 * Validation rules for date picker fields.
 */
export type DateValidation = {
    minDate: {value: string, errorMessage: string}; // Earliest selectable date (ISO 8601 string)
    maxDate: {value: string, errorMessage: string}; // Latest selectable date (ISO 8601 string)
};

/**
 * Validation rules for file upload fields.
 */
export type FileValidation = {
    minSize: {value: number | null, errorMessage: string};   // Minimum file size in bytes
    maxSize: {value: number | null, errorMessage: string};   // Maximum file size in bytes
    acceptMimeTypes: {value: string[], errorMessage: string};  // Allowed MIME types or extensions (e.g. ['image/png', '.pdf'])
    acceptExtensions: {value: string[], errorMessage: string};  // Allowed file extensions (e.g. ['.png', '.pdf'])
};

/**
 * Validation rules for range (slider) fields.
 */
export type RangeValidation = {
    min: {value: number, errorMessage: string};  // Minimum slider value
    max: {value: number, errorMessage: string};  // Maximum slider value
    step: {value: number, errorMessage: string}; // Increment between selectable values
};

/**
 * Empty validation type for fields that require no custom constraints
 * (e.g. select, radio, checkbox, email, url, switch).
 */
export type NoValidation = Record<string, never>;