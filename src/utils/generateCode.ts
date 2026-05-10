import { generateFormikYupSingleFile } from "@/generators/completeCode/formikYupSingleCode";
import { generateFormikZodSingleFile } from "@/generators/completeCode/formikZodSingleCode";
import { generateRHFYupSingleFile } from "@/generators/completeCode/rhfYupSIngleCode";
import { generateRHFZodSingleFile } from "@/generators/completeCode/rhfZodSingleCode";
import { generateFormikYupForm, generateFormikZodForm } from "@/generators/formikForm/generateFormikForm";
import { generateRHFForm, generateRHFYupForm } from "@/generators/rhfForm/generateRhfForm";
import { generateYupObjectSchema } from "@/generators/yupSchema/generateYupSchema";
import { generateZodObjectSchema } from "@/generators/zodSchema/generateZodSchema";
import type { FieldSchema } from "@/types/field";
import type { LanguageOptions, LibraryOptions } from "@/types/output";

type CodeOption = {
    currentTab: "schema" | "form" | "json" | "full-code";
    fields: FieldSchema[];
    language: LanguageOptions;
    library: LibraryOptions;
}

export const generateCode = ({currentTab,fields,language,library}: CodeOption):string=>{
    const isTs: boolean = language === "TypeScript";
    let generatedCode: string = "";

    if(currentTab==="schema"){
        if(library==="React Hook Form + Zod" || library === "Formik + Zod"){
            generatedCode=(generateZodObjectSchema("formSchema", fields, isTs));
        }
        else if(library==="React Hook Form + Yup" || library === "Formik + Yup"){
            generatedCode=(generateYupObjectSchema("formSchema", fields, isTs));
        }
    }
    else if(currentTab==="form"){
        if(library==="React Hook Form + Zod"){
            generatedCode=(generateRHFForm(fields, "formSchema", isTs));
        }
        else if(library==="React Hook Form + Yup"){
            generatedCode=(generateRHFYupForm(fields, "formSchema", isTs));
        }
        else if(library==="Formik + Zod"){
            generatedCode=(generateFormikZodForm(fields, "formSchema", isTs));
        }
        else if(library==="Formik + Yup"){
            generatedCode=(generateFormikYupForm(fields, "formSchema", isTs));
        }
    }
    else if(currentTab==="full-code"){
        if(library==="React Hook Form + Zod"){
            generatedCode=(generateRHFZodSingleFile(fields, "formSchema", isTs));
        }
        else if(library==="React Hook Form + Yup"){
            generatedCode=(generateRHFYupSingleFile(fields, "formSchema", isTs));
        }
        else if(library==="Formik + Zod"){
            generatedCode=(generateFormikZodSingleFile(fields, "formSchema", isTs));
        }
        else if(library==="Formik + Yup"){
            generatedCode=(generateFormikYupSingleFile(fields, "formSchema", isTs));
        }
    }
    else if(currentTab==="json"){
        generatedCode=JSON.stringify(fields, null, 2);
    }

    return generatedCode;
}