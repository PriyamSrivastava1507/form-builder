import DeleteTemplateModal from "@/components/DeleteTemplateModal"
import RenameTemplateModal from "@/components/RenameTemplateModal"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MoreVerticalIcon } from "lucide-react"
import { useState } from "react"
import type { TemplateCollectionParsed } from "@/types/output";

type UserTemplateMenuType = {
    setTemplates: (templates: TemplateCollectionParsed) => void;
    templateName: string;
}

const UserTemplateMenu = ({setTemplates, templateName}: UserTemplateMenuType) => {
  const [isRenameModalOpen,setIsRenameModalOpen]=useState(false)
  const [isDeleteModalOpen,setIsDeleteModalOpen]=useState(false)
  
  const handleRename =(e:React.MouseEvent<HTMLDivElement>)=>{
    e.stopPropagation();

    setTimeout(()=>{
      setIsRenameModalOpen(true);
    },50);
  }  
  const handleDelete =(e:React.MouseEvent<HTMLDivElement>)=>{
    e.stopPropagation();
    setTimeout(()=>{
      setIsDeleteModalOpen(true);
    },50);
  }

  return (
    <>
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button
                    onClick={(e)=>e.stopPropagation()}
                    className="p-1 rounded-full hover:bg-surface-overlay hover:scale-110 active:scale-95 transition-colors duration-200 justify-self-end"
                >
                    <MoreVerticalIcon size={20} className="text-foreground/60  group-hover/template-list-item:text-primary-secondary transition-colors duration-200" strokeWidth={2} />
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={handleRename}>Rename</DropdownMenuItem>
                <DropdownMenuItem onClick={handleDelete}>Delete</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
        <DeleteTemplateModal isOpen={isDeleteModalOpen} onClose={()=>setIsDeleteModalOpen(false)} setTemplates={setTemplates} templateName={templateName} />
        <RenameTemplateModal open={isRenameModalOpen} onClose={()=>setIsRenameModalOpen(false)} setTemplates={setTemplates} templateName={templateName} />
    </>
  )
}

export default UserTemplateMenu