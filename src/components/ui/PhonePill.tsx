import { PhoneIcon } from '../../assets/icons/PhoneIcon';

interface PhonePillProps {
  phoneNumber: string;
  onSwitchAccount?: () => void;
}

export function PhonePill({ phoneNumber, onSwitchAccount }: PhonePillProps) {
  return (
    <div className="inline-flex items-center gap-2 bg-[var(--bg-general)] rounded-full pl-3 pr-4 py-2.5">
      <PhoneIcon size={20} className="text-[var(--front-primary)]" />
      <span className="text-body1 text-[var(--front-primary)]">{phoneNumber}</span>
      <div className="w-px h-4 bg-[var(--line-primary)]" />
      <button
        onClick={onSwitchAccount}
        className="text-body1 font-bold text-[var(--front-primary)] cursor-pointer hover:opacity-80 bg-transparent border-none"
      >
        Switch Account
      </button>
    </div>
  );
}
