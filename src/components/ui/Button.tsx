import { type ReactNode } from 'react';

interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  loading?: boolean;
  className?: string;
}

export function Button({ children, onClick, disabled, loading, className = '' }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled || loading}
      className={`w-full py-[18px] px-6 rounded-2xl font-semibold text-[16px] tracking-[-0.16px] transition-all duration-200 cursor-pointer
        bg-[var(--button-primary)] text-[var(--button-primary-text)]
        disabled:opacity-50 disabled:cursor-not-allowed
        hover:opacity-90 active:scale-[0.99]
        flex items-center justify-center gap-2
        ${className}`}
    >
      {loading ? (
        <div className="w-5 h-5 border-2 border-[var(--button-primary-text)] border-t-transparent rounded-full animate-spin-slow" />
      ) : (
        children
      )}
    </button>
  );
}
