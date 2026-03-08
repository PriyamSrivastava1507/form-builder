import type {
    TextValidation,
    NumberValidation,
    TextareaValidation,
    CheckboxGroupValidation,
    DateValidation,
    FileValidation,
    RangeValidation
} from "./fieldValidation";

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

export type TextSubtype = 'text'
    | 'email'
    | 'password'
    | 'number'
    | 'tel'
    | 'url';

export type FieldOption = {
    label: string;
    value: string;
};

type BaseField = {
    id: string;
    label: string;
    required: boolean;
    placeholder?: string;
};

type TextBaseField = BaseField & {
    type: 'text';
}

export type PlainTextField = TextBaseField & {
    subtype: 'text';
    validations: TextValidation;
}

export type NumberTextField = TextBaseField & {
    subtype: 'number';
    validations: NumberValidation;
}

export type EmailTextField = TextBaseField & {
    subtype: 'email';
    validations: Record<string, never>;
}

export type PasswordTextField = TextBaseField & {
    subtype: 'password';
    validations: TextValidation;
}

export type TelTextField = TextBaseField & {
    subtype: 'tel';
    validations: TextValidation;
}

export type UrlTextField = TextBaseField & {
    subtype: 'url';
    validations: Record<string, never>;
}

export type TextField = PlainTextField
    | NumberTextField
    | EmailTextField
    | PasswordTextField
    | TelTextField
    | UrlTextField;

export type TextareaField = BaseField & {
    type: 'textarea';
    validations: TextareaValidation;
};

export type SelectField = BaseField & {
    type: 'select';
    options: FieldOption[];
    validations: Record<string, never>;
};

export type RadioField = BaseField & {
    type: 'radio';
    options: FieldOption[];
    validations: Record<string, never>;
};

export type CheckboxField = BaseField & {
    type: 'checkbox';
    validations: Record<string, never>;
};

export type CheckboxGroupField = BaseField & {
    type: 'checkbox-group';
    options: FieldOption[];
    validations: CheckboxGroupValidation;
};

export type DateField = BaseField & {
    type: 'date';
    validations: DateValidation;
};

export type FileField = BaseField & {
    type: 'file';
    validations: FileValidation;
};

export type RangeField = BaseField & {
    type: 'range';
    validations: RangeValidation;
};

export type SwitchField = BaseField & {
    type: 'switch';
    validations: Record<string, never>;
};

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



