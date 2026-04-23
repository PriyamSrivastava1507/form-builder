import type { FieldSchema } from "@/types/field";

type PlaceholderInputProps = {
    field: FieldSchema;
    localPlaceholder: string;
    handlePlaceholderChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const PlaceholderInput = ({field, localPlaceholder, handlePlaceholderChange}: PlaceholderInputProps) => {
  return (
    <input 
        type="text" 
        id={field.id + "-placeholder"}
        aria-label="Placeholder" 
        value={localPlaceholder} 
        placeholder="Untitled Placeholder" 
        onChange={handlePlaceholderChange} 
        className="pl-1.5 pr-1 py-0.5 rounded-sm border-b-2 border-transparent outline-none text-foreground/80 text-sm placeholder:text-foreground/60 hover:bg-surface-raised/60 hover:border-b-2 hover:border-background-active
        focus:bg-surface-raised/60 focus:border-b-2 focus:border-background-active transition-all duration-150" 
    />
  )
}

export default PlaceholderInput