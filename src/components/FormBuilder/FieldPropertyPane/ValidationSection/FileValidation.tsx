import { useDebounceCallback } from "@/hooks/useDebounceCallback";
import { useFormStore } from "@/store/form.store";
import type { FileValidation as FileValidationType } from "@/types/fieldValidation";
import { useEffect, useRef, useState } from "react";

type FileValidationProps = {
    fieldId: string;
    validations: FileValidationType;
}

const FileValidation = ({fieldId, validations}: FileValidationProps) => {
    const updateField = useFormStore((state)=>state.updateField);

    const validationsRef = useRef(validations);
    useEffect(() => {
        validationsRef.current = validations;
    }, [validations]);

    const debouncedUpdate = useDebounceCallback(updateField, 500);

    const [localMinSize, setLocalMinSize] = useState<string>(validations.minSize?.value !== null ? validations.minSize.value.toString() : "");
    const [localMinSizeErrorMessage, setLocalMinSizeErrorMessage] = useState<string>(validations.minSize?.errorMessage);
    const [localMaxSize, setLocalMaxSize] = useState<string>(validations.maxSize?.value !== null ? validations.maxSize.value.toString() : "");
    const [localMaxSizeErrorMessage, setLocalMaxSizeErrorMessage] = useState<string>(validations.maxSize?.errorMessage);
    const [localMimeTypes, setLocalMimeTypes] = useState<string>(validations.acceptMimeTypes?.value.join(", "));
    const [localMimeTypesErrorMessage, setLocalMimeTypesErrorMessage] = useState<string>(validations.acceptMimeTypes?.errorMessage);
    const [localExtensions, setLocalExtensions] = useState<string>(validations.acceptExtensions?.value.join(", "));
    const [localExtensionsErrorMessage, setLocalExtensionsErrorMessage] = useState<string>(validations.acceptExtensions?.errorMessage);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setLocalMinSize(validations.minSize?.value !== null ? validations.minSize.value.toString() : "");
    }, [validations.minSize?.value]);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setLocalMinSizeErrorMessage(validations.minSize?.errorMessage);
    }, [validations.minSize?.errorMessage]);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setLocalMaxSize(validations.maxSize?.value !== null ? validations.maxSize.value.toString() : "");
    }, [validations.maxSize?.value]);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setLocalMaxSizeErrorMessage(validations.maxSize?.errorMessage);
    }, [validations.maxSize?.errorMessage]);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setLocalMimeTypes(validations.acceptMimeTypes?.value.join(", "));
    }, [validations.acceptMimeTypes?.value]);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setLocalMimeTypesErrorMessage(validations.acceptMimeTypes?.errorMessage);
    }, [validations.acceptMimeTypes?.errorMessage]);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setLocalExtensions(validations.acceptExtensions?.value.join(", "));
    }, [validations.acceptExtensions?.value]);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setLocalExtensionsErrorMessage(validations.acceptExtensions?.errorMessage);
    }, [validations.acceptExtensions?.errorMessage]);

    const parseCommaSeparated = (input: string): string[] => {
        return input.split(",").map((s) => s.trim()).filter((s) => s !== "");
    };

    const handleMinSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLocalMinSize(e.target.value);
        debouncedUpdate(fieldId, {validations: {...validationsRef.current, minSize: { ...validationsRef.current.minSize, value: e.target.value === "" ? null : parseInt(e.target.value) }}});
    }

    const handleMinSizeErrorMessageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLocalMinSizeErrorMessage(e.target.value);
        debouncedUpdate(fieldId, {validations: {...validationsRef.current, minSize: { ...validationsRef.current.minSize, errorMessage: e.target.value }}});
    }

    const handleMaxSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLocalMaxSize(e.target.value);
        debouncedUpdate(fieldId, {validations: {...validationsRef.current, maxSize: { ...validationsRef.current.maxSize, value: e.target.value === "" ? null : parseInt(e.target.value) }}});
    }

    const handleMaxSizeErrorMessageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLocalMaxSizeErrorMessage(e.target.value);
        debouncedUpdate(fieldId, {validations: {...validationsRef.current, maxSize: { ...validationsRef.current.maxSize, errorMessage: e.target.value }}});
    }

    const handleMimeTypesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLocalMimeTypes(e.target.value);
        debouncedUpdate(fieldId, {validations: {...validationsRef.current, acceptMimeTypes: { ...validationsRef.current.acceptMimeTypes, value: parseCommaSeparated(e.target.value) }}});
    }

    const handleMimeTypesErrorMessageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLocalMimeTypesErrorMessage(e.target.value);
        debouncedUpdate(fieldId, {validations: {...validationsRef.current, acceptMimeTypes: { ...validationsRef.current.acceptMimeTypes, errorMessage: e.target.value }}});
    }

    const handleExtensionsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLocalExtensions(e.target.value);
        debouncedUpdate(fieldId, {validations: {...validationsRef.current, acceptExtensions: { ...validationsRef.current.acceptExtensions, value: parseCommaSeparated(e.target.value) }}});
    }

    const handleExtensionsErrorMessageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLocalExtensionsErrorMessage(e.target.value);
        debouncedUpdate(fieldId, {validations: {...validationsRef.current, acceptExtensions: { ...validationsRef.current.acceptExtensions, errorMessage: e.target.value }}});
    }

    const inputClass = "w-full p-1.5 rounded-sm border-b-[1.5px] bg-surface-overlay/60 outline-none text-foreground/80 text-xs border border-border/20 placeholder:text-foreground/60 hover:border-primary/50 focus:border-primary/50 transition-all duration-200";

    return (
        <div className="mb-2">
            <div className="mb-8 mt-8">
                <p className="text-sm font-semibold text-foreground-muted">Minimum Size (bytes) :</p>
                <div className="py-2 pr-2">
                    <label htmlFor={fieldId+"-min-size"} className="block text-xs font-semibold text-foreground-muted mb-2">Value :</label>
                    <input type="number" id={fieldId+"-min-size"} placeholder="Enter minimum size in bytes" value={localMinSize} onChange={handleMinSizeChange} className={inputClass} />
                </div>
                <div className="py-2 pr-2">
                    <label htmlFor={fieldId+"-min-size-error-message"} className="block text-xs font-semibold text-foreground-muted mb-2">Error Message :</label>
                    <input type="text" id={fieldId+"-min-size-error-message"} placeholder="Enter error message" value={localMinSizeErrorMessage} onChange={handleMinSizeErrorMessageChange} className={inputClass} />
                </div>
            </div>
            <div className="mb-8">
                <p className="text-sm font-semibold text-foreground-muted">Maximum Size (bytes) :</p>
                <div className="py-2 pr-2">
                    <label htmlFor={fieldId+"-max-size"} className="block text-xs font-semibold text-foreground-muted mb-2">Value :</label>
                    <input type="number" id={fieldId+"-max-size"} placeholder="Enter maximum size in bytes" value={localMaxSize} onChange={handleMaxSizeChange} className={inputClass} />
                </div>
                <div className="py-2 pr-2">
                    <label htmlFor={fieldId+"-max-size-error-message"} className="block text-xs font-semibold text-foreground-muted mb-2">Error Message :</label>
                    <input type="text" id={fieldId+"-max-size-error-message"} placeholder="Enter error message" value={localMaxSizeErrorMessage} onChange={handleMaxSizeErrorMessageChange} className={inputClass} />
                </div>
            </div>
            <div className="mb-8">
                <p className="text-sm font-semibold text-foreground-muted">Accepted MIME Types :</p>
                <div className="py-2 pr-2">
                    <label htmlFor={fieldId+"-mime-types"} className="block text-xs font-semibold text-foreground-muted mb-2">Value :</label>
                    <input type="text" id={fieldId+"-mime-types"} placeholder="e.g. image/png, application/pdf" value={localMimeTypes} onChange={handleMimeTypesChange} className={inputClass} />
                </div>
                <div className="py-2 pr-2">
                    <label htmlFor={fieldId+"-mime-types-error-message"} className="block text-xs font-semibold text-foreground-muted mb-2">Error Message :</label>
                    <input type="text" id={fieldId+"-mime-types-error-message"} placeholder="Enter error message" value={localMimeTypesErrorMessage} onChange={handleMimeTypesErrorMessageChange} className={inputClass} />
                </div>
            </div>
            <div className="mb-3">
                <p className="text-sm font-semibold text-foreground-muted">Accepted Extensions :</p>
                <div className="py-2 pr-2">
                    <label htmlFor={fieldId+"-extensions"} className="block text-xs font-semibold text-foreground-muted mb-2">Value :</label>
                    <input type="text" id={fieldId+"-extensions"} placeholder="e.g. .png, .pdf, .docx" value={localExtensions} onChange={handleExtensionsChange} className={inputClass} />
                </div>
                <div className="py-2 pr-2">
                    <label htmlFor={fieldId+"-extensions-error-message"} className="block text-xs font-semibold text-foreground-muted mb-2">Error Message :</label>
                    <input type="text" id={fieldId+"-extensions-error-message"} placeholder="Enter error message" value={localExtensionsErrorMessage} onChange={handleExtensionsErrorMessageChange} className={inputClass} />
                </div>
            </div>
        </div>
    )
}

export default FileValidation