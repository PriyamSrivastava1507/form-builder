import OutputCode from "./OutputCode";
import OutputCodeHeading from "./OutputCodeHeading"

type OutputCodeContainerProps = {
    currentTab: "schema" | "form" | "json" | "full-code";
}


/**
 * @component
 * A container wrapper for the output code display, grouping the heading and the highlighted code.
 * @param {OutputCodeContainerProps} props - Component props
 * @param {"schema" | "form" | "json" | "full-code"} props.currentTab - The currently active output tab
 */
const OutputCodeContainer = ({currentTab}: OutputCodeContainerProps) => {
    return (
        <div className="w-full mt-4 rounded-xl bg-background border-2 border-border/40">
            <OutputCodeHeading currentTab={currentTab}/>
            <OutputCode currentTab={currentTab} />
        </div>
    )
}

export default OutputCodeContainer