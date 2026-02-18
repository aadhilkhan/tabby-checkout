interface IconProps { className?: string; }
export function TabbyLogo({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 80 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <text x="0" y="16" fill="currentColor" fontSize="16" fontFamily="Inter" fontWeight="700" letterSpacing="-0.5">tabby</text>
    </svg>
  );
}
