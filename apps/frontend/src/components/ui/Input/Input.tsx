'use client';
import { type InputHTMLAttributes, useState, useId } from 'react';
import styles from './Input.module.css';
interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  type?: 'text' | 'email' | 'password' | 'search';
  label?: string;
  hint?: string;
  error?: string;
}
export default function Input({
  type = 'text',
  label,
  hint,
  error,
  name,
  className,
  disabled,
  ...rest
}: InputProps) {
  const [showPassword, setShowPassword] = useState(false);
  const id = useId();
  const inputId = name ?? id;
  const errorId = error ? `${inputId}-error` : undefined;
  const hintId = hint && !error ? `${inputId}-hint` : undefined;
  const isPassword = type === 'password';
  const fieldClasses = [
    styles.field,
    error ? styles.hasError : '',
    className ?? '',
  ]
    .filter(Boolean)
    .join(' ');
  const inputClasses = [
    styles.input,
    isPassword ? styles.inputWithToggle : '',
  ]
    .filter(Boolean)
    .join(' ');
  return (
    <div className={fieldClasses}>
      {label ? (
        <label htmlFor={inputId} className={styles.label}>
          {label}
        </label>
      ) : null}
      <div className={styles.inputWrap}>
        <input
          id={inputId}
          name={name}
          type={isPassword && showPassword ? 'text' : type}
          className={inputClasses}
          disabled={disabled}
          aria-invalid={error ? true : undefined}
          aria-describedby={errorId ?? hintId}
          {...rest}
        />
        {isPassword ? (
          <button
            type="button"
            className={styles.passwordToggle}
            onClick={() => setShowPassword((prev) => !prev)}
            aria-label={showPassword ? 'Masquer le mot de passe' : 'Afficher le mot de passe'}
            tabIndex={-1}
          >
            {showPassword ? (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
                <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
                <path d="M14.12 14.12a3 3 0 1 1-4.24-4.24" />
                <line x1="1" y1="1" x2="23" y2="23" />
              </svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
            )}
          </button>
        ) : null}
      </div>
      {error ? (
        <span id={errorId} className={styles.error} role="alert">
          {error}
        </span>
      ) : hint ? (
        <span id={hintId} className={styles.hint}>
          {hint}
        </span>
      ) : null}
    </div>
  );
}
