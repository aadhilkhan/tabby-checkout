interface IconProps { className?: string; size?: number; }
export function MastercardIcon({ className, size = 40 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" className={className}>
      <rect x="4" y="8" width="32" height="24" rx="4" fill="#f2f5f7" stroke="#e9eff5"/>
      <circle cx="16" cy="20" r="7" fill="#EB001B"/>
      <circle cx="24" cy="20" r="7" fill="#F79E1B"/>
      <path d="M20 14.3a6.96 6.96 0 0 1 0 11.4 6.96 6.96 0 0 1 0-11.4z" fill="#FF5F00"/>
    </svg>
  );
}
