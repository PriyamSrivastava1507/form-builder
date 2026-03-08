export type TextValidation = {
    minLength?: number;
    maxLength?: number;
    pattern?: string;
};

export type NumberValidation = {
    min?: number;
    max?: number;
    integer?: boolean;
    positive?: boolean;
};

export type TextareaValidation = {
    minLength?: number;
    maxLength?: number;
};

export type CheckboxGroupValidation = {
    minSelected?: number;
    maxSelected?: number;
};

export type DateValidation = {
    minDate?: string;
    maxDate?: string;
};

export type FileValidation = {
    maxSize?: number;
    accept?: string[];
};

export type RangeValidation = {
    min?: number;
    max?: number;
    step?: number;
};