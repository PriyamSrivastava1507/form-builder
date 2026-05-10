/**
 * Moves an item in an array from one index to another.
 * @param {T[]} array - The original array
 * @param {number} fromIndex - The current index of the item
 * @param {number} toIndex - The target index for the item
 * @returns {T[]} A new array with the item moved
 */
export const arrayMove = <T,> (array: T[], fromIndex: number, toIndex: number) => {
    const newArray = [...array];
    const [movedItem] = newArray.splice(fromIndex, 1);
    newArray.splice(toIndex, 0, movedItem);
    return newArray;
}