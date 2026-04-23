
import type { FieldSchema } from "@/types/field";

type LabelInputProps = {
    field: FieldSchema;
    localLabel: string;
    handleLabelChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const LabelInput = ({field, localLabel, handleLabelChange}: LabelInputProps) => {
  return (
    <input 
        type="text" 
        id={field.id + "-label"}
        aria-label="Label Name" 
        value={localLabel} 
        placeholder="Untitled Label" 
        onChange={handleLabelChange} 
        className="pl-1.5 pr-1 py-0.5 mb-1 rounded-sm border-b-2 border-transparent outline-none text-foreground/80 text-2xl tracking-wide placeholder:text-foreground/60 hover:bg-surface-raised/60 hover:border-b-2 hover:border-background-active
        focus:bg-surface-raised/60 focus:border-b-2 focus:border-background-active transition-all duration-150" 
    />
  )
}

export default LabelInput