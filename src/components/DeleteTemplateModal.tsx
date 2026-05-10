import type { TemplateCollectionParsed } from "@/types/output";
import Modal from "./ui/Modal";
import { toast } from "sonner";

type DeleteTemplateModalProps = {
    isOpen: boolean;
    onClose: () => void;
    setTemplates: (templates: TemplateCollectionParsed) => void;
    templateName: string;
}

const DeleteTemplateModal = ({isOpen,onClose,setTemplates,templateName}:DeleteTemplateModalProps) => {

    const handleDelete = () => {
        const templates:TemplateCollectionParsed = JSON.parse(localStorage.getItem("templates")||'{}');
        delete templates[templateName];
        localStorage.setItem("templates",JSON.stringify(templates));
        setTemplates(templates);
        toast.success("Template deleted successfully");
        onClose();
        console.log("templates: ", JSON.parse(localStorage.getItem("templates") || '{}'));

    }

    return (
        <Modal open={isOpen} onClose={onClose} heading="Delete Template">
            <div className="px-8 pt-1 pb-2">
                <p className="text-2xl text-foreground/80 mb-4">Are you sure you want to delete this template?</p>
                <p className="text-base text-foreground/70"><span className="font-medium">Caution:</span>This action cannot be undone.</p>
            </div>
            <div className="flex gap-4 justify-end bg-surface-raised/20 mt-6 p-4 border-t-[1.5px] border-border/60">
                <button 
                    type="button" 
                    aria-label="Cancel" 
                    onClick={onClose} 
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
    )
}

export default DeleteTemplateModal