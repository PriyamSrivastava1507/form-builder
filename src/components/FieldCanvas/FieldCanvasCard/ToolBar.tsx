import { Copy, Trash } from "lucide-react";
import { Switch } from "../../ui/switch";
import type { FieldSchema } from "@/types/field";
import { FIELD_ICONS } from "@/constants/fieldPalette";
import type { DistributiveOmit } from "@/types/palette";

type ToolBarProps = {
    field: FieldSchema;
    setConfirmDelete: (confirmDelete: boolean) => void;
    onDuplicate: () => void;
    onUpdate: (changes: Partial<DistributiveOmit<FieldSchema, 'id' | 'type'>>) => void;
    isDragging: boolean;
}

const ToolBar = ({field, setConfirmDelete, onDuplicate, onUpdate, isDragging}: ToolBarProps) => {
  const Icon = field.type === 'text' ? FIELD_ICONS.text[field.subtype] : FIELD_ICONS[field.type];
  return (
    <div className="w-full flex items-center justify-between gap-2 px-3 py-2">
        <div className="flex items-center gap-2 capitalize ml-2">
            <div className="text-foreground-muted ">
                <Icon size={16}/>
            </div>
            <p className="text-foreground-muted text-sm pt-px">{field.type==="text"?field.subtype:field.type}</p>
        </div>
        <div className="flex items-center gap-3">
            <div className="flex items-center gap-4 border-r-[1.5px] border-border pr-4">
                <button 
                    onClick={() => setConfirmDelete(true)}
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
            <div className="flex items-center gap-3">
                <span className="text-foreground-muted text-sm">Required</span>
                <Switch
                    className="mr-2"
                    checked={field.required}
                    onCheckedChange={(checked) => onUpdate({ required: checked })}
                />
            </div>
        </div>
    </div>
  )
}

export default ToolBar