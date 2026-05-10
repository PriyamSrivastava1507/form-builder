import { useDebounceCallback } from "@/hooks/useDebounceCallback";
import { useFormStore } from "@/store/form.store";
import type { TextareaValidation } from "@/types/fieldValidation";
import { useEffect, useRef, useState } from "react";

type TextAreaValidationProps = {
    fieldId: string;
    validations: TextareaValidation;
}

const TextAreaValidation = ({fieldId, validations}: TextAreaValidationProps) => {
    const updateField = useFormStore((state)=>state.updateField);

    const validationsRef = useRef(validations);
    useEffect(() => {
        validationsRef.current = validations;
    }, [validations]);

    const debouncedUpdate = useDebounceCallback(updateField, 500);
    
    const [localMinLength, setLocalMinLength] = useState<string>(validations.minLength?.value?.toString() || "");
    const [localMinErrorMessage, setLocalMinErrorMessage] = useState<string>(validations.minLength?.errorMessage || "");
    const [localMaxLength, setLocalMaxLength] = useState<string>(validations.maxLength?.value?.toString() || "");
    const [localMaxErrorMessage, setLocalMaxErrorMessage] = useState<string>(validations.maxLength?.errorMessage || "");
    
    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setLocalMinLength(validations.minLength?.value!==null ? validations.minLength.value.toString() : "");
    }, [validations.minLength?.value]);
    
    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setLocalMinErrorMessage(validations.minLength?.errorMessage);
    }, [validations.minLength?.errorMessage]);
    
    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setLocalMaxLength(validations.maxLength?.value!==null ? validations.maxLength.value.toString() : "");
    }, [validations.maxLength?.value]);
    
    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setLocalMaxErrorMessage(validations.maxLength?.errorMessage);
    }, [validations.maxLength?.errorMessage]);

    const handleMinLengthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLocalMinLength(e.target.value);
        debouncedUpdate(fieldId,{validations: {...validationsRef.current, minLength: { ...validationsRef.current.minLength, value: e.target.value=="" ? null : parseInt(e.target.value) }}});
    }

    const handleMinErrorMessageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLocalMinErrorMessage(e.target.value);
        debouncedUpdate(fieldId, {validations: {...validationsRef.current, minLength: { ...validationsRef.current.minLength, errorMessage: e.target.value }}});
    }

    const handleMaxLengthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLocalMaxLength(e.target.value);
        debouncedUpdate(fieldId, {validations: {...validationsRef.current, maxLength: { ...validationsRef.current.maxLength, value: e.target.value=="" ? null : parseInt(e.target.value) }}});
    }

    const handleMaxErrorMessageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLocalMaxErrorMessage(e.target.value);
        debouncedUpdate(fieldId, {validations: {...validationsRef.current, maxLength: { ...validationsRef.current.maxLength, errorMessage: e.target.value }}});
    }
    
    return (
        <div className="mb-2">
            <div className="mb-8 mt-8">
                <p className="text-sm font-semibold text-foreground-muted">Minimum Length :</p>
                <div className="py-2 pr-2">
                    <label htmlFor={fieldId+"-min-length"} className="block text-xs font-semibold text-foreground-muted mb-2">Value :</label>
                    <input 
                        type="number" 
                        id={fieldId+"-min-length"} 
                        placeholder="Enter minimum length" 
                        value={localMinLength}
                        onChange={handleMinLengthChange}
                        className="w-full p-1.5 rounded-sm border-b-[1.5px] bg-surface-overlay/60 outline-none text-foreground/80 text-xs border border-border/20 placeholder:text-foreground/60 hover:border-primary/50 focus:border-primary/50 transition-all duration-200" 
                    />
                </div>
                <div className="py-2 pr-2">
                    <label htmlFor={fieldId+"-min-error-message"} className="block text-xs font-semibold text-foreground-muted mb-2">Error Message :</label>
                    <input 
                        type="text" 
                        id={fieldId+"-min-error-message"} 
                        placeholder="Enter error message" 
                        value={localMinErrorMessage}
                        onChange={handleMinErrorMessageChange}
                        className="w-full p-1.5 rounded-sm border-b-[1.5px] bg-surface-overlay/60 outline-none text-foreground/80 text-xs border border-border/20 placeholder:text-foreground/60 hover:border-primary/50 focus:border-primary/50 transition-all duration-200" 
                    />
                </div>
            </div>
            <div className="mb-3">
                <p className="text-sm font-semibold text-foreground-muted">Maximum Length :</p>
                <div className="py-2 pr-2">
                    <label htmlFor={fieldId+"-max-length"} className="block text-xs font-semibold text-foreground-muted mb-2">Value :</label>
                    <input 
                        type="number" 
                        id={fieldId+"-max-length"} 
                        placeholder="Enter minimum length" 
                        value={localMaxLength}
                        onChange={handleMaxLengthChange}
                        className="w-full p-1.5 rounded-sm border-b-[1.5px] bg-surface-overlay/60 outline-none text-foreground/80 text-xs border border-border/20 placeholder:text-foreground/60 hover:border-primary/50 focus:border-primary/50 transition-all duration-200" 
                    />
                </div>
                <div className="py-2 pr-2">
                    <label htmlFor={fieldId+"-max-error-message"} className="block text-xs font-semibold text-foreground-muted mb-2">Error Message :</label>
                    <input 
                        type="text" 
                        id={fieldId+"-max-error-message"} 
                        placeholder="Enter error message" 
                        value={localMaxErrorMessage}
                        onChange={handleMaxErrorMessageChange}
                        className="w-full p-1.5 rounded-sm border-b-[1.5px] bg-surface-overlay/60 outline-none text-foreground/80 text-xs border border-border/20 placeholder:text-foreground/60 hover:border-primary/50 focus:border-primary/50 transition-all duration-200" 
                    />
                </div>
            </div>
        </div>
    )
}

export default TextAreaValidation