import { DragDropProvider } from "@dnd-kit/react";
import { useFormStore } from "../../store/form.store";
import type { FieldSchema } from "../../types/field";
import FieldCanvasCard from "./FieldCanvasCard/FieldCanvasCard";
import { isSortable } from '@dnd-kit/react/sortable';
import type { DistributiveOmit } from "@/types/palette";

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
  const setSelectedId = useFormStore((state) => state.setSelectedField);

  return (
   <main className="flex-1 h-full border-r border-border py-10 px-15 overflow-y-auto scrollbar-custom">
      <DragDropProvider
        onDragEnd={(event) => {
          if (event.canceled) return;

          const { source } = event.operation;

          if (isSortable(source)) {
            const { initialIndex, index } = source;

            if (initialIndex !== index) {
              reorderFields(initialIndex, index);
            }
          }
        }}
      >
        <div className="flex flex-col gap-8 items-center">
          {fields.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full">
              <p className="text-foreground-muted">Click any field from the left sidebar to add it here</p>
            </div>
          ) : (
            fields.map((field, index)=>(
              <FieldCanvasCard
                key={field.id}
                field={field}
                index={index}
                isSelected={field.id === selectedId}
                onSelect={() => setSelectedId(field.id)}
                onUpdate={(changes: Partial<DistributiveOmit<FieldSchema, 'id' | 'type'>>) => updateField(field.id, changes)}
                onDelete={() => removeField(field.id)}
                onDuplicate={() => {
                  const copy = { ...field, id: crypto.randomUUID() };
                  addField(copy);
                  const currentIndex = useFormStore.getState().fields.findIndex(f => f.id === field.id);
                  reorderFields(useFormStore.getState().fields.length - 1, currentIndex + 1);
                }}
            /> ))
          )}
        </div>
      </DragDropProvider>
    </main>
  )
}

export default FieldCanvas