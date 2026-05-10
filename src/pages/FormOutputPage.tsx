import FormatTabList from "@/components/FormOutput/FormatTabList"
import FormatToolbar from "@/components/FormOutput/FormatToolbar"
import OutputCodeContainer from "@/components/FormOutput/OutputCodeContainer/OutputCodeContainer"
import { useState } from "react";

/**
 * @component
 * Renders the page displaying the generated form code and schema output.
 * Manages the current active tab (schema, form, json, full-code).
 */
const FormOutputPage = () => {
  const [currentTab, setCurrentTab] = useState<"schema" | "form" | "json" | "full-code">("schema");
  return (
    <section className="h-[calc(100vh-var(--spacing-navbar))] w-full px-12 py-4">
      <div className="w-full flex items-center justify-between px-6 py-4">
        <FormatTabList currentTab={currentTab} setCurrentTab={setCurrentTab} />
        <FormatToolbar currentTab={currentTab}/>
      </div>
      <OutputCodeContainer currentTab={currentTab} />
    </section>
  )
}

export default FormOutputPage