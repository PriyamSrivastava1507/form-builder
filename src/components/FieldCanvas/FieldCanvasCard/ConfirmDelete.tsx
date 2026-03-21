type ConfirmDeleteProps = {
    setConfirmDelete: (confirmDelete: boolean) => void;
    onDelete: () => void;
}

const ConfirmDelete = ({setConfirmDelete, onDelete}: ConfirmDeleteProps) => {
  return (
    <div className="w-full flex items-center justify-between gap-2 px-3 py-2">
        <span className="text-foreground-secondary text-xs tracking-wider ml-3">
            Are you sure you want to delete this field?
        </span>
        <div className="flex items-center gap-3 mr-3">
            <button 
                onClick={() => setConfirmDelete(false)}
                className="text-foreground-secondary bg-surface-raised text-xs tracking-wider border-[1.25px] flex items-center justify-center border-border/70 hover:border-border/80  hover:text-foreground hover:bg-surface-overlay px-3 py-1 rounded-sm transition-all duration-150"
            >
                Cancel
            </button>
            <button 
                onClick={onDelete}
                className="text-foreground text-xs tracking-wider flex items-center justify-center
                bg-destructive/90 hover:text-destructive-foreground hover:bg-destructive/70 px-3 py-1 rounded-sm transition-all duration-150"
            >
                Delete
            </button>
        </div>
    </div>
  )
}

export default ConfirmDelete