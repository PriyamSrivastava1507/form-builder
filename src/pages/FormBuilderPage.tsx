import FormBuilderNav from "../components/Navbars/FormBuilderNav";
import FieldPalette from "../components/FieldPalette/FieldPalette";
import FieldCanvas from "../components/FieldCanvas/FieldCanvas";
import FieldPropertyPane from "../components/FieldPropertyPane/FieldPropertyPane";
import { useFormStore } from "../store/form.store";

const FormBuilderPage = () => {
  const addField = useFormStore(state => state.addField)
  return (
    <div className="h-screen w-screen bg-background overflow-hidden">
      <FormBuilderNav />
      <section className="h-[calc(100vh-var(--spacing-navbar))] w-full flex">
        <FieldPalette addField={addField} />
        <FieldCanvas />
        <FieldPropertyPane />
      </section>
    </div>
  )
}

export default FormBuilderPage