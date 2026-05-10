import { useFormStore } from "@/store/form.store";
import Modal from "./ui/Modal"
import { toast } from "sonner";

type ReplaceTemplateModalType = {
    open: boolean;
    setOpenModal: (openModal: boolean) => void;
}

const ReplaceTemplateModal = ({open, setOpenModal}: ReplaceTemplateModalType) => {
  const formName = useFormStore((state) => state.formName);

  const handleReplace = () => {
    const templates: Record<string, string> = JSON.parse(localStorage.getItem("templates") || '{}');
    templates[formName] = JSON.stringify(
      useFormStore.getState().fields
    );
    localStorage.setItem("templates", JSON.stringify(templates));
    setOpenModal(false);
    toast.success("Template replaced successfully");
    console.log("templates: ", JSON.parse(localStorage.getItem("templates") || '{}'));
  }

  const handleClose = () => {
    setOpenModal(false);
  }

  return (
    <Modal open={open} onClose={handleClose} heading="Template Already Exists">
        <div className="px-8 pt-1 pb-2">
          <p className="text-2xl text-foreground/80 mb-4">You already have a template with this name. Do you want to overwrite it?</p>
          <p className="text-base text-foreground/70"><span className="font-medium">Caution:</span>This action cannot be undone.</p>
        </div>  
          <div className="flex gap-4 justify-end bg-surface-raised/20 mt-6 p-4 border-t-[1.5px] border-border/60">
            <button 
              type="button" 
              aria-label="Cancel" 
              onClick={handleClose} 
              className="flex items-center w-[90px] justify-center gap-2 p-2 text-foreground/90 bg-surface-raised/80 border-2 border-border/80 hover:text-destructive hover:bg-destructive/10 hover:border-destructive/15 hover:scale-105 active:scale-95 transition-all rounded-md cursor-pointer"
              >
              <span className="text-sm font-medium">Cancel</span>
            </button>
            <button 
              type="button" 
              aria-label="Replace" 
              onClick={handleReplace} 
              className="flex items-center w-[90px] justify-center gap-2 p-2 text-foreground/90 bg-primary/80 hover:bg-primary/80 hover:scale-105 active:scale-95 transition-all rounded-md cursor-pointer"
              >
              <span className="text-sm font-medium">Replace</span>
            </button>
          </div>
    </Modal>
  )
}

export default ReplaceTemplateModal