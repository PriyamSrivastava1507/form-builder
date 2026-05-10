import type { FieldSchema } from "../../../types/field"
import { capitalizeString } from "../../../utils/capitalizeString"

type FieldInfoSectionProps = {
    selectedField: FieldSchema;
}

/**
 * @component
 * Renders information about the selected field, including its name and type in the properties pane.
 * @param {FieldInfoSectionProps} props - Component props
 * @param {FieldSchema} props.selectedField - The currently selected field schema
 */
const FieldInfoSection = ({ selectedField }: FieldInfoSectionProps) => {
  return (
    <>
        {/* Field name */}
        <div className="px-2 py-1">
            <p className="text-sm font-semibold text-foreground-muted">FIELD NAME :
                <span className="text-foreground/80 font-medium">
                    {selectedField?.name===""?' Untitled':` ${selectedField?.name}`}
                </span>
            </p>
        </div>
        {/* Field Type */}
        <div className="px-2 pt-1 pb-6 mb-5 border-b-[1.5px] border-border/80">
            <p className="text-sm font-semibold text-foreground-muted">FIELD TYPE :
                <span className="text-foreground/80 font-medium">
                    {` ${selectedField?.type==="text"?capitalizeString(selectedField?.subtype):capitalizeString(selectedField?.type)}`}
                </span>
            </p>
        </div>
    </>
  )
}

export default FieldInfoSection