import { Plus } from "lucide-react";
import OptionInput from "./OptionInput";
import { useCallback, useRef } from "react";
import type { SelectField, RadioGroupField, CheckboxGroupField, FieldOption } from "@/types/field";
import type { DistributiveOmit } from "@/types/palette";
import type { FieldSchema } from "@/types/field";
import { DragDropProvider } from "@dnd-kit/react";
import { RestrictToElement } from "@dnd-kit/dom/modifiers";
import { RestrictToVerticalAxis } from "@dnd-kit/abstract/modifiers";
import { isSortable } from "@dnd-kit/dom/sortable";
import { arrayMove } from "@/utils/arrayMove";

type OptionsContainerProps = {
    field: SelectField | RadioGroupField | CheckboxGroupField;
    onUpdate: (changes: Partial<DistributiveOmit<FieldSchema, 'id' | 'type'>>) => void;
}

const OptionsContainer = ({field, onUpdate}: OptionsContainerProps) => {

  const shouldFocusNextOption = useRef<boolean>(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const lastInputCallbackRef = useCallback((node: HTMLInputElement) => {
    if (node && shouldFocusNextOption.current) {
      shouldFocusNextOption.current = false;
      node.focus();
    }
  }, []);
  
  const handleAddOption: React.MouseEventHandler<HTMLButtonElement> = () => {
    const newOption: FieldOption ={
        id: crypto.randomUUID(),
        label: "Option " + (field.options.length + 1),
        value: "Option " + (field.options.length + 1),
        disabled: false
    }

    shouldFocusNextOption.current = true;
    onUpdate({options: [...field.options, newOption]});
  }
    
  return (
    <div ref={containerRef} className="mt-2">
      <DragDropProvider modifiers={[
          RestrictToVerticalAxis, // eslint-disable-next-line react-hooks/refs
          RestrictToElement.configure({
            element: () => containerRef?.current ?? null
          })
        ]}
        onDragEnd={(event) => {
          if (event.canceled) return;

          const { source } = event.operation;

          if (isSortable(source)) {
            const { initialIndex, index } = source;

            if (initialIndex !== index) {
              const updatedOptions = arrayMove(field.options, initialIndex, index);
              onUpdate({options: updatedOptions});
            }
          }
        }}>
        <div>
            {field.options.map((option, index) => (
                <OptionInput key={option.id} field={field} option={option} index={index} onUpdate={onUpdate} inputRef={index === field.options.length - 1 ? lastInputCallbackRef : undefined} />
            ))}
        </div>
      </DragDropProvider>
      <button 
        type="button" 
        aria-label="Add Option"
        onClick={handleAddOption}
        className="flex items-center gap-0.5 px-2 py-1.5 absolute xl:top-3.5 top-2 right-4 text-foreground bg-primary/80 hover:bg-primary/75 hover:scale-105 active:scale-95 transition-all rounded-sm"
      >
        <Plus className="mr-0.5 size-4" strokeWidth={2} />
        <span className="text-sm font-medium mr-0.5">Add Option</span>
      </button>
    </div>
  )
}

export default OptionsContainer