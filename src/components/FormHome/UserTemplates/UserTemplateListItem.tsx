import { SquareMenuIcon } from "lucide-react"
import type { TemplateParsedType } from "@/types/output";
import { useFormStore } from "@/store/form.store";
import { useNavigate } from "react-router";
import UserTemplateMenu from "./UserTemplateMenu";
import type { TemplateCollectionParsed } from "@/types/output";

type UserTemplateListItemProps = {
    templateName: string;
    templateData: TemplateParsedType;
    setTemplates: (templates: TemplateCollectionParsed) => void;
}

const UserTemplateListItem = ({templateName, templateData, setTemplates}: UserTemplateListItemProps) => {
  const setFields = useFormStore((state)=>state.setFields);
  const navigate = useNavigate();
  const clearFields = useFormStore((state)=>state.clearFields);
  const setFormName = useFormStore((state)=>state.setFormName);

  const handleTemplateClick = () => {
    clearFields();
    setFormName(templateName);
    setFields(templateData.fields);
    navigate("/builder");
  }
  return (
    <div onClick={handleTemplateClick} className="group/template-list-item grid grid-cols-3 items-center px-6 py-3 mb-1 cursor-pointer hover:bg-primary/25 transition-colors duration-200 rounded-lg">
        <div className="flex items-center gap-8 justify-self-start">
            <SquareMenuIcon size={24} className="text-foreground/80 group-hover/template-list-item:text-primary-secondary transition-colors duration-200" strokeWidth={2} />
            <p className="text-foreground/80 font-medium group-hover/template-list-item:text-primary-secondary transition-colors duration-200">{templateName}</p>
        </div>
        <p className="text-foreground/60 text-sm group-hover/template-list-item:text-primary-secondary transition-colors duration-200 justify-self-center">{new Date(templateData.lastModified).toLocaleDateString()}</p>
        <UserTemplateMenu setTemplates={setTemplates} templateName={templateName} />
    </div>
  )
}

export default UserTemplateListItem