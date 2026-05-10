import { useOutputFormatStore } from "@/store/outputformat.store";
import { Braces, Code2Icon, DatabaseIcon, FormInput } from "lucide-react";

type OutputCodeHeadingProps = {
    currentTab: "schema" | "form" | "json" | "full-code";
}

/**
 * @component
 * Displays the heading above the generated code, indicating the selected language, library, and component type.
 * @param {OutputCodeHeadingProps} props - Component props
 * @param {"schema" | "form" | "json" | "full-code"} props.currentTab - The currently active output tab
 */
const OutputCodeHeading = ({currentTab}: OutputCodeHeadingProps) => {
    const language = useOutputFormatStore((state)=>state.language);
    const library = useOutputFormatStore((state)=>state.library);
    const [formlibrary, schema] = library.split("+").map(s=>s.trim());

    return (
        <div className="w-full px-4 py-2.5 flex justify-between items-center bg-surface-raised rounded-t-lg border-b-2 border-border/40">
            <h2 className="ml-1 text-sm font-medium text-foreground/90 capitalize tracking-wider flex justify-center items-center gap-3">
                {currentTab === "schema" && <>
                    <DatabaseIcon className="size-4" />
                    {`${language} + ${schema}`}
                </>}
                {currentTab === "form" && <>
                    <FormInput className="size-4" />
                    {`${language} + ${formlibrary}`}
                </>}
                {currentTab === "json" && <>
                    <Braces className="size-4" />
                    JSON
                </>}
                {currentTab === "full-code" && <>
                    <Code2Icon className="size-4" />
                    {`${language} + ${formlibrary} + ${schema}`}
                </>}
            </h2>   
        </div>
    )
}

export default OutputCodeHeading