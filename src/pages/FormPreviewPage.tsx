import FormatTabList from "@/components/FormOutput/FormatTabList";
import OutputCodeContainer from "@/components/FormOutput/OutputCodeContainer/OutputCodeContainer";
import { useState } from "react";

const FormPreviewPage = () => {
  const [currentTab, setCurrentTab] = useState<"schema" | "form" | "json" | "full-code">("schema");
  return (
    <section className="h-[calc(100vh-var(--spacing-navbar))] w-full px-12 py-4">
      <div className="w-full flex items-center justify-between px-6 py-4">
        <FormatTabList currentTab={currentTab} setCurrentTab={setCurrentTab} fullWidth />
      </div>
      <OutputCodeContainer currentTab={currentTab} />
    </section>
  );
};

export default FormPreviewPage;
