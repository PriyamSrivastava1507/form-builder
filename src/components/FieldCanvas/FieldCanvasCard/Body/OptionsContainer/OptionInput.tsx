import { useDebounceCallback } from "@/hooks/useDebounceCallback";
import type { CheckboxGroupField, FieldOption, FieldSchema, RadioField, SelectField } from "@/types/field";
import type { DistributiveOmit } from "@/types/palette";
import { Disc, X } from "lucide-react"
import { useEffect, useState } from "react";

type OptionInputProps = {
    field: SelectField | RadioField | CheckboxGroupField;
    option: FieldOption;
    index: number;
    onUpdate: (changes: Partial<DistributiveOmit<FieldSchema, 'id' | 'type'>>) => void;
}

const OptionInput = ({field, option, index , onUpdate}: OptionInputProps) => {
  const [localOption, setLocalOption] = useState<string>(option.label);
  const debouncedUpdate = useDebounceCallback<(changes: Partial<DistributiveOmit<FieldSchema, 'id' | 'type'>>) => void>(onUpdate, 300);
  
  useEffect(() => {
    setLocalOption(option.label);
  }, [option]);

  const handleDeleteOption: React.MouseEventHandler<HTMLButtonElement> = () => {
      const newOptions = field.options.filter((opt) => opt.id !== option.id);
      onUpdate({options: newOptions});
    }

  const handleOptionChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const value = e.target.value;
    setLocalOption(value);

    const newOptions = field.options.map((opt)=>{
       if(opt.id === option.id){
         return {...opt, label: value, value};
       }
       return opt;
    });
    debouncedUpdate({options: newOptions});
  }

  return (
    <div className="pl-1.5 pr-1 py-0.5 mt-1 flex items-center gap-2 group/option-input [&:has(input:focus)_.disc]:text-foreground [&:has(input:focus)_.disc]:scale-105 [&:has(input:focus)_.disc]:transition-all [&:has(input:focus)_.disc]:duration-150">
        <Disc size={14} className="disc text-foreground-secondary group-hover/option-input:text-foreground group-hover/option-input:scale-105 transition-all duration-150"/>
        <input
          aria-label="Options"
          placeholder={"Option " + (index + 1)}
          value={localOption}
          onChange={handleOptionChange}
          className="peer/option-input-wrapper pl-1.5 pr-1 py-0.5 rounded-sm border-b-2 border-transparent outline-none text-foreground/80 text-sm placeholder:text-foreground/60 group-hover/option-input:bg-surface-raised/60  group-hover/option-input:border-background-active
        focus:bg-surface-raised/60 focus:border-b-2 focus:border-background-active transition-all duration-150"
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