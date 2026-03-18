import { useFormStore } from "../../store/form.store";

/**
 * @component
 * Renders the main canvas area where form fields are dropped and arranged
 */
const FieldCanvas = () => {
  const fields = useFormStore((state) => state.fields);
  const selectedId = useFormStore((state) => state.selectedId);
  const addField = useFormStore((state) => state.addField);
  const removeField = useFormStore((state) => state.removeField);
  const updateField = useFormStore((state) => state.updateField);
  const reorderFields = useFormStore((state) => state.reorderFields);
  const clearFields = useFormStore((state) => state.clearFields);
  const setSelectedId = useFormStore((state) => state.setSelectedField);

  return (
   <main className="flex-1 h-full border-r border-border">
      <ul>
        {fields.map(field => (
          <li>
            {field.label}
          </li>
        ))}
      </ul>
    </main>
  )
}

export default FieldCanvas