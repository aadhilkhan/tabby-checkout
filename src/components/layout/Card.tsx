import { type ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
}

export function Card({ children, className = '' }: CardProps) {
  return (
    <div className={`bg-[var(--bg-card)] w-full sm:w-[500px] sm:rounded-[24px] rounded-t-[24px] ${className}`}>
      {children}
    </div>
  );
}
