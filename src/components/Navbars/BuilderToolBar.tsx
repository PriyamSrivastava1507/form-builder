import { useFormStore } from "@/store/form.store";
import { Eye, Redo2, RefreshCcw, Save, Trash, Undo2 } from "lucide-react"
import { useStore } from "zustand/react";
import { toast } from "sonner";
import FormSaveButton from "./FormSaveButton";
import { useNavigate } from "react-router";
import Modal from "../ui/Modal";
import { useState } from "react";

type BuilderToolBarProps = {
  setOpenModal: (openModal: boolean) => void;
}

const BuilderToolBar = ({setOpenModal}: BuilderToolBarProps) => {

  const navigate = useNavigate();
  const {undo, redo, pastStates, futureStates } = useStore(useFormStore.temporal);
  
  const canUndo = pastStates.length>0;
  const canRedo = futureStates.length>0;  

  const formName = useFormStore((state) => state.formName);
  const clearFields = useFormStore((state) => state.clearFields);
  const setFormName = useFormStore((state) => state.setFormName);
  

  const [deleteFormModal, setDeleteFormModal] = useState<boolean>(false);

  const handleReset = () => {
    clearFields();
    setFormName("Untitled Form");
  }

  const handleUndo = () => {
    console.log("undo");
    undo();
  }

  const handleRedo = () => {
    console.log("redo");
    redo();
  }

  const handleDelete = () => {
    clearFields();
    setFormName("Untitled Form");
    toast.success("Form deleted successfully");
    navigate("/");
  }

  return ( 
    <>
        <FormSaveButton 
          setOpenModal={setOpenModal} 
          formName={formName}
          disabled={formName.trim() === ""} 
          className={`block p-2 text-foreground/80 transition-all border-[1.5px] border-foreground/25 rounded-md ${formName.trim() === "" ? "opacity-40 cursor-not-allowed" : "hover:text-success/90 hover:bg-success/10 hover:scale-105 active:scale-95 transition-all hover:border-success/15 cursor-pointer"}`}
          >
            <Save className="size-5" strokeWidth={2} />
        </FormSaveButton>
        <button 
            type="button" 
            aria-label="Preview" 
            onClick={() => navigate("/preview")}
            className="block p-2 text-foreground/80 hover:text-primary-secondary hover:bg-primary/20 hover:scale-105 active:scale-95 transition-all border-[1.5px] border-foreground/25 hover:border-primary/25 rounded-md cursor-pointer">
            <Eye className="size-5" strokeWidth={2} />
        </button>
        <button 
            type="button" 
            aria-label="Undo" 
            onClick={handleUndo} 
            disabled={!canUndo} 
            className={`block p-2 text-foreground/80  border-[1.5px] border-foreground/25  rounded-md ${!canUndo?"opacity-40 cursor-not-allowed":"hover:text-primary-secondary hover:bg-primary/20 hover:border-primary/25 hover:scale-105 active:scale-95 transition-all cursor-pointer"}`}>
            <Undo2 className="size-5" strokeWidth={2} />
        </button>
        <button 
            type="button" 
            aria-label="Redo" 
            onClick={handleRedo} 
            disabled={!canRedo} 
            className={`block p-2 text-foreground/80  border-[1.5px] border-foreground/25  rounded-md ${!canRedo?"opacity-40 cursor-not-allowed":"hover:text-primary-secondary hover:bg-primary/20 hover:border-primary/25 hover:scale-105 active:scale-95 transition-all cursor-pointer"}`}>
            <Redo2 className="size-5" strokeWidth={2} />
        </button>
        <button 
            type="button" 
            aria-label="Reset" 
            onClick={handleReset} 
            className="block p-2 text-foreground/80 hover:text-primary-secondary hover:bg-primary/20 hover:scale-105 active:scale-95 transition-all border-[1.5px] border-foreground/25 hover:border-primary/25 rounded-md cursor-pointer">
            <RefreshCcw className="size-5" strokeWidth={2} />
        </button>
        <button 
            type="button" 
            aria-label="Delete"
            onClick={() => setDeleteFormModal(true)} 
            className="block p-2 text-foreground/80 hover:text-destructive hover:bg-destructive/10 hover:scale-105 active:scale-95 transition-all border-[1.5px] border-foreground/25 hover:border-destructive/15 rounded-md cursor-pointer">
            <Trash className="size-5" strokeWidth={2} />
        </button>
        <Modal open={deleteFormModal} onClose={() => setDeleteFormModal(false)} heading="Delete Form">
            <div className="px-8 pt-1 pb-2">
                <p className="text-2xl text-foreground/80 mb-4">Are you sure you want to delete this form?</p>
                <p className="text-base text-foreground/70"><span className="font-medium">Caution:</span>This action cannot be undone.</p>
            </div>
            <div className="flex gap-4 justify-end bg-surface-raised/20 mt-6 p-4 border-t-[1.5px] border-border/60">
                <button 
                    type="button" 
                    aria-label="Cancel" 
                    onClick={() => setDeleteFormModal(false)} 
                    className="flex items-center w-[90px] justify-center gap-2 p-2 text-foreground/90 bg-surface-raised/80 border-2 border-border/80 hover:scale-105 active:scale-95 transition-all rounded-md cursor-pointer">
                    <span className="text-sm font-medium">Cancel</span>
                </button>
                <button 
                    type="button" 
                    aria-label="Delete" 
                    onClick={handleDelete} 
                    className="flex items-center w-[90px] justify-center gap-2 p-2 text-foreground/90 bg-destructive/80 hover:bg-destructive/80 hover:scale-105 active:scale-95 transition-all rounded-md cursor-pointer">
                    <span className="text-sm font-medium">Delete</span>
                </button>
            </div>  
        </Modal>
    </>
  )
}

export default BuilderToolBar