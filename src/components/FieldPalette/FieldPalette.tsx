import { FIELD_PALETTE_CONFIG } from "../../constants/fieldPalette"
import type { FieldSchema } from "../../types/field"
import FieldPaletteGroup from "./FieldPaletteGroup"

type FieldPaletteProps = {
    addField: (field: FieldSchema) => void;
}

/**
 * @component
 * @param {FieldPaletteProps} props - Component props
 * Renders the sidebar containing all available form fields grouped by category
 */
const FieldPalette = ({ addField }: FieldPaletteProps) => {
  return (
    <aside className="w-64 h-full border-r border-border bg-surface px-4 py-4 overflow-y-auto scrollbar-custom">
        {FIELD_PALETTE_CONFIG.map((group) => (
            <div key={group.label}>
                <FieldPaletteGroup group={group} addField={addField} />
                <br />
            </div>
        ))}
    </aside>
  )
}

export default FieldPalette