import { create } from "zustand";
import type { StateCreator } from "zustand";
import type { LibraryOptions, LanguageOptions } from "@/types/output";

/**
 * Represents the state and actions for the output format selection store.
 * Manages user preferences for generated code language and library stack.
 */
export type OutputFormatStore = {
    language: LanguageOptions;               // Selected programming language
    languageOptions: LanguageOptions[];      // Available language options
    library: LibraryOptions;                 // Selected validation/form library stack
    libraryOptions: LibraryOptions[];        // Available library stack options
    
    /**
     * Sets the preferred programming language for code generation.
     * @param {LanguageOptions} language - The selected language
     */
    setLanguage: (language: LanguageOptions) => void;

    /**
     * Sets the preferred library stack for code generation.
     * @param {LibraryOptions} library - The selected library stack
     */
    setLibrary: (library: LibraryOptions) => void;
}

/**
 * Zustand state creator for the output format store.
 */
const createOutputFormatStore: StateCreator<OutputFormatStore> = (set) => ({
    language: "TypeScript",
    languageOptions: ["TypeScript", "JavaScript"],
    library: "React Hook Form + Zod",
    libraryOptions: ["React Hook Form + Zod", "React Hook Form + Yup", "Formik + Yup", "Formik + Zod"],
    setLanguage: (language) => set({ language }),
    setLibrary: (library) => set({ library }),
})

/**
 * Store hook for managing output format configuration.
 */
export const useOutputFormatStore = create<OutputFormatStore>()(createOutputFormatStore);
