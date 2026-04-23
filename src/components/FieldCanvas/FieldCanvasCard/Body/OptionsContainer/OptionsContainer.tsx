import { Plus } from "lucide-react";
import OptionInput from "./OptionInput";
import type { SelectField, RadioField, CheckboxGroupField, FieldOption } from "@/types/field";
import type { DistributiveOmit } from "@/types/palette";
import type { FieldSchema } from "@/types/field";

type OptionsContainerProps = {
    field: SelectField | RadioField | CheckboxGroupField;
    onUpdate: (changes: Partial<DistributiveOmit<FieldSchema, 'id' | 'type'>>) => void;
}

const OptionsContainer = ({field, onUpdate}: OptionsContainerProps) => {

    const handleAddOption: React.MouseEventHandler<HTMLButtonElement> = () => {
        const newOption: FieldOption = {
            id: crypto.randomUUID(),
            label: "Option " + (field.options.length + 1),
            value: "Option " + (field.options.length + 1)
        }
        onUpdate({options: [...field.options, newOption]});
    }
    
  return (
    <>
        <div>
            {field.options.map((option, index) => (
                <OptionInput key={index} field={field} option={option} index={index} onUpdate={onUpdate}/>
            ))}
        </div>
        <button 
          type="button" 
          aria-label="Add Option"
          onClick={handleAddOption}
          className="flex items-center gap-0.5 px-2 py-1.5 absolute top-3.5 right-4 text-foreground bg-primary/80 hover:bg-primary/75 hover:scale-105 active:scale-95 transition-all rounded-sm"
        >
          <Plus className="mr-0.5 size-4" strokeWidth={2} />
          <span className="text-sm font-medium mr-0.5">Add Option</span>
        </button>
    </>
  )
}

export default OptionsContainer