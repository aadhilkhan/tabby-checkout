import { useEffect, useState } from 'react';
import { Spinner } from '../ui/Spinner';
import { useCheckout } from '../../context/CheckoutContext';

function SuccessCheckmark() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShow(true), 100);
    return () => clearTimeout(timer);
  }, []);

  if (!show) return <div className="w-[180px] h-[180px]" />;

  return (
    <div className="w-[180px] h-[180px] relative">
      {/* Shadow */}
      <div className="absolute bottom-[21%] left-1/2 -translate-x-1/2 w-[96px] h-[28px] bg-[#c8e6cc] rounded-[50%] opacity-60 checkmark-circle" />
      {/* Circle body */}
      <div className="absolute top-[24%] left-1/2 -translate-x-1/2 checkmark-circle">
        <svg width="106" height="88" viewBox="0 0 106 88" fill="none">
          {/* 3D coin shape */}
          <ellipse cx="53" cy="48" rx="50" ry="40" fill="#57C26E" />
          <ellipse cx="53" cy="40" rx="50" ry="40" fill="#90D19F" />
          <ellipse cx="53" cy="38" rx="42" ry="34" fill="#57C26E" />
          {/* Checkmark */}
          <path
            d="M35 38L48 51L71 28"
            stroke="white"
            strokeWidth="5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="checkmark-path"
            fill="none"
          />
        </svg>
      </div>
    </div>
  );
}

export function SuccessScreen() {
  const { state } = useCheckout();

  return (
    <div className="flex flex-col items-center pt-4">
      <div className="flex flex-col items-center pb-16">
        <SuccessCheckmark />
        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="text-h2 text-[var(--front-primary)]">Mission complete!</h1>
          <p className="text-body1 text-[var(--front-secondary)]">
            We're taking you back to {state.merchant.name} now
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2 justify-center py-6">
        <Spinner size={20} />
        <p className="text-body1 text-[var(--front-secondary)]">
          Please don't close this screen
        </p>
      </div>
    </div>
  );
}
