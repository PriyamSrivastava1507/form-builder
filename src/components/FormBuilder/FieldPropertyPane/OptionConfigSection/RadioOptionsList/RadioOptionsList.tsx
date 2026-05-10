import type { RadioGroupField } from "@/types/field";
import RadioOptionListItem from "./RadioOptionListItem";

type RadioOptionsListProps = {
    field: RadioGroupField;
}

const RadioOptionsList = ({field}: RadioOptionsListProps) => {
  const sortedOption = [...field.options].sort((a,b)=>a.label.localeCompare(b.label))

  return (
    <>
        {sortedOption.length === 0 ? (
          <div className="mt-3 flex items-center justify-center h-full">
              <p className="text-foreground-muted text-xs">* Add options by clicking on Add Options button</p>
          </div>
        ) : (
          <>
          {sortedOption.map((option, index) => (
            <RadioOptionListItem 
                key={option.id} 
                field={field}
                sortedIndex={index} 
                optionIndex={field.options.indexOf(option)} 
            />
          ))} 
          </>
        )}
    </>
  )
}

export default RadioOptionsList