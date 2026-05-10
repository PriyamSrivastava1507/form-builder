import { useDebounceCallback } from "@/hooks/useDebounceCallback";
import { useFormStore } from "@/store/form.store";
import type { TextField, NumberTextField, TextareaField } from "@/types/field";
import { useEffect, useState } from "react";

type TextDVSectionProps = {
    field: Exclude<TextField, NumberTextField> | TextareaField;
}

const TextDVSection = ({field}: TextDVSectionProps) => {
    const [localValue, setLocalValue] = useState<string>("");
    const updateField = useFormStore(state=>state.updateField);

    const debouncedUpdate = useDebounceCallback(updateField, 500);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLocalValue(e.target.value);
        debouncedUpdate(field.id, { defaultValue: e.target.value });
    }

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setLocalValue(field.defaultValue || "")
    }, [field]);

    return (
        <div className="py-2 pr-2 my-1">
            <p className="text-sm font-semibold text-foreground-muted mb-2">Default Value :</p>
            <input 
                type="text" 
                id={field.id+"-default-value"} 
                placeholder="Enter default value" 
                value={localValue}
                onChange={handleChange}
                className="w-full p-1.5 rounded-sm border-b-[1.5px] bg-surface-overlay/60 outline-none text-foreground/80 text-xs border border-border/20 placeholder:text-foreground/60 hover:border-primary/50 focus:border-primary/50 transition-all duration-200" 
            />
            <p className="text-xs text-muted-foreground mt-4">
                * This value will be set as default value for the field when the form code is generated
            </p>
        </div>
    )
}

export default TextDVSection

