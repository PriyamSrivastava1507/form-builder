import type { FieldSchema } from "@/types/field"
import SelectOptionsList from "./SelectOptionsList/SelectOptionsList"
import RadioOptionsList from "./RadioOptionsList/RadioOptionsList"
import CheckboxOptionsList from "./CheckboxOptionsList/CheckboxOptionsList"

type OptionConfigSectionProps = {
    field: FieldSchema
}

/**
 * @component
 * Renders the options configuration section for fields with multiple choices (select, radioGroup, checkboxGroup).
 * Delegates to specific list components to allow adding, editing, and deleting options.
 * @param {OptionConfigSectionProps} props - Component props
 * @param {FieldSchema} props.field - The selected field schema to configure
 */
const OptionConfigSection = ({field}: OptionConfigSectionProps) => {
  return (
    <div className="px-2 pt-1 mb-5 pb-6 border-b-[1.5px] border-border/80">
      <h3 className="text-sm font-semibold text-foreground-muted mb-2">OPTIONS CONFIGURATION</h3>
      {field.type === "select" && <SelectOptionsList field={field} />}
      {field.type === "radioGroup" && <RadioOptionsList field={field} />}
      {field.type === "checkboxGroup" && <CheckboxOptionsList field={field} />}
    </div>
  )
}

export default OptionConfigSection