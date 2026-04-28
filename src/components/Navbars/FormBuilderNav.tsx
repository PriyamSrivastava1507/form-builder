import { useFormStore } from "@/store/form.store";
import { Save, Eye, Undo2, Redo2, Form as FormIcon, Trash, Pen, RefreshCcw } from "lucide-react"
import { useStore } from "zustand/react";

/**
 * @component
 * Renders the top navigation bar with form builder actions (save, preview, undo/redo, etc.)
 */
const FormBuilderNav = () => {
  const fields = useFormStore((state) => state.fields);
  const clearFields = useFormStore((state) => state.clearFields);

  const {undo, redo, pastStates, futureStates } = useStore(useFormStore.temporal);

  const canUndo = pastStates.length>0;
  const canRedo = futureStates.length>0;

  const handleReset = () => {
    clearFields();
  }

  const handleUndo = () => {
    console.log("undo");
    undo();
  }

  const handleRedo = () => {
    console.log("redo");
    redo();
  }

  return (
    <header className="h-navbar w-full border-b-[1.5px] border-border pl-5 pr-9 py-4 flex justify-between items-center">
      <div className="flex gap-4 items-center">
        <a href="">
          <FormIcon size={22} className="" />
        </a>
        <h1 className="text-lg text-foreground font-normal">Form Builder</h1>
      </div>
      <div className="flex gap-4">
        <button type="button" aria-label="Save" className="block p-2 text-foreground/80 hover:text-success/90 hover:bg-success/10 hover:scale-105 active:scale-95 transition-all border-[1.5px] border-foreground/25 hover:border-success/15 rounded-md cursor-pointer">
          <Save className="size-5" strokeWidth={2} />
        </button>
        <button type="button" aria-label="Preview" className="block p-2 text-foreground/80 hover:text-primary-secondary hover:bg-primary/20 hover:scale-105 active:scale-95 transition-all border-[1.5px] border-foreground/25 hover:border-primary/25 rounded-md cursor-pointer">
          <Eye className="size-5" strokeWidth={2} />
        </button>
        <button type="button" aria-label="Undo" onClick={handleUndo} disabled={!canUndo} className={`block p-2 text-foreground/80  border-[1.5px] border-foreground/25  rounded-md cursor-pointer ${!canUndo?"opacity-40":"hover:text-primary-secondary hover:bg-primary/20 hover:border-primary/25 hover:scale-105 active:scale-95 transition-all"}`}>
          <Undo2 className="size-5" strokeWidth={2} />
        </button>
        <button type="button" aria-label="Redo" onClick={handleRedo} disabled={!canRedo} className={`block p-2 text-foreground/80  border-[1.5px] border-foreground/25  rounded-md cursor-pointer ${!canRedo?"opacity-40":"hover:text-primary-secondary hover:bg-primary/20 hover:border-primary/25 hover:scale-105 active:scale-95 transition-all"}`}>
          <Redo2 className="size-5" strokeWidth={2} />
        </button>
        <button type="button" aria-label="Reset" onClick={handleReset} className="block p-2 text-foreground/80 hover:text-primary-secondary hover:bg-primary/20 hover:scale-105 active:scale-95 transition-all border-[1.5px] border-foreground/25 hover:border-primary/25 rounded-md cursor-pointer">
          <RefreshCcw className="size-5" strokeWidth={2} />
        </button>
        <button type="button" aria-label="Delete" className="block p-2 text-foreground/80 hover:text-destructive hover:bg-destructive/10 hover:scale-105 active:scale-95 transition-all border-[1.5px] border-foreground/25 hover:border-destructive/15 rounded-md cursor-pointer">
          <Trash className="size-5" strokeWidth={2} />
        </button>
        <button type="button" aria-label="Generate Form" className="flex items-center gap-2 px-4 py-2 text-foreground bg-primary hover:bg-primary/80 hover:scale-105 active:scale-95 transition-all rounded-md cursor-pointer">
          <Pen className="size-4" strokeWidth={2.5} />
          <span className="text-sm font-medium" onClick={()=>console.log(fields)}>Generate Form</span>
        </button>
      </div>
    </header>
  )
}

export default FormBuilderNav