interface LegalTextProps {
  variant: 'otp' | 'payment';
}

export function LegalText({ variant }: LegalTextProps) {
  const linkClass = 'text-[var(--accent-link)] cursor-pointer hover:underline';

  if (variant === 'otp') {
    return (
      <p className="text-caption text-[var(--front-secondary)]">
        By continuing, you accept Tabby's{' '}
        <span className={linkClass}>terms & conditions</span>,{' '}
        <span className={linkClass}>privacy policy</span> and consent to{' '}
        <span className={linkClass}>sharing my data</span> with AECB
      </p>
    );
  }

  return (
    <div className="flex flex-col gap-2 text-caption text-[var(--front-secondary)]">
      <p>We'll send you a reminder before your next payment is due.</p>
      <p>
        By paying for this order, you acknowledge the{' '}
        <span className={linkClass}>Key Fact Statement</span> and agree to the{' '}
        <span className={linkClass}>terms and conditions</span>
      </p>
    </div>
  );
}
