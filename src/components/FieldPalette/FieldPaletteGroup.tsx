import type { PaletteGroupConfig } from "../../types/palette"
import type { FieldSchema } from "../../types/field"
import FieldPaletteItem from "./FieldPaletteItem";

type FieldPaletteGroupProps = {
    group: PaletteGroupConfig;
    addField: (field: FieldSchema) => void;
}

/**
 * @component
 * @param {FieldPaletteGroupProps} props - Component props
 * Renders a specific category group of form fields in the palette
 */
const FieldPaletteGroup = ({ group, addField }: FieldPaletteGroupProps) => {
  const { label, items } = group;
  return (
    <section>
        <h3 className="text-sm font-semibold text-foreground-muted ml-2 mt-2 mb-2">{label.toLocaleUpperCase()}</h3>
        <div className="ml-4">
            {items.map((item) => (
                <FieldPaletteItem key={item.label} item={item} addField={addField} />
            ))}
        </div>
    </section>
  )
}

export default FieldPaletteGroup