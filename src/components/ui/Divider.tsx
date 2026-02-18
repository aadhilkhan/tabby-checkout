interface DividerProps {
  className?: string;
}

export function Divider({ className = '' }: DividerProps) {
  return (
    <div className={`w-full px-4 py-2 ${className}`}>
      <div className="h-px bg-[var(--line-disabled)]" />
    </div>
  );
}
