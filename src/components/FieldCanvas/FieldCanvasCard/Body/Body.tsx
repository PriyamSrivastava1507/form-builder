import { useDebounceCallback } from "@/hooks/useDebounceCallback";

import type { FieldSchema } from "@/types/field";
import { useEffect, useState, type ChangeEventHandler } from "react";
import type { DistributiveOmit } from "@/types/palette";
import LabelInput from "./LabelInput";
import PlaceholderInput from "./PlaceholderInput";
import OptionsContainer from "./OptionsContainer/OptionsContainer";
import FieldHtmlPreview from "./FieldHtmlPreview";
import NameInput from "./NameInput";


type BodyProps = {
    field: FieldSchema;
    onUpdate: (changes: Partial<DistributiveOmit<FieldSchema, 'id' | 'type'>>) => void;
}

const Body = ({field, onUpdate}: BodyProps) => {

  const [localName, setLocalName] = useState<string>(field.name);
  const [localLabel, setLocalLabel] = useState<string>(field.label);
  const [localPlaceholder, setLocalPlaceholder] = useState<string>(
    field.type==="text" || field.type==="textarea" ? field.placeholder??"" : ""
  );

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLocalName(field.name);
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

  const handleNameChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const value = e.target.value;
    setLocalName(value);
    debouncedUpdate({ name: value });
  }

  return (
    <div className="w-full mb-20">
        <NameInput
            field={field}
            localName={localName}
            handleNameChange={handleNameChange}
        />
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
        <FieldHtmlPreview
            field={field}
            localLabel={localLabel}
            localPlaceholder={localPlaceholder}
        />
    </div>
  )
}

export default Body