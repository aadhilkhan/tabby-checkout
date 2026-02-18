interface ToggleSwitchProps {
  checked: boolean;
  onChange: () => void;
}

export function ToggleSwitch({ checked, onChange }: ToggleSwitchProps) {
  return (
    <button
      onClick={onChange}
      className={`relative w-[52px] h-[32px] rounded-full transition-colors duration-200 cursor-pointer border-none
        ${checked ? 'bg-[var(--front-primary)]' : 'bg-[var(--line-disabled)]'}`}
    >
      <div
        className={`absolute top-1 w-6 h-6 rounded-full bg-white shadow-sm transition-transform duration-200
          ${checked ? 'translate-x-[22px]' : 'translate-x-1'}`}
      />
    </button>
  );
}
