import { useRef, useCallback } from "react";

/**
 * A custom hook that returns a debounced version of a callback function.
 * @param {T} callback - The original callback function to debounce
 * @param {number} delay - The debounce delay in milliseconds
 * @returns {T} A debounced version of the callback function
 */

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useDebounceCallback<T extends (...args: any[]) => void>(
    callback: T,
    delay: number
) {
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const debouncedCallback = useCallback((...args: Parameters<T>) => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
        timeoutRef.current = setTimeout(() => {
            callback(...args);
        }, delay);
    }, [callback, delay]);

    return debouncedCallback;
}