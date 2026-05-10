import { useFormStore } from "@/store/form.store";
import { useOutputFormatStore } from "@/store/outputformat.store";
import { generateCode } from "@/utils/generateCode";
import { getFilename } from "@/utils/getFilename";
import { Check, Copy, Download, Save } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import FormSaveButton from "../Navbars/FormSaveButton";
import ReplaceTemplateModal from "../ReplaceTemplateModal";

type FormatToolbarProps = {
  currentTab: "schema" | "form" | "json" | "full-code";
}

const FormatToolbar = ({currentTab}: FormatToolbarProps) => {
  const fields = useFormStore((state)=>state.fields)
  const language = useOutputFormatStore((state) => state.language);
  const formName = useFormStore((state) => state.formName);
  const library = useOutputFormatStore((state) => state.library);
  const [copied, setCopied] = useState<boolean>(false);
  const [downloaded, setDownloaded] = useState<boolean>(false);
  const [openModal, setOpenModal] = useState<boolean>(false);

  const handleCopyCode = async () => {
    const code = generateCode({currentTab,fields,language,library});
    await navigator.clipboard.writeText(code);
    toast.success("Code copied to clipboard");
    setCopied(true);
    setTimeout(() => {
        setCopied(false);
    }, 1500);
  }

  const handleDownloadCode = () => {
    const code = generateCode({currentTab,fields,language,library});
    const filename = getFilename(currentTab, language);
    const blob = new Blob([code], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
    toast.success(`Downloaded ${filename}`);
    setDownloaded(true);
    setTimeout(() => {
        setDownloaded(false);
    }, 1500);
  }


  return (
    <div 
      className="h-10 w-fit flex justify-end items-center gap-4 text-xs text-foreground/90 font-medium"
      role="toolbar"
      aria-label="Output actions"
    >
      <FormSaveButton 
        formName={formName}
        disabled={currentTab !== "json"}
        setOpenModal={setOpenModal}
        className={`h-10 w-fit px-5 py-2 flex justify-center items-center gap-3 border-2 border-border/75 rounded-lg bg-surface/60 backdrop-blur-sm transition-all ${currentTab !== "json" ? "text-foreground-muted/80 border-border/20 cursor-not-allowed" : "hover:scale-105 active:scale-95 hover:text-success/90 hover:bg-success/10 hover:border-success/15 cursor-pointer"}`}>
          <Save className="size-4 mb-0.5" />
          <p className="max-xl:hidden">SAVE</p>
        </FormSaveButton>
      <button 
        className={`h-10 w-fit px-5 py-2 flex justify-center items-center gap-3 border-2 border-border/75 rounded-lg bg-surface/60 backdrop-blur-sm transition-all ${
          copied?"text-foreground-muted/80 border-border/20 cursor-not-allowed":"hover:text-primary-secondary hover:bg-primary/20 hover:scale-105 active:scale-95 hover:border-primary/25 cursor-pointer"
        }`}
        aria-label="Copy output"
        aria-roledescription="button"
        onClick={handleCopyCode}
        disabled={copied}
        >
          {copied ? <Check className="size-4 mb-0.5" /> : <Copy className="size-4 mb-0.5" />}
          {copied ? <p className="max-xl:hidden">COPIED</p> : <p className="max-xl:hidden">COPY</p>}
      </button>
      <button 
        className={`h-10 w-fit px-5 py-2 flex justify-center items-center gap-3 border-2 border-border/75 rounded-lg bg-surface/60 backdrop-blur-sm transition-all ${
          downloaded?"text-foreground-muted/80 border-border/20 cursor-not-allowed":"hover:text-primary-secondary hover:bg-primary/20 hover:scale-105 active:scale-95 hover:border-primary/25 cursor-pointer"
        }`}
        aria-label="Download output"
        aria-roledescription="button"
        onClick={handleDownloadCode}
        disabled={downloaded}
      >
        {downloaded ? <Check className="size-4 mb-0.5" /> : <Download className="size-4 mb-0.5" />}
        {downloaded ? <p className="max-xl:hidden">DOWNLOADED</p> : <p className="max-xl:hidden">DOWNLOAD</p>}
      </button>
      <ReplaceTemplateModal open={openModal} setOpenModal={setOpenModal} />
    </div>
  )
}

export default FormatToolbar
