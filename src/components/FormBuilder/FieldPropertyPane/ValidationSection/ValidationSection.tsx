import type { FieldSchema } from "@/types/field";
import TextValidation from "./TextValidation";
import NumberValidation from "./NumberValidation";
import TextareaValidation from "./TextAreaValidation";
import DateValidation from "./DateValidation";
import FileValidation from "./FileValidation";
import CheckboxGroupValidation from "./CheckboxGroupValidation";
import RangeValidation from "./RangeValidation";
import NoValidation from "./NoValidation";

type ValidationSectionProps = {
    field: FieldSchema;
}

/**
 * @component
 * Renders the validation configuration section in the properties pane based on the field type.
 * Uses conditional rendering to display relevant validation controls (e.g., min/max length for text, min/max value for numbers).
 * @param {ValidationSectionProps} props - Component props
 * @param {FieldSchema} props.field - The selected field schema to configure
 */
const ValidationSection = ({ field }: ValidationSectionProps) => {

    const showTextValidation = field.type === "text" && (field.subtype === "text" || field.subtype === "password" || field.subtype === "tel");
    const showNumberValidation = field.type === "text" && field.subtype === "number";
    const showTextAreaValidation = field.type === "textarea";
    const showDateValidation = field.type === "date";
    const showFileValidation = field.type === "file";
    const showCheckboxGroupValidation = field.type === "checkboxGroup";
    const showRangeValidation = field.type === "range";
    const showNoValidation = (field.type === "select" || field.type === "radioGroup" || field.type === "checkbox") || (field.type === "text" && (field.subtype === "email" || field.subtype === "url"));

    return (
        <div className="px-2 pt-1 mb-5 pb-6 border-b-[1.5px] border-border/80">
            <h3 className="text-sm font-semibold text-foreground-muted mb-4">VALIDATIONS</h3>
            {showTextValidation && <TextValidation fieldId={field.id} validations={field.validations} />}
            {showNumberValidation && <NumberValidation fieldId={field.id} validations={field.validations} />}
            {showTextAreaValidation && <TextareaValidation fieldId={field.id} validations={field.validations} />}
            {showDateValidation && <DateValidation fieldId={field.id} validations={field.validations} />}
            {showFileValidation && <FileValidation fieldId={field.id} validations={field.validations} />}
            {showCheckboxGroupValidation && <CheckboxGroupValidation fieldId={field.id} validations={field.validations} />}
            {showRangeValidation && <RangeValidation fieldId={field.id} validations={field.validations} />}
            {showNoValidation && <NoValidation />}
        </div>    
    )
}

export default ValidationSection