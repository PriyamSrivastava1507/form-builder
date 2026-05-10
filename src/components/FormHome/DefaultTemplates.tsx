import { ChevronsUpDownIcon } from "lucide-react"
import DefaultTemplatesItem from "./DefaultTemplatesItem"
import { PREDEFINED_TEMPLATES } from "@/constants/templates"
import { useNavigate } from "react-router"

const DefaultTemplates = () => {
  const navigate = useNavigate();
  const mostUsed = PREDEFINED_TEMPLATES.slice(0, 2);

  return ( 
    <div>
       <div className="flex justify-between items-center mb-2.5">
            <h3 className="text-sm font-medium text-foreground/80">From Default Templates</h3>
            <button 
              onClick={() => navigate("/see-all-templates")}
              className="group/see-all-btn px-4 py-1.5 text-sm font-medium rounded-sm text-foreground/80 hover:text-primary-secondary hover:bg-primary/20 hover:border-primary/25 active:scale-95 border
            border-transparent transition-all cursor-pointer flex items-center gap-2">
                <span className="group-hover/see-all-btn:text-primary-secondary ml-2">See All</span>
                <ChevronsUpDownIcon size={20} className="text-foreground/80 group-hover/see-all-btn:text-primary-secondary" strokeWidth={2} />
            </button>
        </div>
       <div className="flex items-center gap-x-10">
            {mostUsed.map((template, index) => (
                <DefaultTemplatesItem 
                  key={template.id} 
                  template={template} 
                  className={index === 2 ? "hidden xl:block" : ""}
                />
            ))}
      </div>
      
    </div>
  )
}

export default DefaultTemplates

//"group/create-form-btn h-36 w-52 bg-surface rounded-sm flex items-center justify-center hover:border-primary/30 hover:bg-primary/10 hover:scale-105 active:scale-95 transition-all border-[1.5px] border-border/50 cursor-pointer"