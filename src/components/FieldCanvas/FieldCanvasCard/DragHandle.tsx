import { GripHorizontal } from "lucide-react"

type HeaderProps = {
    handleRef: (element: Element | null) => void;
    isDragging: boolean;
}

const Header = ({ handleRef, isDragging }: HeaderProps) => {
  return (
    <div className="w-full flex items-center justify-center">
        <button 
            ref={handleRef}
            className="group/drag-handle p-[2px] cursor-grab" 
            aria-hidden
        >
            <GripHorizontal className={`text-foreground-muted size-4 group-hover/drag-handle:text-foreground group-hover/drag-handle:scale-110 transition-all duration-150 active:text-foreground active:scale-110 ${isDragging ? 'text-foreground scale-110' : ''}`}/>
        </button>
    </div>
  )
}

export default Header