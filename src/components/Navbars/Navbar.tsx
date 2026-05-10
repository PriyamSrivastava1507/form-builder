import { Pen, Search } from "lucide-react"
import { useNavigate, useLocation, useSearchParams } from "react-router";
import { useState, useEffect } from "react";
import EditableFormTitle from "./EditableFormTitle";
import FormatSelectionToolBar from "./FormatSelectionToolBar";
import BuilderToolBar from "./BuilderToolBar";
import ReplaceTemplateModal from "../ReplaceTemplateModal";
import TemplateHeader from "./TemplateHeader";

type CurrentPage = "home" | "builder" | "format-selection" | "output" | "see-all-page" | "preview";

/**
 * Derives the current page identifier from the URL pathname.
 * This replaces the old Zustand nav store — the URL is now the
 * single source of truth for which page is active.
 */
const deriveCurrentPage = (pathname: string): CurrentPage => {
  if (pathname === "/builder") return "builder";
  else if (pathname === "/format-selection") return "format-selection";
  else if (pathname === "/output") return "output";
  else if (pathname === "/see-all-templates") return "see-all-page";
  else if (pathname === "/preview") return "preview";
  return "home";
};

/**
 * @component
 * Renders the top navigation bar with form builder actions (save, preview, undo/redo, etc.)
 */
const Navbar = () => {
  const { pathname } = useLocation();
  const currentPage = deriveCurrentPage(pathname);
  const navigate = useNavigate();

  const [openModal, setOpenModal] = useState<boolean>(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [inputValue, setInputValue] = useState(searchParams.get("search") || "");

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (inputValue.trim() !== "") {
        setSearchParams({ search: inputValue }, { replace: true });
      } else {
        setSearchParams({}, { replace: true });
      }
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [inputValue, setSearchParams]);

  const handleGenerateForm = () => {
    if(currentPage === "builder"){
      navigate("/format-selection");
    }
    else if(currentPage === "format-selection"){
      navigate("/output");
    } 
  }

  return (
    <header className={`h-navbar w-full border-b-[1.5px] border-border ${currentPage !== "home" ? "xl:pl-7 pr-9 lg:pl-9" : "xl:pl-14 xl:pr-9 lg:pl-14 lg:pr-12"} py-4 flex justify-between items-center`}>
      {currentPage === "see-all-page" ? (
        <TemplateHeader />
      ) : (
        <EditableFormTitle currentPage={currentPage} />
      )}
      <div className="flex items-center gap-4">
        {currentPage === "home" && (
          <div className="relative flex items-center mr-2">
            <Search className="absolute left-2.5 size-4 text-foreground/90" />
            <input
              type="text"
              placeholder="Search templates..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="h-8 w-96 pl-8 pr-3 py-1.5 rounded-lg border-[1.5px] text-foreground/90 placeholder:text-foreground/70 border-border bg-surface/70 text-sm focus:outline-none focus:ring-1 focus:ring-primary transition-all"
            />
          </div>
        )}
        {(currentPage === "format-selection" || currentPage === "output" || currentPage === "preview") && (
          <FormatSelectionToolBar currentPage={currentPage} />
        )}
        {currentPage === "builder" && (
          <BuilderToolBar setOpenModal={setOpenModal} />
        )}
        {(currentPage !== "output" && currentPage !== "home" && currentPage !== "see-all-page" && currentPage !== "preview") && (
          <button 
          type="button" 
          aria-label="Generate Form" 
          onClick={handleGenerateForm} 
          className="flex items-center gap-2 px-4 py-2 text-foreground bg-primary hover:bg-primary/80 hover:scale-105 active:scale-95 transition-all rounded-md cursor-pointer"
          >
          <Pen className="size-4" strokeWidth={2.5} />
          <span className="text-sm font-medium">{currentPage==="format-selection" ? "Proceed" : "Generate Code"}</span>
        </button>
        )}
      </div>
      <ReplaceTemplateModal open={openModal} setOpenModal={setOpenModal} />
    </header>
  )
}

export default Navbar;