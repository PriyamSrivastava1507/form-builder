import { useDebounceCallback } from "@/hooks/useDebounceCallback";
import { useFormStore } from "@/store/form.store";
import type { CheckboxGroupValidation as CheckboxGroupValidationType } from "@/types/fieldValidation";
import { useEffect, useRef, useState } from "react";

type CheckboxGroupValidationProps = {
    fieldId: string;
    validations: CheckboxGroupValidationType;
}

const CheckboxGroupValidation = ({fieldId, validations}: CheckboxGroupValidationProps) => {
    const updateField = useFormStore((state)=>state.updateField);

    const validationsRef = useRef(validations);
    useEffect(() => {
        validationsRef.current = validations;
    }, [validations]);

    const debouncedUpdate = useDebounceCallback(updateField, 500);

    const [localMinSelected, setLocalMinSelected] = useState<string>(
        validations.minSelected?.value !== null ? validations.minSelected.value.toString() : ""
    );
    const [localMinErrorMessage, setLocalMinErrorMessage] = useState<string>(validations.minSelected?.errorMessage);
    const [localMaxSelected, setLocalMaxSelected] = useState<string>(
        validations.maxSelected?.value !== null ? validations.maxSelected.value.toString() : ""
    );
    const [localMaxErrorMessage, setLocalMaxErrorMessage] = useState<string>(validations.maxSelected?.errorMessage);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setLocalMinSelected(validations.minSelected?.value !== null ? validations.minSelected.value.toString() : "");
    }, [validations.minSelected?.value]);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setLocalMinErrorMessage(validations.minSelected?.errorMessage);
    }, [validations.minSelected?.errorMessage]);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setLocalMaxSelected(validations.maxSelected?.value !== null ? validations.maxSelected.value.toString() : "");
    }, [validations.maxSelected?.value]);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setLocalMaxErrorMessage(validations.maxSelected?.errorMessage);
    }, [validations.maxSelected?.errorMessage]);

    const handleMinSelectedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLocalMinSelected(e.target.value);
        debouncedUpdate(fieldId, {validations: {...validationsRef.current, minSelected: { ...validationsRef.current.minSelected, value: e.target.value === "" ? null : parseInt(e.target.value) }}});
    }

    const handleMinErrorMessageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLocalMinErrorMessage(e.target.value);
        debouncedUpdate(fieldId, {validations: {...validationsRef.current, minSelected: { ...validationsRef.current.minSelected, errorMessage: e.target.value }}});
    }

    const handleMaxSelectedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLocalMaxSelected(e.target.value);
        debouncedUpdate(fieldId, {validations: {...validationsRef.current, maxSelected: { ...validationsRef.current.maxSelected, value: e.target.value === "" ? null : parseInt(e.target.value) }}});
    }

    const handleMaxErrorMessageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLocalMaxErrorMessage(e.target.value);
        debouncedUpdate(fieldId, {validations: {...validationsRef.current, maxSelected: { ...validationsRef.current.maxSelected, errorMessage: e.target.value }}});
    }

    return (
        <div className="mb-2">
            <div className="mb-8 mt-8">
                <p className="text-sm font-semibold text-foreground-muted">Minimum Selected :</p>
                <div className="py-2 pr-2">
                    <label htmlFor={fieldId+"-min-selected"} className="block text-xs font-semibold text-foreground-muted mb-2">Value :</label>
                    <input 
                        type="number" 
                        id={fieldId+"-min-selected"} 
                        placeholder="Enter minimum selections" 
                        value={localMinSelected}
                        onChange={handleMinSelectedChange}
                        className="w-full p-1.5 rounded-sm border-b-[1.5px] bg-surface-overlay/60 outline-none text-foreground/80 text-xs border border-border/20 placeholder:text-foreground/60 hover:border-primary/50 focus:border-primary/50 transition-all duration-200" 
                    />
                </div>
                <div className="py-2 pr-2">
                    <label htmlFor={fieldId+"-min-selected-error-message"} className="block text-xs font-semibold text-foreground-muted mb-2">Error Message :</label>
                    <input 
                        type="text" 
                        id={fieldId+"-min-selected-error-message"} 
                        placeholder="Enter error message" 
                        value={localMinErrorMessage}
                        onChange={handleMinErrorMessageChange}
                        className="w-full p-1.5 rounded-sm border-b-[1.5px] bg-surface-overlay/60 outline-none text-foreground/80 text-xs border border-border/20 placeholder:text-foreground/60 hover:border-primary/50 focus:border-primary/50 transition-all duration-200" 
                    />
                </div>
            </div>
            <div className="mb-3">
                <p className="text-sm font-semibold text-foreground-muted">Maximum Selected :</p>
                <div className="py-2 pr-2">
                    <label htmlFor={fieldId+"-max-selected"} className="block text-xs font-semibold text-foreground-muted mb-2">Value :</label>
                    <input 
                        type="number" 
                        id={fieldId+"-max-selected"} 
                        placeholder="Enter maximum selections" 
                        value={localMaxSelected}
                        onChange={handleMaxSelectedChange}
                        className="w-full p-1.5 rounded-sm border-b-[1.5px] bg-surface-overlay/60 outline-none text-foreground/80 text-xs border border-border/20 placeholder:text-foreground/60 hover:border-primary/50 focus:border-primary/50 transition-all duration-200" 
                    />
                </div>
                <div className="py-2 pr-2">
                    <label htmlFor={fieldId+"-max-selected-error-message"} className="block text-xs font-semibold text-foreground-muted mb-2">Error Message :</label>
                    <input 
                        type="text" 
                        id={fieldId+"-max-selected-error-message"} 
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

export default CheckboxGroupValidation;