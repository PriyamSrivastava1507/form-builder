import { ArrowLeft } from "lucide-react"
import LanguageDropdown from "../LanguageDropdown"
import LibraryDropdown from "../LibraryDropdown"
import { useNavigate } from "react-router"
import { useOutputFormatStore } from "@/store/outputformat.store"

type FormatSelectionToolBarProps = {
    currentPage: "home" | "builder" | "format-selection" | "output" | "preview" | "see-all-page";
}

/**
 * @component
 * Toolbar for format selection and code output pages, allowing users to choose target language and library.
 * Includes a back button to return to the builder.
 * @param {FormatSelectionToolBarProps} props - Component props
 * @param {"home" | "builder" | "format-selection" | "output" | "preview" | "see-all-page"} props.currentPage - The current active page
 */
const FormatSelectionToolBar = ({currentPage}:FormatSelectionToolBarProps) => {
  const navigate = useNavigate();
  const setLanguage = useOutputFormatStore((state) => state.setLanguage);
  const setLibrary = useOutputFormatStore((state) => state.setLibrary);  

  const handleGoBack = () => {
    setLanguage("TypeScript");
    setLibrary("React Hook Form + Zod"); 
    if(currentPage === "output"){
      navigate("/builder");
    } else {
      navigate("/builder");
    }
  }

  return (
    <>
        <button 
            type="button" 
            aria-label="Back" 
            onClick={handleGoBack}
            className="flex items-center justify-center gap-2 py-2 px-3 text-foreground/80 hover:text-primary-secondary hover:bg-primary/20 hover:scale-105 active:scale-95 transition-all border-[1.5px] border-border/70 hover:border-primary/25 rounded-md cursor-pointer"
        >
            <ArrowLeft className="size-4" strokeWidth={2} />
            <span className="text-sm font-medium mr-1">Back</span>
        </button>
        <LanguageDropdown />
        <LibraryDropdown />
    </>
  )
}

export default FormatSelectionToolBar