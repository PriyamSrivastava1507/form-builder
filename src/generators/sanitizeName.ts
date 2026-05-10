/**
 * Sanitizes a field name into a valid camelCase JavaScript identifier.
 * If the name is empty, generates a short UUID-based fallback.
 */
export function sanitizeName(name: string): string {
  const trimmed = name.trim();

  if (!trimmed) {
    return `field${crypto.randomUUID().slice(0, 8)}`;
  }

  return trimmed
    .replace(/[\s_-]+(.)/g, (_, c: string) => c.toUpperCase())
    .replace(/[^a-zA-Z0-9]/g, "")
    .replace(/^[0-9]/, "_$&")
    .replace(/^./, (c) => c.toLowerCase());
}
