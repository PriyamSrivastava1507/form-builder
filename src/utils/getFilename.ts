import type { LanguageOptions } from "@/types/output"

/**
 * Generates the appropriate filename based on the current tab and language.
 * @param {"schema" | "form" | "json" | "full-code"} tab - The active output tab
 * @param {LanguageOptions} language - The selected programming language
 * @returns {string} The formatted filename with extension
 */
export const getFilename = (tab: "schema" | "form" | "json" | "full-code", language: LanguageOptions): string => {
    const langExt = language === "TypeScript" ? "ts" : "js";
    switch (tab) {
        case 'schema': return `schema.${langExt}`
        case 'form': return `form.${langExt}x`
        case 'json': return 'form-schema.json'
        case 'full-code': return `form-app.${langExt}x`
    }
}