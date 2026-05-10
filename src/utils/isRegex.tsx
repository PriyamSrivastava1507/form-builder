/**
 * Validates whether a given string is a valid regular expression.
 * @param {string} regex - The regex string to validate
 * @returns {boolean} True if valid, false otherwise
 */
const isValidRegex = (regex: string) => {
    try{
        new RegExp(regex);
        return true;
    }catch{
        return false;
    }
}

export default isValidRegex;