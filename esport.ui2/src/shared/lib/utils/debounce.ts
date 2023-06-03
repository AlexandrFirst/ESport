type DebounceCallback = (...args: any[]) => void;

export function debounce(
  callback: DebounceCallback,
  delay = 300
): DebounceCallback {
  let timeoutId: NodeJS.Timeout;

  return function debouncedFn(...args: any[]): void {
    clearTimeout(timeoutId);

    timeoutId = setTimeout(() => {
      callback(...args);
    }, delay);
  };
}
