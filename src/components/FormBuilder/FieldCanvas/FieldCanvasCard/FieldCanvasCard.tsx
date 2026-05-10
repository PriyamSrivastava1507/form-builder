import { useSortable } from "@dnd-kit/react/sortable";
import type { FieldSchema } from "../../../../types/field"
import DragHandle from "./DragHandle";
import Body from "./Body/Body";
import ToolBar from "./ToolBar";
import { useState } from "react";
import ConfirmDelete from "./ConfirmDelete";
import type { DistributiveOmit } from "@/types/palette";

type FieldCanvasCardProps = {
    field: FieldSchema;
    index: number;
    isSelected: boolean;
    onSelect: () => void;
    onUpdate: (changes: Partial<DistributiveOmit<FieldSchema, 'id' | 'type'>>) => void;
    onDelete: () => void;
    onDuplicate: () => void;
}

/**
 * @component
 * Represents a single draggable field card on the canvas.
 * Handles selection, update, deletion, duplication, and drag-and-drop interactions.
 * @param {FieldCanvasCardProps} props - Component props
 * @param {FieldSchema} props.field - The schema data for the field
 * @param {number} props.index - The index of the field in the canvas array
 * @param {boolean} props.isSelected - Whether the field is currently selected
 * @param {() => void} props.onSelect - Function to mark the field as selected
 * @param {(changes: Partial<DistributiveOmit<FieldSchema, 'id' | 'type'>>) => void} props.onUpdate - Function to update the field schema
 * @param {() => void} props.onDelete - Function to delete the field
 * @param {() => void} props.onDuplicate - Function to duplicate the field
 */
const FieldCanvasCard = ({field, index, isSelected, onSelect, onUpdate, onDelete, onDuplicate}: FieldCanvasCardProps) => {

    const [confirmDelete, setConfirmDelete] = useState<boolean>(false);
    
    const { ref, handleRef, isDragging } = useSortable({
        id: field.id, 
        index
    });

    const onFocus = (e:React.FocusEvent<HTMLDivElement>) => {
        if(isSelected) return;
        if(!(e.target instanceof HTMLInputElement)) return;
        onSelect();
    }

    const onClick = (e:React.MouseEvent<HTMLDivElement>) => {
        if(isSelected) return;
        if(e.target instanceof HTMLInputElement || e.target instanceof HTMLButtonElement ||
           e.target instanceof SVGElement || e.target instanceof Path2D
        )
        return;
        onSelect();
    }

    return (
        <div className={`min-h-50 flex flex-col items-center w-[90%] pt-1 bg-surface rounded-2xl border-3 border-x-6 border-border/60 focus:outline-none
        hover:border-border hover:border-4 hover:border-x-8 hover:shadow-card hover:scale-102 transition-all duration-150` + (isSelected ? "border-3 border-x-6 border-primary/50 hover:border-primary/60" : "")}
        ref={ref}
        tabIndex={0}
        data-field-id={field.id}
        onFocus={onFocus}
        onClick={onClick}
        >
            {!confirmDelete ? <DragHandle handleRef={handleRef} isDragging={isDragging} /> : <div className="h-5"></div>}
            <div className={"relative flex-1 w-[95%] px-2 py-2 " + (confirmDelete ? "blur-[1.5px] pointer-events-none select-none" : "") + " border-b-[1.5px] "+ (isSelected? "border-primary/50" : "border-border/60")}><Body field={field} onUpdate={onUpdate} /></div>
            {confirmDelete ? (
                <ConfirmDelete setConfirmDelete={setConfirmDelete} onDelete={onDelete} />
            ) : (
                <ToolBar 
                field={field} 
                setConfirmDelete={setConfirmDelete} 
                onDuplicate={onDuplicate} 
                onUpdate={onUpdate} 
                isDragging={isDragging} 
            />
            )}
        </div>
    )
}

export default FieldCanvasCard