import { useDebounceCallback } from "@/hooks/useDebounceCallback";
import { useFormStore } from "@/store/form.store";
import type { RangeValidation as RangeValidationType } from "@/types/fieldValidation";
import { useEffect, useRef, useState } from "react";

type RangeValidationProps = {
    fieldId: string;
    validations: RangeValidationType;
}

const RangeValidation = ({fieldId, validations}: RangeValidationProps) => {
    const updateField = useFormStore((state)=>state.updateField);

    const validationsRef = useRef(validations);
    useEffect(() => {
        validationsRef.current = validations;
    }, [validations]);

    const debouncedUpdate = useDebounceCallback(updateField, 500);

    const [localMin, setLocalMin] = useState<string>(validations.min?.value.toString());
    const [localMinErrorMessage, setLocalMinErrorMessage] = useState<string>(validations.min?.errorMessage);
    const [localMax, setLocalMax] = useState<string>(validations.max?.value.toString());
    const [localMaxErrorMessage, setLocalMaxErrorMessage] = useState<string>(validations.max?.errorMessage);
    const [localStep, setLocalStep] = useState<string>(validations.step?.value.toString());
    const [localStepErrorMessage, setLocalStepErrorMessage] = useState<string>(validations.step?.errorMessage);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setLocalMin(validations.min?.value.toString());
    }, [validations.min?.value]);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setLocalMinErrorMessage(validations.min?.errorMessage);
    }, [validations.min?.errorMessage]);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setLocalMax(validations.max?.value.toString());
    }, [validations.max?.value]);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setLocalMaxErrorMessage(validations.max?.errorMessage);
    }, [validations.max?.errorMessage]);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setLocalStep(validations.step?.value.toString());
    }, [validations.step?.value]);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setLocalStepErrorMessage(validations.step?.errorMessage);
    }, [validations.step?.errorMessage]);

    const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLocalMin(e.target.value);
        debouncedUpdate(fieldId, {validations: {...validationsRef.current, min: { ...validationsRef.current.min, value: e.target.value === "" ? 0 : parseFloat(e.target.value) }}});
    }

    const handleMinErrorMessageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLocalMinErrorMessage(e.target.value);
        debouncedUpdate(fieldId, {validations: {...validationsRef.current, min: { ...validationsRef.current.min, errorMessage: e.target.value }}});
    }

    const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLocalMax(e.target.value);
        debouncedUpdate(fieldId, {validations: {...validationsRef.current, max: { ...validationsRef.current.max, value: e.target.value === "" ? 100 : parseFloat(e.target.value) }}});
    }

    const handleMaxErrorMessageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLocalMaxErrorMessage(e.target.value);
        debouncedUpdate(fieldId, {validations: {...validationsRef.current, max: { ...validationsRef.current.max, errorMessage: e.target.value }}});
    }

    const handleStepChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLocalStep(e.target.value);
        debouncedUpdate(fieldId, {validations: {...validationsRef.current, step: { ...validationsRef.current.step, value: e.target.value === "" ? 1 : parseFloat(e.target.value) }}});
    }

    const handleStepErrorMessageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLocalStepErrorMessage(e.target.value);
        debouncedUpdate(fieldId, {validations: {...validationsRef.current, step: { ...validationsRef.current.step, errorMessage: e.target.value }}});
    }

    const inputClass = "w-full p-1.5 rounded-sm border-b-[1.5px] bg-surface-overlay/60 outline-none text-foreground/80 text-xs border border-border/20 placeholder:text-foreground/60 hover:border-primary/50 focus:border-primary/50 transition-all duration-200";

    return (
        <div className="mb-2">
            <div className="mb-8 mt-8">
                <p className="text-sm font-semibold text-foreground-muted">Minimum Value :</p>
                <div className="py-2 pr-2">
                    <label htmlFor={fieldId+"-range-min"} className="block text-xs font-semibold text-foreground-muted mb-2">Value :</label>
                    <input type="number" id={fieldId+"-range-min"} placeholder="Enter minimum value" value={localMin} onChange={handleMinChange} className={inputClass} />
                </div>
                <div className="py-2 pr-2">
                    <label htmlFor={fieldId+"-range-min-error-message"} className="block text-xs font-semibold text-foreground-muted mb-2">Error Message :</label>
                    <input type="text" id={fieldId+"-range-min-error-message"} placeholder="Enter error message" value={localMinErrorMessage} onChange={handleMinErrorMessageChange} className={inputClass} />
                </div>
            </div>
            <div className="mb-8">
                <p className="text-sm font-semibold text-foreground-muted">Maximum Value :</p>
                <div className="py-2 pr-2">
                    <label htmlFor={fieldId+"-range-max"} className="block text-xs font-semibold text-foreground-muted mb-2">Value :</label>
                    <input type="number" id={fieldId+"-range-max"} placeholder="Enter maximum value" value={localMax} onChange={handleMaxChange} className={inputClass} />
                </div>
                <div className="py-2 pr-2">
                    <label htmlFor={fieldId+"-range-max-error-message"} className="block text-xs font-semibold text-foreground-muted mb-2">Error Message :</label>
                    <input type="text" id={fieldId+"-range-max-error-message"} placeholder="Enter error message" value={localMaxErrorMessage} onChange={handleMaxErrorMessageChange} className={inputClass} />
                </div>
            </div>
            <div className="mb-3">
                <p className="text-sm font-semibold text-foreground-muted">Step :</p>
                <div className="py-2 pr-2">
                    <label htmlFor={fieldId+"-range-step"} className="block text-xs font-semibold text-foreground-muted mb-2">Value :</label>
                    <input type="number" id={fieldId+"-range-step"} placeholder="Enter step value" value={localStep} onChange={handleStepChange} className={inputClass} />
                </div>
                <div className="py-2 pr-2">
                    <label htmlFor={fieldId+"-range-step-error-message"} className="block text-xs font-semibold text-foreground-muted mb-2">Error Message :</label>
                    <input type="text" id={fieldId+"-range-step-error-message"} placeholder="Enter error message" value={localStepErrorMessage} onChange={handleStepErrorMessageChange} className={inputClass} />
                </div>
            </div>
        </div>
    )
}

export default RangeValidation