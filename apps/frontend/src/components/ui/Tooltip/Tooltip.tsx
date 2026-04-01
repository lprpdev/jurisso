'use client';

import { type ReactNode } from 'react';
import styles from './Tooltip.module.css';

interface TooltipProps {
  content: string;
  children: ReactNode;
  position?: 'top' | 'bottom' | 'left' | 'right';
}

export function Tooltip({ content, children, position = 'top' }: TooltipProps) {
  return (
    <span className={styles.wrapper}>
      {children}
      <span className={`${styles.tooltip} ${styles[position]}`} role="tooltip">
        {content}
      </span>
    </span>
  );
}
