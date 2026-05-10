import { Switch } from "@/components/ui/switch";
import { useFormStore } from "@/store/form.store";
import type { RadioGroupField } from "@/types/field";
import { arrayMove } from "@/utils/arrayMove";
import { ChevronDown, ChevronUp, Trash } from "lucide-react";

type RadioOptionListItemProps = {
    field: RadioGroupField;
    sortedIndex: number;
    optionIndex: number;
}

const RadioOptionListItem = ({field, optionIndex, sortedIndex}: RadioOptionListItemProps) => {
  const updateField = useFormStore(state=>state.updateField);  

  const handleDeleteOption: React.MouseEventHandler<HTMLButtonElement> = () => {
    const newOptions = field.options.filter((_,i) => i !== optionIndex);
    updateField(field.id,{options: newOptions});
  }

  const handleMoveUp = ()=>{
    if(optionIndex===0){
        return;
    }

    const newOptions = arrayMove(field.options, optionIndex, optionIndex - 1);
    updateField(field.id, {options: newOptions});
  }

  const handleMoveDown = ()=>{
    if(optionIndex===field.options.length-1){
        return;
    }

    const newOptions = arrayMove(field.options, optionIndex, optionIndex + 1);
    updateField(field.id, {options: newOptions});
  }

  return (
    <div className="p-2 pl-3 my-1">
        <div className="flex items-center justify-between mb-2">
            <h4 className="text-foreground-muted font-semibold text-xs ">{`OPTION ${sortedIndex+1}`}</h4>
            <button type="button" className="group/delete transition-all duration-150" onClick={handleDeleteOption}><Trash className="text-foreground-secondary size-3 group-hover/delete:text-destructive" size={14}/></button>
        </div>
        <div className="px-2 py-1">
            <p className="text-xs font-semibold text-foreground-muted mb-2">Option Label :
                <span className="text-foreground/80 font-medium">
                    {` ${field.options[optionIndex].label}`}
                </span>
            </p>
            <p className="text-xs font-semibold text-foreground-muted">Current position :
                <span className="text-foreground/80 font-medium">
                    {` ${optionIndex+1}`}
                </span>
            </p>
        </div>
        <div className="px-2 py-1 flex gap-2 items-center">
            <p className="text-xs font-semibold text-foreground-muted">Reposition :</p>
            <div className="flex gap-2 items-center">
                <button 
                    id="moveUp" 
                    type="button" 
                    className="w-fit p-0.5 flex justify-center items-center text-foreground/70 cursor-pointer rounded-sm border border-foreground/70 hover:border-primary-secondary/15 hover:scale-105 hover:text-primary-secondary hover:bg-primary/15 active:scale-95 transition-all transition-duration-150"
                    onClick={handleMoveUp}
                >
                    <ChevronUp size={12} strokeWidth={2.5}/>
                </button>
                <button 
                    id="moveDown" 
                    type="button" 
                    className="w-fit p-0.5 flex justify-center items-center text-foreground/70 cursor-pointer rounded-sm border border-foreground/70 hover:border-primary-secondary/15 hover:scale-105 hover:text-primary-secondary hover:bg-primary/15 active:scale-95 transition-all transition-duration-150"
                    onClick={handleMoveDown}
                >
                    <ChevronDown size={12} strokeWidth={2.5}/>
                </button>
            </div>    
        </div>
        <div className="px-2 py-1 flex gap-2 items-center">
            <label htmlFor={`disabled--${field.id}--${optionIndex}`} className="text-xs font-semibold text-foreground-muted">Disabled :</label>
            <Switch 
                size="sm" 
                className="mr-1.5"
                id={`disabled--${field.id}--${optionIndex}`}
                checked={
                    (field.options[optionIndex].disabled)
                }
                onCheckedChange={(checked) => {
                    const newOptions = field.options.map((opt, i)=> {
                        if(i === optionIndex){
                            return {...opt, disabled: checked};
                        }
                        return opt;
                    });
                    updateField(field.id, {options: newOptions});
                }}
            />
        </div>
        <div className="px-2 py-1 flex gap-2 items-center">
            <label htmlFor={`default--${field.id}--${optionIndex}`} className="text-xs font-semibold text-foreground-muted">Set as Default :</label>
            <Switch 
                size="sm" 
                className="mr-1.5"
                id={`default--${field.id}--${optionIndex}`}
                checked={
                    (!field.options[optionIndex].disabled) && (field.options[optionIndex].value !== "") && (
                            (field.defaultValue===field.options[optionIndex].value)
                    )
                }
                onCheckedChange={(checked) => {
                    if(checked){
                        const newDefaultValue = field.options[optionIndex].value;
                        updateField(field.id, {defaultValue: newDefaultValue});
                    }else{
                        const newDefaultValue = "";
                        updateField(field.id, {defaultValue: newDefaultValue});
                    }
                }}
            />
        </div>
    </div>
  )
}

export default RadioOptionListItem