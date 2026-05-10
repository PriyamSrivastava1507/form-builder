import Dropdown from "@/components/ui/dropdown";
import { useOutputFormatStore } from "@/store/outputformat.store";

const LibraryDropdown = () => {
    const libraryOptions = useOutputFormatStore((state)=>state.libraryOptions);    
    const library = useOutputFormatStore((state)=>state.library);    
    const setLibrary = useOutputFormatStore((state)=>state.setLibrary);
    
    return(
        <Dropdown items={libraryOptions} value={library} onChange={setLibrary} placeholder="Select library" className="h-[39px]"/>
    )
            
}

export default LibraryDropdown;