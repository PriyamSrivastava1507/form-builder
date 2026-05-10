import { useDebounceCallback } from "@/hooks/useDebounceCallback";
import { useFormStore } from "@/store/form.store";
import type { DateValidation as DateValidationType } from "@/types/fieldValidation";
import { DatePicker } from "@/components/ui/date-picker";
import { useEffect, useRef, useState } from "react";

type DateValidationProps = {
    fieldId: string;
    validations: DateValidationType;
}

const DateValidation = ({fieldId, validations}: DateValidationProps) => {
    const updateField = useFormStore((state)=>state.updateField);

    const validationsRef = useRef(validations);
    useEffect(() => {
        validationsRef.current = validations;
    }, [validations]);

    const debouncedUpdate = useDebounceCallback(updateField, 500);

    const [localMinDate, setLocalMinDate] = useState<string>(validations.minDate?.value);
    const [localMinErrorMessage, setLocalMinErrorMessage] = useState<string>(validations.minDate?.errorMessage);
    const [localMaxDate, setLocalMaxDate] = useState<string>(validations.maxDate?.value);
    const [localMaxErrorMessage, setLocalMaxErrorMessage] = useState<string>(validations.maxDate?.errorMessage);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setLocalMinDate(validations.minDate?.value);
    }, [validations.minDate?.value]);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setLocalMinErrorMessage(validations.minDate?.errorMessage);
    }, [validations.minDate?.errorMessage]);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setLocalMaxDate(validations.maxDate?.value);
    }, [validations.maxDate?.value]);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setLocalMaxErrorMessage(validations.maxDate?.errorMessage);
    }, [validations.maxDate?.errorMessage]);

    const handleMinDateChange = (value: string) => {
        setLocalMinDate(value);
        debouncedUpdate(fieldId, {validations: {...validationsRef.current, minDate: { ...validationsRef.current.minDate, value }}});
    }

    const handleMinErrorMessageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLocalMinErrorMessage(e.target.value);
        debouncedUpdate(fieldId, {validations: {...validationsRef.current, minDate: { ...validationsRef.current.minDate, errorMessage: e.target.value }}});
    }

    const handleMaxDateChange = (value: string) => {
        setLocalMaxDate(value);
        debouncedUpdate(fieldId, {validations: {...validationsRef.current, maxDate: { ...validationsRef.current.maxDate, value }}});
    }

    const handleMaxErrorMessageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLocalMaxErrorMessage(e.target.value);
        debouncedUpdate(fieldId, {validations: {...validationsRef.current, maxDate: { ...validationsRef.current.maxDate, errorMessage: e.target.value }}});
    }

    const inputClass = "w-full p-1.5 rounded-sm border-b-[1.5px] bg-surface-overlay/60 outline-none text-foreground/80 text-xs border border-border/20 placeholder:text-foreground/60 hover:border-primary/50 focus:border-primary/50 transition-all duration-200";

    return (
        <div className="mb-2">
            <div className="mb-8 mt-8">
                <p className="text-sm font-semibold text-foreground-muted">Minimum Date :</p>
                <div className="py-2 pr-2">
                    <label htmlFor={fieldId+"-min-date"} className="block text-xs font-semibold text-foreground-muted mb-2">Value :</label>
                    <DatePicker
                        id={fieldId+"-min-date"}
                        value={localMinDate}
                        onChange={handleMinDateChange}
                        placeholder="Select minimum date"
                    />
                </div>
                <div className="py-2 pr-2">
                    <label htmlFor={fieldId+"-min-date-error-message"} className="block text-xs font-semibold text-foreground-muted mb-2">Error Message :</label>
                    <input type="text" id={fieldId+"-min-date-error-message"} placeholder="Enter error message" value={localMinErrorMessage} onChange={handleMinErrorMessageChange} className={inputClass} />
                </div>
            </div>
            <div className="mb-3">
                <p className="text-sm font-semibold text-foreground-muted">Maximum Date :</p>
                <div className="py-2 pr-2">
                    <label htmlFor={fieldId+"-max-date"} className="block text-xs font-semibold text-foreground-muted mb-2">Value :</label>
                    <DatePicker
                        id={fieldId+"-max-date"}
                        value={localMaxDate}
                        onChange={handleMaxDateChange}
                        placeholder="Select maximum date"
                    />
                </div>
                <div className="py-2 pr-2">
                    <label htmlFor={fieldId+"-max-date-error-message"} className="block text-xs font-semibold text-foreground-muted mb-2">Error Message :</label>
                    <input type="text" id={fieldId+"-max-date-error-message"} placeholder="Enter error message" value={localMaxErrorMessage} onChange={handleMaxErrorMessageChange} className={inputClass} />
                </div>
            </div>
        </div>
    )
}

export default DateValidation