import type { LanguageOptions } from "@/types/output"

export const getFilename = (tab: "schema" | "form" | "json" | "full-code", language: LanguageOptions): string => {
    const langExt = language === "TypeScript" ? "ts" : "js";
    switch (tab) {
        case 'schema': return `schema.${langExt}`
        case 'form': return `form.${langExt}x`
        case 'json': return 'form-schema.json'
        case 'full-code': return `form-app.${langExt}x`
    }
}