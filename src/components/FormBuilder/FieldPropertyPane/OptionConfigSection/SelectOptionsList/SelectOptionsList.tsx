import type { SelectField } from "@/types/field"
import SelectOptionListItem from "./SelectOptionListItem"
import { useEffect, useState } from "react"
import { useFormStore } from "@/store/form.store"
import { useDebounceCallback } from "@/hooks/useDebounceCallback"

type SelectOptionsListProps = {
    field: SelectField
}
const SelectOptionsList = ({field}: SelectOptionsListProps) => {
  
  const sortedOption = [...field.options].sort((a,b)=>a.label.localeCompare(b.label));

  const [localSize, setLocalSize] = useState<string>(
    field.size!==null && field.size!==undefined ? field.size.toString() : ""
  );
  const updateField = useFormStore(state => state.updateField);
  
  const debouncedUpdate = useDebounceCallback(updateField, 500);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;
    setLocalSize(raw);
    const value = raw === '' ? null : parseFloat(raw);
    debouncedUpdate(field.id, { size: value });
  }
  
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLocalSize(field.size!==null && field.size!==undefined ? field.size.toString() : "");
  }, [field]);

  return (
    <>
      <div className={`py-2 pr-2 mt-3 ` + (sortedOption.length===0?"mb-2":"mb-6")}>
            <label htmlFor={field.id+"-size"} className="block text-sm font-semibold text-foreground-muted mb-4">SIZE :</label>
            <input
                type="number"
                placeholder="Enter size"
                value={localSize}
                onChange={handleChange}
                className="w-full p-1.5 rounded-sm border-b-[1.5px] bg-surface-overlay/60 outline-none text-foreground/80 text-xs border border-border/20 placeholder:text-foreground/60 hover:border-primary/50 focus:border-primary/50 transition-all duration-200"
            />
            <p className="text-xs text-muted-foreground mt-4">
                * This value will decide number of options visible at a time
            </p>
      </div>
      {sortedOption.length === 0 ? (
          <div className="flex items-center justify-center h-full">
              <p className="text-foreground-muted text-xs">* Add options by clicking on Add Options button</p>
          </div>
      ) : (
        <>
          
          {sortedOption.map((option, index) => (
            <SelectOptionListItem 
                key={option.id} 
                field={field}
                sortedIndex={index} 
                optionIndex={field.options.indexOf(option)} />
        ))}
        </>
      )}
    </>
  )
}

export default SelectOptionsList