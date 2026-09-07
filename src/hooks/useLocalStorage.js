import { useState, useEffect, useCallback } from 'react';

function useLocalStorage(key, initialValue) {
  // Read initial value from localStorage
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item !== null ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error('Error reading from localStorage:', error);
      return initialValue;
    }
  });

  // Keep localStorage updated whenever state changes
  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(storedValue));
    } catch (error) {
      console.error('Error saving to localStorage:', error);
    }
  }, [key, storedValue]);

  // Listen for changes made by another useLocalStorage instance
  useEffect(() => {
    const handleStorageChange = (event) => {
      if (event.detail?.key === key) {
        setStoredValue(event.detail.value);
      }
    };

    window.addEventListener('local-storage-change', handleStorageChange);

    return () => {
      window.removeEventListener(
        'local-storage-change',
        handleStorageChange
      );
    };
  }, [key]);

  // Update value
  const setValue = useCallback(
    (value) => {
      try {
        const valueToStore =
          value instanceof Function ? value(storedValue) : value;

        // Update this component immediately
        setStoredValue(valueToStore);

        // Save to localStorage
        window.localStorage.setItem(
          key,
          JSON.stringify(valueToStore)
        );

        // Notify other useLocalStorage instances
        window.dispatchEvent(
          new CustomEvent('local-storage-change', {
            detail: {
              key,
              value: valueToStore,
            },
          })
        );
      } catch (error) {
        console.error('Error setting localStorage:', error);
      }
    },
    [key, storedValue]
  );

  return [storedValue, setValue];
}

export default useLocalStorage;