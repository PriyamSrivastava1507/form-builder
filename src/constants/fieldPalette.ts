import { AtSign, Binary, CalendarDays, ChevronDownCircle, Disc, FileTypeCorner, Gauge, LayoutGrid, Link2, LockKeyhole, Phone, SquareCheck, Type, Upload } from "lucide-react";
import type { FieldDefaults, FieldIcons, PaletteGroupConfig } from "../types/palette";

export const FIELD_ICONS: FieldIcons = {
    text: {
        text: Type,
        number: Binary,
        email: AtSign,
        password: LockKeyhole,
        tel: Phone,
        url: Link2,
    },
    textarea: FileTypeCorner,
    select: ChevronDownCircle,
    radioGroup: Disc,
    checkbox: SquareCheck,
    checkboxGroup: LayoutGrid,
    date: CalendarDays,
    file: Upload,
    range: Gauge
}

/**
 * Grouped configuration of all available fields in the sidebar palette
 */
export const FIELD_PALETTE_CONFIG: PaletteGroupConfig[] = [
    {
        label: "Text Inputs",
        items: [
            {
                label: "Text",
                icon: FIELD_ICONS.text.text,
                fieldConfig: {
                    type: "text",
                    subtype: "text",
                }
            },
            {
                label: "Number",
                icon: FIELD_ICONS.text.number,
                fieldConfig: {
                    type: "text",
                    subtype: "number",
                }
            },
            {
                label: "Email",
                icon: FIELD_ICONS.text.email,
                fieldConfig: {
                    type: "text",
                    subtype: "email",
                }
            },
            {
                label: "Password",
                icon: FIELD_ICONS.text.password,
                fieldConfig: {
                    type: "text",
                    subtype: "password",
                }
            },
            {
                label: "Tel",
                icon: FIELD_ICONS.text.tel,
                fieldConfig: {
                    type: "text",
                    subtype: "tel",
                }
            },
            {
                label: "URL",
                icon: FIELD_ICONS.text.url,
                fieldConfig: {
                    type: "text",
                    subtype: "url",
                }
            },
            {
                label: "Textarea",
                icon: FIELD_ICONS.textarea,
                fieldConfig: {
                    type: "textarea",
                }
            },
        ]
    },
    {
        label: "Choices",
        items: [
            {
                label: "Select",
                icon: FIELD_ICONS.select,
                fieldConfig: {
                    type: "select",
                }
            },
            {
                label: "Radio Group",
                icon: FIELD_ICONS.radioGroup,
                fieldConfig: {
                    type: "radioGroup",
                }
            },
            {
                label: "Checkbox",
                icon: FIELD_ICONS.checkbox,
                fieldConfig: {
                    type: "checkbox",
                }
            },
            {
                label: "Checkbox Group",
                icon: FIELD_ICONS.checkboxGroup,
                fieldConfig: {
                    type: "checkboxGroup",
                }
            },
        ]
    },
    {
        label: "Date",
        items: [
            {
                label: "Date",
                icon: FIELD_ICONS.date,
                fieldConfig: {
                    type: "date",
                }
            },
        ]
    },
    {
        label: "File",
        items: [
            {
                label: "File",
                icon: FIELD_ICONS.file,
                fieldConfig: {
                    type: "file",
                }
            },
        ]
    },
    {
        label: "Others",
        items: [
            {
                label: "Range",
                icon: FIELD_ICONS.range,
                fieldConfig: {
                    type: "range",
                }
            }
        ]
    },
]

/**
 * Default properties applied to newly created fields based on their type
 */
export const FIELD_DEFAULTS: FieldDefaults = {
    text: {
        text: {
            name: "",
            type: "text",
            subtype: "text",
            label: "Text",
            required: false,
            disabled: false,
            defaultValue: "",
            placeholder: "",
            validations: {}
        },
        number: {
            name: "",
            type: "text",
            subtype: "number",
            label: "Number",
            required: false,
            disabled: false,
            defaultValue: null,
            placeholder: "",
            validations: {}
        },
        email: {
            name: "",
            type: "text",
            subtype: "email",
            label: "Email",
            required: false,
            disabled: false,
            defaultValue: "",
            placeholder: "",
            validations: {}
        },
        password: {
            name: "",
            type: "text",
            subtype: "password",
            label: "Password",
            required: false,
            disabled: false,
            defaultValue: "",
            placeholder: "",
            validations: {}
        },
        tel: {
            name: "",
            type: "text",
            subtype: "tel",
            label: "Tel",
            required: false,
            disabled: false,
            defaultValue: "",
            placeholder: "",
            validations: {}
        },
        url: {
            name: "",
            type: "text",
            subtype: "url",
            label: "URL",
            required: false,
            disabled: false,
            defaultValue: "",
            placeholder: "",
            validations: {}
        }
    },
    textarea: {
        name: "",
        type: "textarea",
        label: "Textarea",
        required: false,
        disabled: false,
        defaultValue: "",
        placeholder: "",
        validations: {}
    },
    select: {
        name: "",
        type: "select",
        label: "Select",
        required: false,
        disabled: false,
        multiselect: false,
        defaultValue: [],
        options: [],
        validations: {}
    },
    radioGroup: {
        name: "",
        type: "radioGroup",
        label: "Radio Group",
        required: false,
        disabled: false,
        defaultValue: "",
        options: [],
        validations: {}
    },
    checkbox: {
        name: "",
        type: "checkbox",
        label: "Checkbox",
        required: false,
        disabled: false,
        defaultValue: false,
        validations: {}
    },
    checkboxGroup: {
        name: "",
        type: "checkboxGroup",
        label: "Checkbox Group",
        required: false,
        disabled: false,
        defaultValue: [],
        options: [],
        validations: {}
    },
    date: {
        name: "",
        type: "date",
        label: "Date",
        required: false,
        disabled: false,
        defaultValue: "",
        validations: {}
    },
    file: {
        name: "",
        type: "file",
        label: "File",
        required: false,
        disabled: false,
        validations: {}
    },
    range: {
        name: "",
        type: "range",
        label: "Range",
        required: false,
        disabled: false,
        defaultValue: null,
        validations: {
            min: 0,
            max: 100,
            step: 1
        }
    }
};


