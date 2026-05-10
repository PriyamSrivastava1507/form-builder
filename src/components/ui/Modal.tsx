import { createPortal } from "react-dom";
import { useEffect } from "react";
import { X } from "lucide-react";

type ModalType = {
    open: boolean;
    onClose: () => void;
    heading:string;
    children: React.ReactNode;
}

const Modal = ({open, onClose, heading, children}: ModalType) => {
    
    const modalRoot: HTMLElement = document.getElementById("modal-root") as HTMLElement;
 
    useEffect(()=>{
        if(!open) return;
        const handleEscape = (e: KeyboardEvent) =>{
            if(e.key==="Escape"){
                onClose();
            }
        }
        document.addEventListener("keydown", handleEscape);

        return ()=>{
            document.removeEventListener("keydown", handleEscape);
        }
    },[open, onClose]);

    useEffect(()=>{
        if(open){
            document.body.style.overflow = "hidden";
            document.getElementById("root")!.style.pointerEvents = "none";
        }
        else{
            document.body.style.overflow = "auto";
            document.getElementById("root")!.style.pointerEvents = "auto";
        }

        return ()=>{
            document.body.style.overflow = "auto";
            document.getElementById("root")!.style.pointerEvents = "auto";
        }
    },[open]);
  
    if (!open) return null;

    return createPortal(
        <div className="w-full h-full flex justify-center items-start pt-10 px-15 
        bg-background/80 backdrop-blur-md"
        style={{ pointerEvents: "auto" }}
        onClick={(e:React.MouseEvent<HTMLDivElement>)=>{
            e.stopPropagation();
            onClose();
        }}
        >
            <div className="w-[60%] py-1 bg-surface border-2 border-border rounded-2xl"
            onClick={(e) => e.stopPropagation()}>
                <h2 className="text-xs px-6 py-2 text-foreground/80 bg-surface-raised/20 font-medium flex justify-between items-center border-b-[1.5px] border-border/60">
                    {heading}
                    <button 
                        type="button" 
                        aria-label="Close" 
                        onClick={onClose}
                        className="block p-1 text-foreground/80 hover:text-error/90 hover:bg-error/10 hover:scale-105 active:scale-95 transition-all rounded-md cursor-pointer">
                        <X className="size-4" strokeWidth={2} />
                    </button>
                </h2>
                <div className="pt-4">   
                    {children}
                </div>
            </div>
        </div>,
    modalRoot);
}

export default Modal