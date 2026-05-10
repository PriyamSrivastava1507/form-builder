/**
 * Type guard to check if a value is an object
 * @param {unknown} value - The value to check
 * @returns {boolean} True if the value is a non-null object
 */
function isObject(value: unknown): value is Record<string, unknown> {
    return typeof value === "object" && value !== null;
}

/**
 * Recursively extracts all 'label' properties from an object and its nested children
 * @param {unknown} obj - The object to traverse
 * @returns {string[]} An array of label strings found in the object
 */
export function getAllLabels(obj: unknown): string[] {
    const labels: string[] = [];

    if (!isObject(obj)) return labels;

    for (const key in obj) {
        const value = obj[key];

        if (isObject(value)) {
            if ("label" in value && typeof value.label === "string") {
                labels.push(value.label);
            }

            labels.push(...getAllLabels(value));
        }
    }

    return labels;
}
