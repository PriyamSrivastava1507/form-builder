import { useEffect, useRef } from "react";

type ConfirmDeleteProps = {
    setConfirmDelete: (confirmDelete: boolean) => void;
    onDelete: () => void;
}

/**
 * @component
 * Displays a confirmation dialog within a field card before deleting it.
 * Supports keyboard shortcuts (Enter to confirm, Escape to cancel).
 * @param {ConfirmDeleteProps} props - Component props
 * @param {(confirmDelete: boolean) => void} props.setConfirmDelete - Function to cancel deletion
 * @param {() => void} props.onDelete - Function to execute the deletion
 */
const ConfirmDelete = ({setConfirmDelete, onDelete}: ConfirmDeleteProps) => {
    const onDeleteRef = useRef(onDelete);
    const setConfirmDeleteRef = useRef(setConfirmDelete);

    // eslint-disable-next-line react-hooks/refs
    onDeleteRef.current = onDelete;
    // eslint-disable-next-line react-hooks/refs
    setConfirmDeleteRef.current = setConfirmDelete;

    useEffect(()=>{
        const handleKeyboardEvents = (e:KeyboardEvent)=>{
            if(e.key==="Enter"){
                e.preventDefault();
                onDeleteRef.current();
            }else if(e.key==="Escape"){
                e.preventDefault();
                setConfirmDeleteRef.current(false);
            }
            e.stopPropagation();
        };

        document.addEventListener("keydown",handleKeyboardEvents);
        return ()=>{
            document.removeEventListener("keydown",handleKeyboardEvents);
        }
    },[])
    return (
    <div className="w-full flex items-center justify-between gap-2 px-3 py-2">
        <span className="text-foreground/80 xl:text-xs lg:text-[10px] tracking-wider ml-3">
            Are you sure you want to delete this field?
        </span>
        <div className="flex items-center xl:gap-3 lg:gap-1.5 mr-3">
            <button 
                onClick={() => setConfirmDelete(false)}
                className="text-foreground-secondary bg-surface-raised xl:text-xs lg:text-[10px] tracking-wider border-[1.25px] flex items-center justify-center border-border/70 hover:border-border/80  hover:text-foreground hover:bg-surface-overlay px-3 py-1 rounded-sm transition-all duration-150"
            >
                Cancel
            </button>
            <button 
                onClick={onDelete}
                className="text-foreground xl:text-xs lg:text-[10px] tracking-wider flex items-center justify-center
                bg-destructive/90 hover:text-destructive-foreground hover:bg-destructive/70 px-3 py-1 rounded-sm transition-all duration-150"
            >
                Delete
            </button>
        </div>
    </div>
  )
}

export default ConfirmDelete