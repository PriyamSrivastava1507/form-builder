import { useFormStore } from "@/store/form.store";
import { Save, Eye, Undo2, Redo2, Form as FormIcon, Trash, Pen, RefreshCcw } from "lucide-react"

/**
 * @component
 * Renders the top navigation bar with form builder actions (save, preview, undo/redo, etc.)
 */
const FormBuilderNav = () => {
  const fields = useFormStore((state) => state.fields);
  return (
    <header className="h-navbar w-full border-b-[1.5px] border-border pl-5 pr-9 py-4 flex justify-between items-center">
      <div className="flex gap-4 items-center">
        <a href="">
          <FormIcon size={22} className="" />
        </a>
        <h1 className="text-lg text-foreground font-normal">Form Builder</h1>
      </div>
      <div className="flex gap-4">
        <button type="button" aria-label="Save" className="block p-2 text-foreground-muted hover:text-success/90 hover:bg-success/10 hover:scale-105 active:scale-95 transition-all border border-border hover:border-success/15 rounded-md">
          <Save className="size-5" strokeWidth={2} />
        </button>
        <button type="button" aria-label="Preview" className="block p-2 text-foreground-muted hover:text-primary-secondary hover:bg-primary/20 hover:scale-105 active:scale-95 transition-all border border-border hover:border-primary/25 rounded-md">
          <Eye className="size-5" strokeWidth={2} />
        </button>
        <button type="button" aria-label="Undo" className="block p-2 text-foreground-muted hover:text-primary-secondary hover:bg-primary/20 hover:scale-105 active:scale-95 transition-all border border-border hover:border-primary/25 rounded-md">
          <Undo2 className="size-5" strokeWidth={2} />
        </button>
        <button type="button" aria-label="Redo" className="block p-2 text-foreground-muted hover:text-primary-secondary hover:bg-primary/20 hover:scale-105 active:scale-95 transition-all border border-border hover:border-primary/25 rounded-md">
          <Redo2 className="size-5" strokeWidth={2} />
        </button>
        <button type="button" aria-label="Reset" className="block p-2 text-foreground-muted hover:text-primary-secondary hover:bg-primary/20 hover:scale-105 active:scale-95 transition-all border border-border hover:border-primary/25 rounded-md">
          <RefreshCcw className="size-5" strokeWidth={2} />
        </button>
        <button type="button" aria-label="Delete" className="block p-2 text-foreground-muted hover:text-destructive hover:bg-destructive/10 hover:scale-105 active:scale-95 transition-all border border-border hover:border-destructive/15 rounded-md">
          <Trash className="size-5" strokeWidth={2} />
        </button>
        <button type="button" aria-label="Generate Form" className="flex items-center gap-2 px-4 py-2 text-foreground bg-primary hover:bg-primary/80 hover:scale-105 active:scale-95 transition-all rounded-md">
          <Pen className="size-4" strokeWidth={2.5} />
          <span className="text-sm font-medium" onClick={()=>console.log(fields)}>Generate Form</span>
        </button>
      </div>
    </header>
  )
}

export default FormBuilderNav