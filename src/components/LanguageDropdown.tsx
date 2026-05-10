import Dropdown from "@/components/ui/dropdown";
import { useOutputFormatStore } from "@/store/outputformat.store";

const LanguageDropdown = () => {
    const languageOptions = useOutputFormatStore((state)=>state.languageOptions);    
    const language = useOutputFormatStore((state)=>state.language);    
    const setLanguage = useOutputFormatStore((state)=>state.setLanguage);
    
    return(
        <Dropdown items={languageOptions} value={language} onChange={setLanguage} placeholder="Select language" className="h-[39px]"/>
    )
            
}

export default LanguageDropdown;