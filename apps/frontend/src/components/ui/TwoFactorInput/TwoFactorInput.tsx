'use client';
import { useRef, useCallback, type KeyboardEvent, type ClipboardEvent } from 'react';
import styles from './TwoFactorInput.module.css';
interface TwoFactorInputProps {
  length?: number;
  onComplete: (code: string) => void;
  disabled?: boolean;
}
export default function TwoFactorInput({
  length = 6,
  onComplete,
  disabled,
}: TwoFactorInputProps) {
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);
  const focusInput = useCallback(
    (index: number) => {
      if (index >= 0 && index < length) {
        inputsRef.current[index]?.focus();
        inputsRef.current[index]?.select();
      }
    },
    [length],
  );
  const getCode = useCallback(() => {
    return inputsRef.current.map((input) => input?.value ?? '').join('');
  }, []);
  const handleInput = useCallback(
    (index: number, value: string) => {
      const digit = value.replace(/\D/g, '').slice(-1);
      const input = inputsRef.current[index];
      if (input) {
        input.value = digit;
      }
      if (digit && index < length - 1) {
        focusInput(index + 1);
      }
      const code = getCode();
      if (code.length === length && /^\d+$/.test(code)) {
        onComplete(code);
      }
    },
    [length, focusInput, getCode, onComplete],
  );
  const handleKeyDown = useCallback(
    (index: number, e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Backspace') {
        const input = inputsRef.current[index];
        if (input && !input.value && index > 0) {
          focusInput(index - 1);
        } else if (input) {
          input.value = '';
        }
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        focusInput(index - 1);
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        focusInput(index + 1);
      }
    },
    [focusInput],
  );
  const handlePaste = useCallback(
    (e: ClipboardEvent<HTMLInputElement>) => {
      e.preventDefault();
      const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, length);
      pasted.split('').forEach((digit, i) => {
        const input = inputsRef.current[i];
        if (input) {
          input.value = digit;
        }
      });
      if (pasted.length > 0) {
        focusInput(Math.min(pasted.length, length - 1));
      }
      if (pasted.length === length) {
        onComplete(pasted);
      }
    },
    [length, focusInput, onComplete],
  );
  return (
    <div className={styles.wrapper} role="group" aria-label="Code de verification">
      {Array.from({ length }, (_, i) => (
        <input
          key={i}
          ref={(el) => { inputsRef.current[i] = el; }}
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          maxLength={1}
          className={styles.input}
          disabled={disabled}
          autoComplete={i === 0 ? 'one-time-code' : 'off'}
          aria-label={`Chiffre ${i + 1}`}
          placeholder="\u2022"
          onInput={(e) => handleInput(i, (e.target as HTMLInputElement).value)}
          onKeyDown={(e) => handleKeyDown(i, e)}
          onPaste={handlePaste}
          onFocus={(e) => e.target.select()}
        />
      ))}
    </div>
  );
}
