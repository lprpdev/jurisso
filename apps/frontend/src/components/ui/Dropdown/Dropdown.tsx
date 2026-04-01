'use client';
import { type ReactNode, useState, useRef, useEffect, useCallback } from 'react';
import styles from './Dropdown.module.css';
interface DropdownItem {
  label: string;
  onClick: () => void;
  icon?: ReactNode;
}
interface DropdownProps {
  trigger: ReactNode;
  items: DropdownItem[];
}
export default function Dropdown({ trigger, items }: DropdownProps) {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const close = useCallback(() => setOpen(false), []);
  useEffect(() => {
    if (!open) return;
    function handleClickOutside(e: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        close();
      }
    }
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        close();
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [open, close]);
  useEffect(() => {
    if (open && menuRef.current) {
      const firstItem = menuRef.current.querySelector<HTMLElement>('button');
      firstItem?.focus();
    }
  }, [open]);
  function handleMenuKeyDown(e: React.KeyboardEvent) {
    if (!menuRef.current) return;
    const buttons = Array.from(menuRef.current.querySelectorAll<HTMLElement>('button'));
    const currentIndex = buttons.indexOf(document.activeElement as HTMLElement);
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      const next = currentIndex < buttons.length - 1 ? currentIndex + 1 : 0;
      buttons[next].focus();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      const prev = currentIndex > 0 ? currentIndex - 1 : buttons.length - 1;
      buttons[prev].focus();
    }
  }
  return (
    <div className={styles.wrapper} ref={wrapperRef}>
      <div
        className={styles.trigger}
        onClick={() => setOpen((prev) => !prev)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            setOpen((prev) => !prev);
          }
        }}
        role="button"
        tabIndex={0}
        aria-haspopup="true"
        aria-expanded={open}
      >
        {trigger}
      </div>
      {open ? (
        <div
          ref={menuRef}
          className={styles.menu}
          role="menu"
          onKeyDown={handleMenuKeyDown}
        >
          {items.map((item) => (
            <button
              key={item.label}
              type="button"
              className={styles.item}
              role="menuitem"
              onClick={() => {
                item.onClick();
                close();
              }}
            >
              {item.icon ? <span className={styles.itemIcon}>{item.icon}</span> : null}
              {item.label}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
