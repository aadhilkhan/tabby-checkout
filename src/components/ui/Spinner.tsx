interface SpinnerProps {
  size?: number;
  className?: string;
}

export function Spinner({ size = 24, className = '' }: SpinnerProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={`animate-spin-slow ${className}`}
    >
      <circle cx="12" cy="12" r="10" stroke="var(--line-disabled)" strokeWidth="3" />
      <path
        d="M12 2a10 10 0 0 1 10 10"
        stroke="var(--front-secondary)"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}
