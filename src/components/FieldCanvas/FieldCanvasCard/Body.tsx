import { useDebounceCallback } from "@/hooks/useDebounceCallback";

import type { FieldSchema } from "@/types/field";
import { useEffect, useState, type ChangeEventHandler } from "react";
import type { DistributiveOmit } from "@/types/palette";


type BodyProps = {
    field: FieldSchema;
    onUpdate: (changes: Partial<DistributiveOmit<FieldSchema, 'id' | 'type'>>) => void;
}

const Body = ({field, onUpdate}: BodyProps) => {

  const [localLabel, setLocalLabel] = useState<string>(field.label);
  const [localPlaceholder, setLocalPlaceholder] = useState<string>(
    field.type==="text" || field.type==="textarea" ? field.placeholder??"" : ""
  );

  
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLocalLabel(field.label);
    if (field.type === "text" || field.type === "textarea") {
      setLocalPlaceholder(field.placeholder??"");
    }
  }, [field]);

  const debouncedUpdate = useDebounceCallback<(changes: Partial<DistributiveOmit<FieldSchema, 'id' | 'type'>>) => void>(onUpdate, 300);

  const handleLabelChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const value = e.target.value;
    setLocalLabel(value);
    debouncedUpdate({ label: value });
  }

  const handlePlaceholderChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const value = e.target.value;
    setLocalPlaceholder(value);
    debouncedUpdate({ placeholder: value });
  }

  return (
    <div className="flex-1 w-[95%] px-2 py-2 border-b-[1.5px] border-border/60">
        <label htmlFor={field.id} className="text-foreground-muted text-sm">Label Name:</label>
        <input 
            type="text" 
            id={field.id} 
            value={localLabel} 
            placeholder="Untitled Label" 
            onChange={handleLabelChange} 
            className="w-full border-none outline-none text-foreground text-sm" 
        />
        {(field.type === "text" || field.type === "textarea") && <>
          <label htmlFor={field.id + "-placeholder"} className="text-foreground-muted text-sm">Placeholder:</label>
          <input 
              type="text" 
              id={field.id + "-placeholder"} 
              value={localPlaceholder} 
              placeholder="Untitled Placeholder" 
              onChange={handlePlaceholderChange} 
              className="w-full border-none outline-none text-foreground text-sm" 
          />
        </>}
    </div>
  )
}

export default Body