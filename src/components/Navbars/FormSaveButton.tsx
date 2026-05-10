import { useFormStore } from "@/store/form.store";
import type { TemplateCollection } from "@/types/output";
import { toast } from "sonner";

type FormSaveButtonProps = {
    formName: string;
    className: string;
    setOpenModal: (openModal: boolean) => void;
    children: React.ReactNode;
    disabled: boolean;
}

/**
 * @component
 * A reusable save button component that handles saving form templates to local storage.
 * Opens a modal if a template with the same name already exists.
 * @param {FormSaveButtonProps} props - Component props
 * @param {string} props.formName - Name of the form to save
 * @param {string} props.className - Additional CSS classes
 * @param {(openModal: boolean) => void} props.setOpenModal - Function to open the overwrite confirmation modal
 * @param {React.ReactNode} props.children - Child elements (e.g., icon)
 * @param {boolean} props.disabled - Whether the button is disabled
 */
const FormSaveButton = ({ formName, className, setOpenModal, children, disabled }: FormSaveButtonProps) => {
   const handleSave = () => {
    if(!localStorage.getItem("templates")){
      const templates: TemplateCollection = {};
      console.log("save: ", useFormStore.getState().fields);
      templates[formName] = {
        fields: useFormStore.getState().fields,
        lastModified: new Date()
      };
      localStorage.setItem("templates", JSON.stringify(templates));
      toast.success("Form saved successfully");
      console.log("templates: ", JSON.parse(localStorage.getItem("templates") || '{}'));
    } else {
      const templates: TemplateCollection = JSON.parse(localStorage.getItem("templates") || '{}');
      console.log("templates: ", JSON.parse(localStorage.getItem("templates") || '{}'));
      console.log("formName: ", formName);
      console.log("formName in templates: ", formName in templates);
      if (formName in templates) {
        setOpenModal(true);
      } else {
        templates[formName] = {
          fields: useFormStore.getState().fields,
          lastModified: new Date()
        };
        localStorage.setItem("templates", JSON.stringify(templates));
        toast.success("Form saved successfully");
        console.log("templates: ", JSON.parse(localStorage.getItem("templates") || '{}'));
      }
    }
  } 
  return (
   <button 
        type="button" 
        aria-label="Save"
        onClick={handleSave}
        disabled={disabled} 
        className={className}>
        {children}
    </button>
  )
}

export default FormSaveButton