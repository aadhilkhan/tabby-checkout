interface RadioButtonProps {
  selected: boolean;
  onChange?: () => void;
}

export function RadioButton({ selected, onChange }: RadioButtonProps) {
  return (
    <button
      onClick={onChange}
      className="w-6 h-6 rounded-full border-2 flex items-center justify-center cursor-pointer transition-all bg-transparent
        border-[var(--front-primary)]"
    >
      {selected && (
        <div className="w-3.5 h-3.5 rounded-full bg-[var(--front-primary)]" />
      )}
    </button>
  );
}
