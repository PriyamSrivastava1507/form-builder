import { useFormStore } from "@/store/form.store";
import { FileTerminal } from "lucide-react";
import { Link } from "react-router";

type EditableFormTitleProps = {
    currentPage: "home" | "builder" | "format-selection" | "output" | "preview" | "see-all-page";
}

/**
 * @component
 * An editable title for the form that appears in the navbar.
 * Displays as static text on the home page and an input field elsewhere.
 * @param {EditableFormTitleProps} props - Component props
 * @param {"home" | "builder" | "format-selection" | "output" | "preview" | "see-all-page"} props.currentPage - The current active page
 */
const EditableFormTitle = ({currentPage}: EditableFormTitleProps) => {

  const formName = useFormStore((state) => state.formName);
  const setFormName = useFormStore((state) => state.setFormName);
  const clearFields = useFormStore((state) => state.clearFields);

  return (
    <div className="flex gap-3 items-center">
        <Link to="/">
          <FileTerminal onClick={() => {setFormName("Untitled Form"); clearFields();}} className={`${currentPage !== "home" ? "text-foreground/90" : "text-primary"} size-7 mb-0.5`} />
        </Link>
        {currentPage === "home" ? (
          <h1 className="text-lg font-bold text-foreground/90 tracking-wide py-1.5">Codiform</h1>
        ) : (
          <input 
            type="text" 
            value={formName} 
            onChange={(e)=>setFormName(e.target.value)}
            onBlur={(e)=>{
              if(e.target.value.trim() === "") setFormName("Untitled Form");
              e.target.blur();
            }} 
            placeholder="Form Name" 
            className="text-lg text-foreground/90 font-normal p-1.5 rounded-md focus:outline-2 focus:outline-foreground/40 cursor-pointer" />
        )}
      </div>
  )
}

export default EditableFormTitle