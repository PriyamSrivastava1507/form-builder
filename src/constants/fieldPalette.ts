import { AtSign, Binary, CalendarDays, ChevronDownCircle, Disc, FileTypeCorner, Gauge, LayoutGrid, Link2, LockKeyhole, Phone, SquareCheck, ToggleLeft, Type, Upload } from "lucide-react";
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
    radio: Disc,
    checkbox: SquareCheck,
    checkboxGroup: LayoutGrid,
    date: CalendarDays,
    file: Upload,
    range: Gauge,
    switch: ToggleLeft,
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
                label: "Radio",
                icon: FIELD_ICONS.radio,
                fieldConfig: {
                    type: "radio",
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
            },
            {
                label: "Switch",
                icon: FIELD_ICONS.switch,
                fieldConfig: {
                    type: "switch",
                }
            },
        ]
    },
]

/**
 * Default properties applied to newly created fields based on their type
 */
export const FIELD_DEFAULTS: FieldDefaults = {
    text: {
        text: {
            type: "text",
            subtype: "text",
            label: "Text",
            required: false,
            defaultValue: "",
            placeholder: "",
            validations: {}
        },
        number: {
            type: "text",
            subtype: "number",
            label: "Number",
            required: false,
            defaultValue: 0,
            placeholder: "",
            validations: {}
        },
        email: {
            type: "text",
            subtype: "email",
            label: "Email",
            required: false,
            defaultValue: "",
            placeholder: "",
            validations: {}
        },
        password: {
            type: "text",
            subtype: "password",
            label: "Password",
            required: false,
            defaultValue: "",
            placeholder: "",
            validations: {}
        },
        tel: {
            type: "text",
            subtype: "tel",
            label: "Tel",
            required: false,
            defaultValue: "",
            placeholder: "",
            validations: {}
        },
        url: {
            type: "text",
            subtype: "url",
            label: "URL",
            required: false,
            defaultValue: "",
            placeholder: "",
            validations: {}
        }
    },
    textarea: {
        type: "textarea",
        label: "Textarea",
        required: false,
        defaultValue: "",
        placeholder: "",
        validations: {}
    },
    select: {
        type: "select",
        label: "Select",
        required: false,
        defaultValue: "",
        options: [],
        validations: {}
    },
    radio: {
        type: "radio",
        label: "Radio",
        required: false,
        defaultValue: "",
        options: [],
        validations: {}
    },
    checkbox: {
        type: "checkbox",
        label: "Checkbox",
        required: false,
        defaultValue: false,
        validations: {}
    },
    checkboxGroup: {
        type: "checkboxGroup",
        label: "Checkbox Group",
        required: false,
        defaultValue: [],
        options: [],
        validations: {}
    },
    date: {
        type: "date",
        label: "Date",
        required: false,
        defaultValue: "",
        validations: {}
    },
    file: {
        type: "file",
        label: "File",
        required: false,
        validations: {}
    },
    range: {
        type: "range",
        label: "Range",
        required: false,
        defaultValue: 0,
        validations: {
            min: 0,
            max: 100,
            step: 1
        }
    },
    switch: {
        type: "switch",
        label: "Switch",
        required: false,
        defaultValue: false,
        validations: {}
    }
};


