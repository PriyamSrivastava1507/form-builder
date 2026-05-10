import FieldPalette from "../components/FormBuilder/FieldPalette/FieldPalette";
import FieldCanvas from "../components/FormBuilder/FieldCanvas/FieldCanvas";
import FieldPropertyPane from "../components/FormBuilder/FieldPropertyPane/FieldPropertyPane";
import { useFormStore } from "../store/form.store";

/**
 * @component
 * Renders the main form builder interface, assembling the navigation, palette, canvas, and property panels
 */
const FormBuilderPage = () => {
  const addField = useFormStore(state => state.addField)
  return (
    <section className="h-[calc(100vh-var(--spacing-navbar))] w-full flex">
      <FieldPalette addField={addField} />
      <FieldCanvas />
      <FieldPropertyPane />
    </section>
  )
}

export default FormBuilderPage