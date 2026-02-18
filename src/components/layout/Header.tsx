import { useCheckout } from '../../context/CheckoutContext';
import { DarkModeToggle } from '../ui/DarkModeToggle';
import { CloseIcon } from '../../assets/icons/CloseIcon';
import { TabbyLogo } from '../../assets/icons/TabbyLogo';

export function Header() {
  const { state } = useCheckout();

  return (
    <header className="flex items-center justify-between px-6 py-4 w-full">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-[var(--front-primary)] flex items-center justify-center overflow-hidden shrink-0">
          <span className="text-[var(--bg-card)] font-bold text-[14px]">
            {state.merchant.name.charAt(0).toUpperCase()}
          </span>
        </div>
        <div className="flex flex-col gap-0.5">
          <span className="font-bold text-[16px] leading-5 tracking-[-0.16px] text-[var(--front-primary)]">
            {state.merchant.name}
          </span>
          <div className="flex items-center gap-1">
            <span className="text-caption text-[var(--front-secondary)]">Pay with</span>
            <TabbyLogo className="h-3 text-[var(--front-primary)]" />
          </div>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <DarkModeToggle />
        <button className="p-2 rounded-full hover:bg-[var(--line-disabled)] transition-colors cursor-pointer bg-transparent border-none text-[var(--front-secondary)]">
          <CloseIcon size={24} />
        </button>
      </div>
    </header>
  );
}
