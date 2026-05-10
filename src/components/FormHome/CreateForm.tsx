import { useFormStore } from "@/store/form.store"
import { PlusIcon } from "lucide-react"
import { useNavigate } from "react-router"

/**
 * @component
 * Renders the "Create A New Form" card on the home page.
 * Clicking it resets the form store to start a fresh form.
 */
const CreateForm = () => {
  const navigate = useNavigate()
  const clearFields = useFormStore((state)=>state.clearFields)
  const setFormName = useFormStore((state)=>state.setFormName)

  const handleCreateNewForm = () => {
    clearFields();
    setFormName("Untitled Form");
    navigate("/builder");
  }
  return ( 
    <div onClick={handleCreateNewForm}>
       <h3 className="text-sm font-medium text-foreground/80 mb-5">Create A New Form</h3> 
      <button 
        className="group/create-form-btn h-36 w-56 bg-primary/65 rounded-sm flex items-center justify-center hover:border-primary hover:bg-primary/50 active:scale-95 transition-all border-[1.5px] border-border/50 cursor-pointer">
          <PlusIcon size={55} className="text-foreground group-hover/create-form-btn:text-primary-secondary transition-colors duration-200" strokeWidth={2} />
      </button>
    </div>
  )
}

export default CreateForm
