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
            <div className="text-foreground-muted">
                <Icon size={16}/>
            </div>
            <p className="text-foreground-muted text-sm pt-px">{field.type==="text"?field.subtype:field.type}</p>
        </div>
        <div className="flex items-center gap-2">
            <div className="flex items-center gap-2 border-r-[1.5px] border-border pr-4">
                <button 
                    onClick={() => setConfirmDelete(true)}
                    className="group/delete p-1"
                    aria-label="Delete field"
                >
                    <Trash className={`text-foreground-secondary size-4 group-hover/delete:text-destructive transition-all duration-150 active:text-destructive ${isDragging ? 'text-destructive' : ''}`}/>
                </button>
                <button
                    onClick={onDuplicate}
                    className="group/duplicate p-1"
                    aria-label="Duplicate field"
                >
                    <Copy className={`text-foreground-secondary size-4 group-hover/duplicate:text-foreground transition-all duration-150 active:text-foreground ${isDragging ? 'text-foreground' : ''}`}/>
                </button>
            </div>
            <div className="flex items-center gap-2 group/required">
                <span className="text-foreground-secondary text-xs group-hover/required:text-foreground transition-all duration-150 active:text-foreground">Required</span>
                <Switch
                    className="mr-1.5"
                    checked={field.required}
                    onCheckedChange={(checked) => onUpdate({ required: checked, disabled: checked?false:field.disabled })}
                />
            </div>
            <div className="flex items-center gap-2 group/disabled">
                <span className="text-foreground-secondary text-xs group-hover/disabled:text-foreground transition-all duration-150 active:text-foreground">Disabled</span>
                <Switch
                    className="mr-1.5"
                    checked={field.disabled}
                    onCheckedChange={(checked) => onUpdate({ disabled: checked, required: checked?false:field.required })}
                />
            </div>
            {
                field.type === "select" && (
                    <div className="flex items-center gap-2 group/multiselect">
                        <span className="text-foreground-secondary text-xs group-hover/multiselect:text-foreground transition-all duration-150 active:text-foreground">Multiselect</span>
                        <Switch
                            className="mr-1.5"
                            checked={field.multiselect}
                            onCheckedChange={(checked) => onUpdate({ multiselect: checked})}
                        />
                    </div>
                )
            }
        </div>
    </div>
  )
}

export default ToolBar