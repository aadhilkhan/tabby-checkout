interface DirhamSymbolProps {
  className?: string;
}

export function DirhamSymbol({ className = '' }: DirhamSymbolProps) {
  return (
    <span className={`dirham-symbol ${className}`} aria-label="AED">
      {'\u00EA'}
    </span>
  );
}
