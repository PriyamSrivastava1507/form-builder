import { Braces, Code2Icon, DatabaseIcon, FormInputIcon } from "lucide-react";

type FormatTabListProps = {
    currentTab: "schema" | "form" | "json" | "full-code";
    setCurrentTab: (tab: "schema" | "form" | "json" | "full-code") => void;
    fullWidth?: boolean;
}


const FormatTabList = ({currentTab, setCurrentTab, fullWidth}: FormatTabListProps) => {
  return (
    <div
      className={`h-10 flex items-center bg-surface/60 rounded-lg ${fullWidth ? "w-full" : "w-[60%]"}`}
      role="tablist"
      aria-label="Output Format tabs"
    >
      <button
        className={`flex-1 h-full flex justify-center items-center gap-3 border-2 border-border/75 text-xs text-foreground/90 font-medium rounded-l-lg cursor-pointer transition-all duration-200 ${currentTab === "schema" ? "text-primary-secondary bg-primary/10 border-primary/25" : ""}`}
        role="tab"
        aria-selected={currentTab === "schema"}
        aria-controls="schema-tab"
        id="schema-tab"
        onClick={() => {console.log(currentTab); setCurrentTab("schema")}}
      >
        <DatabaseIcon className="size-4 mb-0.5" /> 
        <p className="mr-1">SCHEMA</p>
      </button>
      <button
        className={`flex-1 h-full flex justify-center items-center gap-3 border-2 border-border/75 text-xs text-foreground/90 font-medium cursor-pointer transition-all duration-200  ${currentTab === "form" ? "text-primary-secondary bg-primary/10 border-primary/25" : ""}`}
        role="tab"
        aria-selected={currentTab === "form"}
        aria-controls="form-tab"
        id="form-tab"
        onClick={() => {console.log(currentTab); setCurrentTab("form")}}
      >
        <FormInputIcon className="size-4 mb-0.5" />
        <p className="mr-1">FORM</p>
      </button>
      <button
        className={`flex-1 h-full flex justify-center items-center gap-3 border-2 border-border/75 text-xs text-foreground/90 font-medium cursor-pointer transition-all duration-200 ${currentTab === "json" ? "text-primary-secondary bg-primary/10 border-primary/25" : ""}`}
        role="tab"
        aria-selected={currentTab === "json"}
        aria-controls="json-tab"
        id="json-tab"
        onClick={() => {console.log(currentTab); setCurrentTab("json")}}
      >
        <Braces className="size-4 mb-0.5" />
        <p className="mr-1">JSON</p>
      </button>
      <button
        className={`flex-1 h-full flex justify-center items-center gap-3 border-2 border-border/75 text-xs text-foreground/80 font-medium rounded-r-lg cursor-pointer transition-all duration-200 ${currentTab === "full-code" ? "text-primary-secondary bg-primary/10 border-primary/25" : ""}`}
        role="tab"
        aria-selected={currentTab === "full-code"}
        aria-controls="full-code-tab"
        id="full-code-tab"
        onClick={() => {console.log(currentTab); setCurrentTab("full-code")}}
      >
        <Code2Icon className="size-4 mb-0.5" />
        <p className="mr-1">FULL CODE</p>
      </button>
    </div>
  )
}

export default FormatTabList