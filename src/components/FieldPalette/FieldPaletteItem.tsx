import type { PaletteItemConfig } from "../../types/palette"
import type { FieldSchema } from "../../types/field"
import type { MouseEventHandler } from "react";
import { createFieldFromDefaults } from "../../utils/createFieldFromDefaults";

type FieldPaletteItemProps = {
    item: PaletteItemConfig;
    addField: (field: FieldSchema) => void;
}

/**
 * @component
 * @param {FieldPaletteItemProps} props - Component props
 * Renders an individual draggable field item within the palette
 */
const FieldPaletteItem = ({ item, addField }: FieldPaletteItemProps) => {
  const handleClick: MouseEventHandler<HTMLButtonElement> = ()=>{
    const newField = createFieldFromDefaults(item.fieldConfig);
    addField(newField);
  }
    
  return (
    <button
        onClick={handleClick}
        className="flex items-center w-full gap-2 p-2 rounded-md hover:bg-primary/15 cursor-pointer hover:scale-105 hover:border-l-3 hover:border-primary-secondary active:scale-95 group/item transition-all"
    >
        {item.icon && <item.icon className="w-4 h-4 text-foreground group-hover/item:text-primary-secondary" />}
        <span className="text-xs font-normal text-foreground group-hover/item:text-primary-secondary">{item.label}</span>
    </button>
  )
}

export default FieldPaletteItem