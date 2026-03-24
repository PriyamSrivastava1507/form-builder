function isObject(value: unknown): value is Record<string, unknown> {
    return typeof value === "object" && value !== null;
}

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
