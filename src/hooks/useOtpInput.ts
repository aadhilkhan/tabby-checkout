import { useState, useRef, useCallback, type KeyboardEvent, type ClipboardEvent } from 'react';

export function useOtpInput(length: number = 4) {
  const [values, setValues] = useState<string[]>(Array(length).fill(''));
  const refs = useRef<(HTMLInputElement | null)[]>([]);

  const setRef = useCallback((index: number) => (el: HTMLInputElement | null) => {
    refs.current[index] = el;
  }, []);

  const handleChange = useCallback((index: number, value: string) => {
    if (!/^\d?$/.test(value)) return;
    const newValues = [...values];
    newValues[index] = value;
    setValues(newValues);

    if (value && index < length - 1) {
      refs.current[index + 1]?.focus();
    }
  }, [values, length]);

  const handleKeyDown = useCallback((index: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !values[index] && index > 0) {
      refs.current[index - 1]?.focus();
      const newValues = [...values];
      newValues[index - 1] = '';
      setValues(newValues);
    }
  }, [values]);

  const handlePaste = useCallback((e: ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasted = e.clipboardData?.getData('text').slice(0, length);
    if (pasted && /^\d+$/.test(pasted)) {
      const newValues = Array(length).fill('');
      pasted.split('').forEach((char, i) => {
        newValues[i] = char;
      });
      setValues(newValues);
      refs.current[Math.min(pasted.length, length - 1)]?.focus();
    }
  }, [length]);

  const otp = values.join('');
  const isComplete = otp.length === length;

  const reset = useCallback(() => {
    setValues(Array(length).fill(''));
    refs.current[0]?.focus();
  }, [length]);

  return { values, setRef, handleChange, handleKeyDown, handlePaste, otp, isComplete, reset };
}
