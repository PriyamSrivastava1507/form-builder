import type { FieldSchema } from "@/types/field";

type NameInputProps = {
    field: FieldSchema;
    localName: string;
    handleNameChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const NameInput = ({field, localName, handleNameChange}: NameInputProps) => {
  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>)=>{
    if(e.key==="Escape"){
      const card = e.currentTarget.closest('[data-field-id]') as HTMLElement | null;
      card?.focus();
    }
  }

  return (
    <input 
        type="text" 
        id={field.id + "-name"}
        aria-label="Field Name" 
        value={localName} 
        placeholder="Untitled Name" 
        onChange={handleNameChange}
        onKeyDown={onKeyDown}
        className="pl-1.5 pr-1 py-0.5 mb-0.5 rounded-sm border-b-2 bg-surface-overlay/60 border-transparent outline-none text-foreground/80 text-2xl placeholder:text-foreground/60 hover:bg-surface-overlay/50 hover:border-b-2 hover:border-primary/50
        focus:bg-surface-overlay/50 focus:border-b-2 focus:border-primary/50 transition-all duration-200" 
    />
  )
}

export default NameInput