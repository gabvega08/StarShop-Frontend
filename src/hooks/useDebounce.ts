import { useState, useEffect } from "react";

/**
 * Custom hook to debounce a value by a specified delay
 * @param value - The value to debounce
 * @param delay - Delay in milliseconds (default is 500ms)
 * @returns The debounced value
 *
 * This is how you can use this hook:
 * const [searchQuery, setSearchQuery] = useState('');
 * const debouncedSearchQuery = useDebounce(searchQuery, 300);
 */
export function useDebounce<T>(value: T, delay: number = 500): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
}
