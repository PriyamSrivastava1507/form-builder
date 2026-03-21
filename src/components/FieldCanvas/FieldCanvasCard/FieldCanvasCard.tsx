import { useSortable } from "@dnd-kit/react/sortable";
import type { FieldSchema } from "../../../types/field"
import { RestrictToElement } from "@dnd-kit/dom/modifiers";
import { RestrictToVerticalAxis } from "@dnd-kit/abstract/modifiers";
import DragHandle from "./DragHandle";
import Body from "./Body";
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

const FieldCanvasCard = ({field, index, isSelected, onSelect, onUpdate, onDelete, onDuplicate}: FieldCanvasCardProps) => {

    const [confirmDelete, setConfirmDelete] = useState<boolean>(false);
    
    const { ref, handleRef, isDragging } = useSortable({
        id: field.id, 
        index,
        modifiers: [RestrictToVerticalAxis, RestrictToElement]
    });

    return (
        <div className="min-h-50 flex flex-col items-center w-[90%] pt-1 bg-surface rounded-2xl border-[1.5px] border-border/60
        hover:border-2 hover:border-border hover:shadow-card hover:scale-102 transition-all duration-150" ref={ref}>
            {!confirmDelete ? <DragHandle handleRef={handleRef} isDragging={isDragging} /> : <div className="h-5"></div>}
            <Body field={field} onUpdate={onUpdate} />
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