import type { FieldSchema } from "@/types/field";

type PlaceholderInputProps = {
    field: FieldSchema;
    localPlaceholder: string;
    handlePlaceholderChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const PlaceholderInput = ({field, localPlaceholder, handlePlaceholderChange}: PlaceholderInputProps) => {
  return (
    <div>
      <input 
        type="text" 
        id={field.id + "-placeholder"}
        aria-label="Placeholder" 
        value={localPlaceholder} 
        placeholder="Untitled Placeholder" 
        onChange={handlePlaceholderChange} 
        className="pl-1.5 pr-1 pt-1 pb-px mt-2 rounded-sm border-b-2 border-transparent bg-surface-overlay/60 outline-none text-foreground/80 text-base placeholder:text-foreground/60 hover:bg-surface-overlay/50 hover:border-b-2 hover:border-primary/50
        focus:bg-surface-overlay/50 focus:border-b-2 focus:border-primary/50 transition-all duration-200" 
      />
    </div>
  )
}

export default PlaceholderInput