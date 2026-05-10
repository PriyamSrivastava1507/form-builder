import type { FieldSchema } from "@/types/field"
import TextDVSection from "./TextDVSection";
import NumberDVSection from "./NumberDVSection";
import DateDVSection from "./DateDVSection";
import CheckboxDVSection from "./CheckboxDVSection";

type DefaultValueSectionProps = {
    field: FieldSchema;
}

const DefaultValueSection = ({field}: DefaultValueSectionProps) => {
  const isText = field.type === "text" && field.subtype !== "number";
  const isNumber = field.type === "text" && field.subtype === "number";
  const isTextarea = field.type === "textarea";
  const isDate = field.type === "date";
  const isRange = field.type === "range";
  const isCheckbox = field.type === "checkbox";

  return (
    <>
      <div className="px-2 pt-1 mb-5 pb-6 border-b-[1.5px] border-border/80">
        <h3 className="text-sm font-semibold text-foreground-muted mb-2">DEFAULT VALUE</h3>
        {isText && <TextDVSection field={field} />}
        {isNumber && <NumberDVSection field={field} />}
        {isTextarea && <TextDVSection field={field} />}
        {isDate && <DateDVSection field={field} />}
        {isRange && <NumberDVSection field={field} />}
        {isCheckbox && <CheckboxDVSection field={field} />}
      </div>
    </>
  )
}

export default DefaultValueSection