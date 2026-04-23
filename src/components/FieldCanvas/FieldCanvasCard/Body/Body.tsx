import { useDebounceCallback } from "@/hooks/useDebounceCallback";

import type { FieldSchema } from "@/types/field";
import { useEffect, useState, type ChangeEventHandler } from "react";
import type { DistributiveOmit } from "@/types/palette";
import LabelInput from "./LabelInput";
import PlaceholderInput from "./PlaceholderInput";
import OptionsContainer from "./OptionsContainer/OptionsContainer";


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
    <div className="w-full">
        <LabelInput
            field={field}
            localLabel={localLabel}
            handleLabelChange={handleLabelChange}
        />
        {(field.type === "text" || field.type === "textarea") && <>
          <PlaceholderInput
            field={field}
            localPlaceholder={localPlaceholder}
            handlePlaceholderChange={handlePlaceholderChange}
          />
        </>}
        {("options" in field) && (
          <OptionsContainer field={field} onUpdate={onUpdate} />
        )}
        <div className="mt-auto mb-4 pt-2 absolute bottom-0 right-0">
          <div className="text-foreground-secondary/50 text-xs font-mono select-none text-right">
            {"<label>"}
            <span className="text-foreground/50"> 
              {localLabel || 'label'}
            </span>
            {"</label>"}
            <br />
            {"<input type="}
            <span className="text-foreground/50"> 
              {field.type === 'text' ? `"${field.subtype}"` : `"${field.type}"`}
            </span>
            {(field.type === 'text' || field.type === 'textarea') && <>
            {" placeholder="}
            <span className="text-foreground/50"> 
              {localPlaceholder ? `"${localPlaceholder}"` : '""'}
            </span>
            </>}
            {" />"}
          </div>
        </div>
    </div>
  )
}

export default Body