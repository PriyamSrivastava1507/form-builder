
import type { FieldSchema } from "@/types/field";

type LabelInputProps = {
    field: FieldSchema;
    localLabel: string;
    handleLabelChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const LabelInput = ({field, localLabel, handleLabelChange}: LabelInputProps) => {
  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>)=>{
    if(e.key==="Escape"){
      const card = e.currentTarget.closest('[data-field-id]') as HTMLElement | null;
      card?.focus();
    }
  }

  return (
    <div>
      <input 
        type="text" 
        id={field.id + "-label"}
        aria-label="Label Name" 
        value={localLabel} 
        placeholder="Untitled Label" 
        onChange={handleLabelChange}
        onKeyDown={onKeyDown}
        className="pl-1.5 pr-1 pt-1 pb-px mt-2 rounded-sm border-b-2 border-transparent bg-surface-overlay/60 outline-none text-foreground/80 text-base placeholder:text-foreground/60 hover:bg-surface-raised/60 hover:border-b-2 hover:border-primary/50
        focus:bg-surface-overlay/50 focus:border-b-2 focus:border-primary/50 transition-all duration-200" 
      />
    </div>
  )
}

export default LabelInput