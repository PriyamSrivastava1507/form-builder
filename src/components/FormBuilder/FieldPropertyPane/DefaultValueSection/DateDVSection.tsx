import type { DateField } from "@/types/field"
import { useFormStore } from "@/store/form.store"
import { DatePicker } from "@/components/ui/date-picker"

type DateDVSectionProps = {
  field: DateField;
}

const DateDVSection = ({ field }: DateDVSectionProps) => {
  const updateField = useFormStore(state => state.updateField)

  return (
    <div className="py-2 pr-2 my-1">
      <p className="text-sm font-semibold text-foreground-muted mb-2">Default Value :</p>
      <DatePicker
        id={field.id + "-default-value"}
        value={field.defaultValue ?? ""}
        onChange={(value) => updateField(field.id, { defaultValue: value })}
        placeholder="Select default date"
      />
      <p className="text-xs text-muted-foreground mt-4">
        * This value will be set as default value for the field when the form code is generated
      </p>
    </div>
  )
}

export default DateDVSection