import { useSortable } from "@dnd-kit/react/sortable";
import type { FieldSchema } from "../../types/field"
import { RestrictToElement } from "@dnd-kit/dom/modifiers";
import { RestrictToVerticalAxis } from "@dnd-kit/abstract/modifiers";
import { Copy, GripHorizontal, Trash } from "lucide-react";

type FieldCanvasCardProps = {
    field: FieldSchema;
    index: number;
    isSelected: boolean;
    onSelect: () => void;
    onUpdate: (changes: Partial<Omit<FieldSchema, 'id' | 'type'>>) => void;
    onDelete: () => void;
    onDuplicate: () => void;
}

const FieldCanvasCard = ({field, index, isSelected, onSelect, onUpdate, onDelete, onDuplicate}: FieldCanvasCardProps) => {
    
    const { ref, handleRef, isDragging } = useSortable({
        id: field.id, 
        index,
        modifiers: [RestrictToVerticalAxis, RestrictToElement]
    });

    return (
        <div className="min-h-45 flex flex-col w-[90%] bg-surface rounded-2xl border-[1.5px] border-border-subtle" ref={ref}>
            <div className="w-full flex items-center justify-center">
                <button 
                    ref={handleRef}
                    className="group/drag-handle p-1" 
                    aria-hidden
                >
                    <GripHorizontal className={`text-foreground-muted size-4 group-hover/drag-handle:text-foreground group-hover/drag-handle:scale-110 transition-all duration-150 active:text-foreground active:scale-110 ${isDragging ? 'text-foreground scale-110' : ''}`}/>
                </button>
            </div>
            <div className="flex-1 w-full px-5 py-2">
                {field.label}
            </div>
            <div className="w-full flex items-center justify-end gap-2 p-2">
                <div className="flex items-center gap-2 border-r-[1.25px] border-border pr-2">
                    <button 
                        onClick={onDelete}
                        className="group/delete p-1"
                        aria-label="Delete field"
                    >
                        <Trash className={`text-foreground-muted size-4 group-hover/delete:text-destructive group-hover/delete:scale-110 transition-all duration-150 active:text-destructive active:scale-110 ${isDragging ? 'text-destructive scale-110' : ''}`}/>
                    </button>
                    <button
                        onClick={onDuplicate}
                        className="group/duplicate p-1"
                        aria-label="Duplicate field"
                    >
                        <Copy className={`text-foreground-muted size-4 group-hover/duplicate:text-foreground group-hover/duplicate:scale-110 transition-all duration-150 active:text-foreground active:scale-110 ${isDragging ? 'text-foreground scale-110' : ''}`}/>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default FieldCanvasCard