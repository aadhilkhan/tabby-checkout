interface IconProps { className?: string; size?: number; }
export function DiamondIcon({ className, size = 24 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <path d="M12 2L2 9l10 13L22 9l-10-7z" fill="url(#diamond-grad)"/>
      <defs>
        <linearGradient id="diamond-grad" x1="2" y1="2" x2="22" y2="22" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FF6B6B"/>
          <stop offset="1" stopColor="#FF0055"/>
        </linearGradient>
      </defs>
    </svg>
  );
}
