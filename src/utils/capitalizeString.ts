/**
 * Capitalizes the first letter of a string.
 * @param {string} str - The string to capitalize
 * @returns {string} The capitalized string
 */
export const capitalizeString = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
}