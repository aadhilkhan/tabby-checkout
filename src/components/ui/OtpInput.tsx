import { type KeyboardEvent, type ClipboardEvent, type ChangeEvent } from 'react';

interface OtpInputProps {
  value: string;
  focused?: boolean;
  error?: boolean;
  inputRef: (el: HTMLInputElement | null) => void;
  onChange: (value: string) => void;
  onKeyDown: (e: KeyboardEvent<HTMLInputElement>) => void;
  onPaste: (e: ClipboardEvent<HTMLInputElement>) => void;
}

export function OtpInput({ value, error, inputRef, onChange, onKeyDown, onPaste }: OtpInputProps) {
  const borderClass = error
    ? 'border-[1.5px] border-red-500'
    : value
      ? 'border-[1.5px] border-[var(--front-primary)]'
      : 'border border-[var(--line-primary)] focus:border-[1.5px] focus:border-[var(--front-primary)]';

  return (
    <input
      ref={inputRef}
      type="text"
      inputMode="numeric"
      maxLength={1}
      value={value}
      onChange={(e: ChangeEvent<HTMLInputElement>) => onChange(e.target.value)}
      onKeyDown={onKeyDown}
      onPaste={onPaste}
      className={`w-[48px] h-[56px] rounded-[16px] text-center text-[24px] font-semibold outline-none transition-all duration-150
        bg-transparent text-[var(--front-primary)]
        ${borderClass}`}
    />
  );
}
