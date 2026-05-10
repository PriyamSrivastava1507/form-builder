import { GripHorizontal } from "lucide-react"

type DragHandleProps = {
    handleRef: (element: Element | null) => void;
    isDragging: boolean;
}

/**
 * @component
 * Rendered at the top of a field card to act as a drag handle.
 * @param {DragHandleProps} props - Component props
 * @param {(element: Element | null) => void} props.handleRef - Ref callback provided by dnd-kit for the drag handle element
 * @param {boolean} props.isDragging - Whether the card is currently being dragged
 */
const DragHandle = ({ handleRef, isDragging }: DragHandleProps) => {
  return (
    <div className="w-full flex items-center justify-center">
        <button 
            ref={handleRef}
            className="group/drag-handle p-[2px] cursor-grab" 
            aria-hidden
        >
            <GripHorizontal className={`text-foreground-secondary size-4 group-hover/drag-handle:text-foreground group-hover/drag-handle:scale-110 transition-all duration-150 active:text-foreground active:scale-110 ${isDragging ? 'text-foreground scale-110' : ''}`}/>
        </button>
    </div>
  )
}

export default DragHandle