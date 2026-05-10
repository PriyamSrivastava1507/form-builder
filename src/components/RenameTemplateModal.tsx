import { useState } from "react";
import Modal from "./ui/Modal"
import type { TemplateCollectionParsed } from "@/types/output";
import { toast } from "sonner";

type RenameTemplateModalProps = {
  open: boolean;
  onClose: () => void;
  setTemplates: (templates: TemplateCollectionParsed) => void;
  templateName: string;
}

const RenameTemplateModal = ({open, onClose, setTemplates, templateName}: RenameTemplateModalProps) => {
  const [newName, setNewName] = useState<string>(templateName);
  const [error, setError] = useState<string>("");

  const handleRename = () => {
    const templates: TemplateCollectionParsed = JSON.parse(localStorage.getItem("templates") || '{}');
    if(templates[newName]){
      setError("Template name already exists");
      return;
    }
    templates[newName] = templates[templateName];
    delete templates[templateName];
    localStorage.setItem("templates", JSON.stringify(templates));
    setTemplates(templates);
    toast.success("Template renamed successfully");
    onClose();
  }
  
  return (
    <Modal open={open} onClose={onClose} heading="Rename Template">
        <div className="px-12 pt-3 pb-2">
            <input 
            type="text" 
            id="new-template-name"
            value={newName} 
            onChange={(e)=>setNewName(e.target.value)}
            onBlur={(e)=>{
              if(e.target.value.trim() === "") setError("Template name cannot be empty");
              else setError("");
              e.target.blur();
            }} 
            placeholder="Form Name" 
            className="w-full text-lg text-foreground/90 font-normal p-1.5 rounded-md outline-2 outline-border/50 focus:outline-primary/50 cursor-pointer transition-all duration-100" />
            {error && <p className="text-destructive/90 text-xs">{error}</p>}
        </div>
            <div className="flex gap-4 justify-end bg-surface-raised/20 mt-6 p-4 border-t-[1.5px] border-border/60">
            <button 
              type="button" 
              aria-label="Cancel" 
              onClick={onClose} 
              className="flex items-center w-[90px] justify-center gap-2 p-2 text-foreground/90 bg-surface-raised/80 border-2 border-border/80 hover:text-destructive hover:bg-destructive/10 hover:border-destructive/15 hover:scale-105 active:scale-95 transition-all rounded-md cursor-pointer"
              >
              <span className="text-sm font-medium">Cancel</span>
            </button>
            <button 
              type="button" 
              aria-label="Replace" 
              onClick={handleRename} 
              className="flex items-center w-[90px] justify-center gap-2 p-2 text-foreground/90 bg-primary/80 hover:bg-primary/80 hover:scale-105 active:scale-95 transition-all rounded-md cursor-pointer"
              >
              <span className="text-sm font-medium">Rename</span>
            </button>
          </div>
    </Modal>
  )
}

export default RenameTemplateModal