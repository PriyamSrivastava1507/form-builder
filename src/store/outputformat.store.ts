import { create } from "zustand";
import type { StateCreator } from "zustand";
import type { LibraryOptions, LanguageOptions } from "@/types/output";

export type OutputFormatStore = {
    language: LanguageOptions;
    languageOptions: LanguageOptions[];
    library: LibraryOptions;
    libraryOptions: LibraryOptions[];
    setLanguage: (language: LanguageOptions) => void;
    setLibrary: (library: LibraryOptions) => void;
}

const createOutputFormatStore: StateCreator<OutputFormatStore> = (set) => ({
    language: "TypeScript",
    languageOptions: ["TypeScript", "JavaScript"],
    library: "React Hook Form + Zod",
    libraryOptions: ["React Hook Form + Zod", "React Hook Form + Yup", "Formik + Yup", "Formik + Zod"],
    setLanguage: (language) => set({ language }),
    setLibrary: (library) => set({ library }),
})

export const useOutputFormatStore = create<OutputFormatStore>()(createOutputFormatStore);
