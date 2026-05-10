import { useNavigate } from "react-router";
import { ArrowLeft } from "lucide-react";

/**
 * @component
 * Header used on the "See All Templates" page, featuring a back button to navigate to the home page.
 */
const TemplateHeader = () => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center max-xl:ml-[-28px]">
      <button 
        onClick={() => navigate("/")}
        className="flex items-center gap-4 xl:gap-6 text-foreground/80 hover:text-foreground transition-colors group cursor-pointer"
        aria-label="Back to Home"
      >
        <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
        <h1 className="text-xl font-medium tracking-tight">Templates</h1>
      </button>
    </div>
  );
};

export default TemplateHeader;
