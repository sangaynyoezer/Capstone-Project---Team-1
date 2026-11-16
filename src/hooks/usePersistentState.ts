import { useEffect, useState, type Dispatch, type SetStateAction } from 'react';

export function isNonNegativeInteger(value: unknown): value is number {
  return typeof value === 'number' && Number.isInteger(value) && value >= 0;
}

export function isRecordOf<T>(
  value: unknown,
  isValue: (entry: unknown) => entry is T,
): value is Record<number, T> {
  return typeof value === 'object' &&
    value !== null &&
    !Array.isArray(value) &&
    Object.values(value).every(isValue);
}

export function usePersistentState<T>(
  key: string,
  initialValue: T,
  isValid: (value: unknown) => value is T,
): [T, Dispatch<SetStateAction<T>>] {
  const [value, setValue] = useState<T>(() => {
    if (typeof window === 'undefined') return initialValue;

    try {
      const saved = window.localStorage.getItem(key);
      if (saved === null) return initialValue;

      const parsed: unknown = JSON.parse(saved);
      if (isValid(parsed)) return parsed;
      console.error(`Saved presentation progress for "${key}" is invalid.`);
    } catch (error) {
      console.error(`Could not load presentation progress for "${key}".`, error);
    }

    return initialValue;
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(`Could not save presentation progress for "${key}".`, error);
    }
  }, [key, value]);

  return [value, setValue];
}
