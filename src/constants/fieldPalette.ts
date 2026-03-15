import { AtSign, Binary, CalendarDays, ChevronDownCircle, Disc, FileTypeCorner, Gauge, LayoutGrid, Link2, LockKeyhole, Phone, SquareCheck, ToggleLeft, Type, Upload } from "lucide-react";
import type { FieldDefaults, PaletteGroupConfig } from "../types/palette";

/**
 * Grouped configuration of all available fields in the sidebar palette
 */
export const FIELD_PALETTE_CONFIG: PaletteGroupConfig[] = [
    {
        label: "Text Inputs",
        items: [
            {
                label: "Text",
                icon: Type,
                fieldConfig: {
                    type: "text",
                    subtype: "text",
                }
            },
            {
                label: "Number",
                icon: Binary,
                fieldConfig: {
                    type: "text",
                    subtype: "number",
                }
            },
            {
                label: "Email",
                icon: AtSign,
                fieldConfig: {
                    type: "text",
                    subtype: "email",
                }
            },
            {
                label: "Password",
                icon: LockKeyhole,
                fieldConfig: {
                    type: "text",
                    subtype: "password",
                }
            },
            {
                label: "Tel",
                icon: Phone,
                fieldConfig: {
                    type: "text",
                    subtype: "tel",
                }
            },
            {
                label: "URL",
                icon: Link2,
                fieldConfig: {
                    type: "text",
                    subtype: "url",
                }
            },
            {
                label: "Textarea",
                icon: FileTypeCorner,
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
                icon: ChevronDownCircle,
                fieldConfig: {
                    type: "select",
                }
            },
            {
                label: "Radio",
                icon: Disc,
                fieldConfig: {
                    type: "radio",
                }
            },
            {
                label: "Checkbox",
                icon: SquareCheck,
                fieldConfig: {
                    type: "checkbox",
                }
            },
            {
                label: "Checkbox Group",
                icon: LayoutGrid,
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
                icon: CalendarDays,
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
                icon: Upload,
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
                icon: Gauge,
                fieldConfig: {
                    type: "range",
                }
            },
            {
                label: "Switch",
                icon: ToggleLeft,
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