import { useFormStore } from "@/store/form.store";
import { useNavigate } from "react-router";
import type { Template } from "@/constants/templates";

/**
 * @component
 * Renders an individual default template card.
 * Clicking it loads the template's fields into the form builder.
 * @param {Object} props - Component props
 * @param {Template} props.template - The predefined template data
 * @param {string} [props.className] - Optional CSS classes for styling
 */
const DefaultTemplatesItem = ({template, className}: {template: Template, className?: string}) => {
  const navigate = useNavigate();
  const clearFields = useFormStore((state) => state.clearFields);
  const setFormName = useFormStore((state) => state.setFormName);
  const setFields = useFormStore((state) => state.setFields);

  const handleClick = () => {
    clearFields();
    setFormName(template.name);
    // Clone fields so modifications don't mutate the constant
    setFields(structuredClone(template.fields));
    navigate("/builder");
  };

  return (
    <div 
      onClick={handleClick}
      className={`group/default-template-item h-36 w-60 shrink-0 bg-surface border-border border-[1.5px] rounded-sm hover:border-primary/40 hover:bg-primary/20 transition-all cursor-pointer ${className || ""}`}>
        <div className="w-full h-[70%] flex items-center justify-center p-2">
            <template.icon size={28} strokeWidth={1.5} className="text-foreground/80 group-hover/default-template-item:text-primary-secondary transition-colors" />
        </div>
        <div className="w-full h-[30%] flex items-center justify-center border-t-[1.5px] border-border/50">
            <p className="text-foreground/90 font-medium text-sm group-hover/default-template-item:text-primary-secondary transition-colors">{template.name}</p>
        </div>
    </div>
  )
}

export default DefaultTemplatesItem