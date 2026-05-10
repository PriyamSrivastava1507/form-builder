import { FIELD_PALETTE_CONFIG } from "../../../constants/fieldPalette"
import type { FieldSchema } from "../../../types/field"
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
    <aside className="xl:w-64 lg:w-52 h-full border-r border-border bg-surface lg:px-2 xl:px-4 py-4 overflow-y-auto scrollbar-custom">
        <h2 className="text-base text-foreground-muted font-semibold border-b-2 border-border/80 px-2 pt-1 pb-3 mb-5">FIELD PALETTE</h2>
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