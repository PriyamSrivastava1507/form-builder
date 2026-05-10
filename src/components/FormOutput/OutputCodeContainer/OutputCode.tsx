import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter";
import tsx from "react-syntax-highlighter/dist/esm/languages/prism/tsx";
import typescript from "react-syntax-highlighter/dist/esm/languages/prism/typescript";
import javascript from "react-syntax-highlighter/dist/esm/languages/prism/javascript";
import json from "react-syntax-highlighter/dist/esm/languages/prism/json";
import { githubDarkTheme } from "@/theme/githubDark";
import { useOutputFormatStore } from "@/store/outputformat.store";
import { generateZodObjectSchema } from "@/generators/zodSchema/generateZodSchema";
import { useFormStore } from "@/store/form.store";
import { generateYupObjectSchema } from "@/generators/yupSchema/generateYupSchema";
import { generateRHFForm, generateRHFYupForm } from "@/generators/rhfForm/generateRhfForm";
import { generateFormikYupForm, generateFormikZodForm } from "@/generators/formikForm/generateFormikForm";
import { generateRHFZodSingleFile } from "@/generators/completeCode/rhfZodSingleCode";
import { generateRHFYupSingleFile } from "@/generators/completeCode/rhfYupSIngleCode";
import { generateFormikZodSingleFile } from "@/generators/completeCode/formikZodSingleCode";
import { generateFormikYupSingleFile } from "@/generators/completeCode/formikYupSingleCode";

SyntaxHighlighter.registerLanguage("tsx", tsx);
SyntaxHighlighter.registerLanguage("typescript", typescript);
SyntaxHighlighter.registerLanguage("javascript", javascript);
SyntaxHighlighter.registerLanguage("json", json);

type OutputCodeProps = {
    currentTab: "schema" | "form" | "json" | "full-code";
}

/**
 * @component
 * Renders the generated code using syntax highlighting.
 * Generates the appropriate code string based on the selected library, language, and tab.
 * @param {OutputCodeProps} props - Component props
 * @param {"schema" | "form" | "json" | "full-code"} props.currentTab - The currently active output tab
 */
const OutputCode = ({ currentTab }: OutputCodeProps) => {
    const fields = useFormStore((state)=>state.fields)
    const language = useOutputFormatStore((state) => state.language);
    const library = useOutputFormatStore((state) => state.library);
    const isTS = language === "TypeScript";

    let code="";
    let codeLanguage="tsx";

    if(currentTab==="schema"){
        if(library==="React Hook Form + Zod" || library === "Formik + Zod"){
            code=generateZodObjectSchema("formSchema", fields, isTS);
            codeLanguage=isTS ? "typescript" : "javascript";
        }
        else if(library==="React Hook Form + Yup" || library === "Formik + Yup"){
            code=generateYupObjectSchema("formSchema", fields, isTS);
            codeLanguage=isTS ? "typescript" : "javascript";
        }
    }
    else if(currentTab==="form"){
        if(library==="React Hook Form + Zod"){
            code = generateRHFForm(fields, "formSchema", isTS);
        }
        else if(library==="React Hook Form + Yup"){
            code=generateRHFYupForm(fields, "formSchema", isTS);
        }
        else if(library==="Formik + Zod"){
            code=generateFormikZodForm(fields, "formSchema", isTS);
        }
        else if(library==="Formik + Yup"){
            code=generateFormikYupForm(fields, "formSchema", isTS);
        }
    }
    else if(currentTab==="full-code"){
        if(library==="React Hook Form + Zod"){
            code=generateRHFZodSingleFile(fields, "formSchema", isTS);
        }
        else if(library==="React Hook Form + Yup"){
            code=generateRHFYupSingleFile(fields, "formSchema", isTS);
        }
        else if(library==="Formik + Zod"){
            code=generateFormikZodSingleFile(fields, "formSchema", isTS);
        }
        else if(library==="Formik + Yup"){
            code=generateFormikYupSingleFile(fields, "formSchema", isTS);
        }
    }
    else if(currentTab==="json"){
        code=JSON.stringify(fields, null, 2);
        codeLanguage="json";
    }
    
    return (
        <div className="w-full p-6 bg-surface">
            <SyntaxHighlighter
                language={codeLanguage}
                style={githubDarkTheme}
                showLineNumbers
                customStyle={{
                    margin: 0,
                    borderRadius: '0 0 8px 8px',
                    background: 'transparent',
                    fontSize: '16px',
                }}
                lineNumberStyle={{
                    color: '#555',
                    minWidth: '3em',
                    paddingRight: '2em',
                    userSelect: 'none',
                }}
                lineNumberContainerStyle={{
                    fontStyle: 'normal', // 🔥 THIS fixes it
                }}
            >
                {code}
            </SyntaxHighlighter>
        </div>
    )
}

export default OutputCode

