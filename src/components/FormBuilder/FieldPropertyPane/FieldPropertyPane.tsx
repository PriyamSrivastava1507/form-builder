import { useFormStore } from "@/store/form.store"
import FieldInfoSection from "./FieldInfoSection";
import RepositionSection from "./RepositionSection";
import OptionConfigSection from "./OptionConfigSection/OptionConfigSection";
import DefaultValueSection from "./DefaultValueSection/DefaultValueSection";
import ValidationSection from "./ValidationSection/ValidationSection";

/**
 * @component
 * Renders the properties panel for configuring the currently selected field
 */
const FieldPropertyPane = () => {
    const fields = useFormStore(state=>state.fields);
    const selectedFieldId = useFormStore(state=>state.selectedId);
    const selectedFieldIndex = fields.findIndex((field)=>field.id===selectedFieldId);
    const selectedField = fields[selectedFieldIndex] || null;

    return (
        <aside className="xl:w-72 lg:w-56 h-full border-r border-border bg-surface p-4 overflow-y-auto scrollbar-custom">
            <h2 className="text-base text-foreground-muted font-semibold border-b-2 border-border/80 px-2 pt-1 pb-3 mb-5">PROPERTIES</h2>
            {!selectedFieldId || !selectedField?
            (
                <div className="text-foreground-muted">
                    <p className="text-sm">Select a field by clicking on it to view/edit its properties</p>
                </div>
            ):
            (
                <>
                    <FieldInfoSection selectedField={selectedField} />
                    <RepositionSection selectedId={selectedFieldId} selectedIndex={selectedFieldIndex} fieldsLength={fields.length} />
                    {"defaultValue" in selectedField && (
                        ("options" in selectedField) ? 
                        (
                            <OptionConfigSection field={selectedField} />
                        ) :
                        (
                            <DefaultValueSection field={selectedField} />
                        )
                    )}
                    <ValidationSection field={selectedField} />
                </>
            )}
        </aside>
    )
}

export default FieldPropertyPane

