import { useDebounceCallback } from "@/hooks/useDebounceCallback";
import { useFormStore } from "@/store/form.store";
import type { NumberValidation as NumberValidationType } from "@/types/fieldValidation";
import { Switch } from "@/components/ui/switch";
import { useEffect, useRef, useState } from "react";

type NumberValidationProps = {
    fieldId: string;
    validations: NumberValidationType;
}

const NumberValidation = ({fieldId, validations}: NumberValidationProps) => {
    const updateField = useFormStore((state)=>state.updateField);

    const validationsRef = useRef(validations);
    useEffect(() => {
        validationsRef.current = validations;
    }, [validations]);

    const debouncedUpdate = useDebounceCallback(updateField, 500);

    const [localMin, setLocalMin] = useState<string>(validations.min?.value !== null ? validations.min.value.toString() : "");
    const [localMinErrorMessage, setLocalMinErrorMessage] = useState<string>(validations.min?.errorMessage);
    const [localMax, setLocalMax] = useState<string>(validations.max?.value !== null ? validations.max.value.toString() : "");
    const [localMaxErrorMessage, setLocalMaxErrorMessage] = useState<string>(validations.max?.errorMessage);
    const [localInteger, setLocalInteger] = useState<boolean>(validations.integer?.value);
    const [localIntegerErrorMessage, setLocalIntegerErrorMessage] = useState<string>(validations.integer?.errorMessage);
    const [localPositive, setLocalPositive] = useState<boolean>(validations.positive?.value);
    const [localPositiveErrorMessage, setLocalPositiveErrorMessage] = useState<string>(validations.positive?.errorMessage);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setLocalMin(validations.min?.value !== null ? validations.min.value.toString() : "");
    }, [validations.min?.value]);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setLocalMinErrorMessage(validations.min?.errorMessage);
    }, [validations.min?.errorMessage]);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setLocalMax(validations.max?.value !== null ? validations.max.value.toString() : "");
    }, [validations.max?.value]);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setLocalMaxErrorMessage(validations.max?.errorMessage);
    }, [validations.max?.errorMessage]);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setLocalInteger(validations.integer?.value);
    }, [validations.integer?.value]);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setLocalIntegerErrorMessage(validations.integer?.errorMessage);
    }, [validations.integer?.errorMessage]);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setLocalPositive(validations.positive?.value);
    }, [validations.positive?.value]);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setLocalPositiveErrorMessage(validations.positive?.errorMessage);
    }, [validations.positive?.errorMessage]);

    const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLocalMin(e.target.value);
        const parsed = e.target.value === "" ? null : parseFloat(e.target.value);
        debouncedUpdate(fieldId, {validations: {...validationsRef.current, min: { ...validationsRef.current.min, value: parsed }}});
    }

    const handleMinErrorMessageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLocalMinErrorMessage(e.target.value);
        debouncedUpdate(fieldId, {validations: {...validationsRef.current, min: { ...validationsRef.current.min, errorMessage: e.target.value }}});
    }

    const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLocalMax(e.target.value);
        const parsed = e.target.value === "" ? null : parseFloat(e.target.value);
        debouncedUpdate(fieldId, {validations: {...validationsRef.current, max: { ...validationsRef.current.max, value: parsed }}});
    }

    const handleMaxErrorMessageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLocalMaxErrorMessage(e.target.value);
        debouncedUpdate(fieldId, {validations: {...validationsRef.current, max: { ...validationsRef.current.max, errorMessage: e.target.value }}});
    }

    const handleIntegerChange = (checked: boolean) => {
        setLocalInteger(checked);
        updateField(fieldId, {validations: {...validationsRef.current, integer: { ...validationsRef.current.integer, value: checked }}});
    }

    const handleIntegerErrorMessageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLocalIntegerErrorMessage(e.target.value);
        debouncedUpdate(fieldId, {validations: {...validationsRef.current, integer: { ...validationsRef.current.integer, errorMessage: e.target.value }}});
    }

    const handlePositiveChange = (checked: boolean) => {
        setLocalPositive(checked);
        updateField(fieldId, {validations: {...validationsRef.current, positive: { ...validationsRef.current.positive, value: checked }}});
    }

    const handlePositiveErrorMessageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLocalPositiveErrorMessage(e.target.value);
        debouncedUpdate(fieldId, {validations: {...validationsRef.current, positive: { ...validationsRef.current.positive, errorMessage: e.target.value }}});
    }

    const inputClass = "w-full p-1.5 rounded-sm border-b-[1.5px] bg-surface-overlay/60 outline-none text-foreground/80 text-xs border border-border/20 placeholder:text-foreground/60 hover:border-primary/50 focus:border-primary/50 transition-all duration-200";

    return (
        <div className="mb-2">
            <div className="mb-8 mt-8">
                <p className="text-sm font-semibold text-foreground-muted">Minimum Value :</p>
                <div className="py-2 pr-2">
                    <label htmlFor={fieldId+"-min"} className="block text-xs font-semibold text-foreground-muted mb-2">Value :</label>
                    <input type="number" id={fieldId+"-min"} placeholder="Enter minimum value" value={localMin} onChange={handleMinChange} className={inputClass} />
                </div>
                <div className="py-2 pr-2">
                    <label htmlFor={fieldId+"-min-error-message"} className="block text-xs font-semibold text-foreground-muted mb-2">Error Message :</label>
                    <input type="text" id={fieldId+"-min-error-message"} placeholder="Enter error message" value={localMinErrorMessage} onChange={handleMinErrorMessageChange} className={inputClass} />
                </div>
            </div>
            <div className="mb-8">
                <p className="text-sm font-semibold text-foreground-muted">Maximum Value :</p>
                <div className="py-2 pr-2">
                    <label htmlFor={fieldId+"-max"} className="block text-xs font-semibold text-foreground-muted mb-2">Value :</label>
                    <input type="number" id={fieldId+"-max"} placeholder="Enter maximum value" value={localMax} onChange={handleMaxChange} className={inputClass} />
                </div>
                <div className="py-2 pr-2">
                    <label htmlFor={fieldId+"-max-error-message"} className="block text-xs font-semibold text-foreground-muted mb-2">Error Message :</label>
                    <input type="text" id={fieldId+"-max-error-message"} placeholder="Enter error message" value={localMaxErrorMessage} onChange={handleMaxErrorMessageChange} className={inputClass} />
                </div>
            </div>
            <div className="mb-8">
                <p className="text-sm font-semibold text-foreground-muted">Integer Only :</p>
                <div className="py-2 pr-2 flex items-center gap-2">
                    <label htmlFor={fieldId+"-integer"} className="text-xs font-semibold text-foreground-muted">Allow only integers : </label>
                    <Switch 
                        size="sm" 
                        className="mr-1.5"
                        id={fieldId+"-integer"} 
                        checked={localInteger} 
                        onCheckedChange={handleIntegerChange} 
                    />
                </div>
                <div className="py-2 pr-2">
                    <label htmlFor={fieldId+"-integer-error-message"} className="block text-xs font-semibold text-foreground-muted mb-2">Error Message :</label>
                    <input type="text" id={fieldId+"-integer-error-message"} placeholder="Enter error message" value={localIntegerErrorMessage} onChange={handleIntegerErrorMessageChange} className={inputClass} />
                </div>
            </div>
            <div className="mb-3">
                <p className="text-sm font-semibold text-foreground-muted">Positive Only :</p>
                <div className="py-2 pr-2 flex items-center gap-2">
                    <label htmlFor={fieldId+"-positive"} className="text-xs font-semibold text-foreground-muted">Allow only positive numbers :</label>
                    <Switch 
                        size="sm" 
                        className="mr-1.5"
                        id={fieldId+"-positive"} 
                        checked={localPositive} 
                        onCheckedChange={handlePositiveChange} 
                    />
                </div>
                <div className="py-2 pr-2">
                    <label htmlFor={fieldId+"-positive-error-message"} className="block text-xs font-semibold text-foreground-muted mb-2">Error Message :</label>
                    <input type="text" id={fieldId+"-positive-error-message"} placeholder="Enter error message" value={localPositiveErrorMessage} onChange={handlePositiveErrorMessageChange} className={inputClass} />
                </div>
            </div>
        </div>
    )
}

export default NumberValidation