import { useDebounceCallback } from "@/hooks/useDebounceCallback";
import type { CheckboxGroupField, FieldOption, FieldSchema, RadioGroupField, SelectField } from "@/types/field";
import type { DistributiveOmit } from "@/types/palette";
import { useSortable } from "@dnd-kit/react/sortable";
import { Disc, X } from "lucide-react"
import { useEffect, useState, type Ref } from "react";

type OptionInputProps = {
    field: SelectField | RadioGroupField | CheckboxGroupField;
    option: FieldOption;
    index: number;
    onUpdate: (changes: Partial<DistributiveOmit<FieldSchema, 'id' | 'type'>>) => void;
    inputRef?: Ref<HTMLInputElement>;
}

const OptionInput = ({field, option, index , onUpdate, inputRef}: OptionInputProps) => {
  const [localValue, setLocalValue] = useState<string>(option.value);
  const debouncedUpdate = useDebounceCallback<(changes: Partial<DistributiveOmit<FieldSchema, 'id' | 'type'>>) => void>(onUpdate, 300);

  const {ref, handleRef} = useSortable({
    id: option.id,
    index
  })
  
  useEffect(() => {
    setLocalValue(option.value);
  }, [option]);

  const handleDeleteOption: React.MouseEventHandler<HTMLButtonElement> = () => {
      const newOptions = field.options.filter((opt) => opt.id !== option.id);
      onUpdate({options: newOptions});
    }

  const handleOptionChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const value = e.target.value;
    setLocalValue(value);

    const newOptions = field.options.map((opt)=>{
       if(opt.id === option.id){
         return {...opt, label: value, value};
       }
       return opt;
    });
    debouncedUpdate({options: newOptions});
  }

  return (
    <div ref={ref} className="pl-1.5 pr-1 w-fit h-fit mt-1 flex items-center gap-2 group/option-input [&:has(input:focus)_.disc]:text-foreground [&:has(input:focus)_.disc]:scale-105 [&:has(input:focus)_.disc]:transition-all [&:has(input:focus)_.disc]:duration-150">
        <Disc ref={handleRef} size={14} className={`disc ${option.value === "" ? "text-foreground/60" : "text-foreground"} group-hover/option-input:text-foreground group-hover/option-input:scale-105 transition-all duration-150 cursor-grab`}/>
        <input
          ref={inputRef}
          aria-label="Options"
          placeholder={"Option " + (index + 1)}
          value={localValue}
          onChange={handleOptionChange}
          className="peer/option-input-wrapper pl-1.5 pr-1 py-0.5 mb-1 rounded-sm bg-surface-overlay/60 border-b-2 border-transparent outline-none text-foreground/90 text-sm placeholder:text-foreground/60 group-hover/option-input:bg-surface-overlay/40  group-hover/option-input:border-primary/50
        focus:bg-surface-overlay/40 focus:border-b-2 focus:border-primary/50 transition-all duration-200"
        />
        <button
          aria-label="Delete Option"
          onClick={handleDeleteOption}
          className="group/option-delete-button invisible p-1.5 rounded-full bg-surface-raised border border-transparent group-hover/option-input:visible peer-focus/option-input-wrapper:visible hover:bg-destructive/20
        hover:scale-105 active:scale-95 transition-all duration-150">
            <X size={14} className="text-foreground-secondary group-hover/option-delete-button:text-destructive/80 transition-all duration-150"/>
        </button>
    </div>
  )
}

export default OptionInput