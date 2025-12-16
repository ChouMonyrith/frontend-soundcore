import React from "react";

export default function useDebounceCallback(callback, delay = 500) {
  const timeoutRef = React.useRef();

  const debouncedCallback = React.useCallback(
    (...args) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = setTimeout(() => {
        callback(...args);
      }, delay);
    },
    [callback, delay]
  );

  return debouncedCallback;
}
