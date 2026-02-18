interface IconProps { className?: string; size?: number; }
export function ApplePayIcon({ className, size = 40 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" className={className}>
      <rect x="4" y="8" width="32" height="24" rx="4" fill="#f2f5f7" stroke="#e9eff5"/>
      <text x="20" y="23" textAnchor="middle" fill="#1d2329" fontSize="9" fontFamily="Inter" fontWeight="600">Pay</text>
    </svg>
  );
}
