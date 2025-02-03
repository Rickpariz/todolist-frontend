import { useState, useEffect } from "react";

export function useSearch<T>(
  initialValue: T,
  delay: number,
  onSearch: (value: T) => void
) {
  const [value, setValue] = useState<T>(initialValue);

  useEffect(() => {
    const handler = setTimeout(() => {
      onSearch(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay, onSearch]);

  return {
    value,
    setValue,
  };
}
