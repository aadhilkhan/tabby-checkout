interface ChipProps {
  label: string;
  selected?: boolean;
  onClick?: () => void;
}

export function Chip({ label, selected = false, onClick }: ChipProps) {
  return (
    <button
      onClick={onClick}
      className={`px-5 py-2.5 rounded-full text-body2 font-medium transition-all duration-200 cursor-pointer border
        ${selected
          ? 'bg-[var(--front-primary)] text-[var(--bg-card)] border-[var(--front-primary)]'
          : 'bg-transparent text-[var(--front-primary)] border-[var(--line-primary)] hover:border-[var(--front-secondary)]'
        }`}
    >
      {label}
    </button>
  );
}
