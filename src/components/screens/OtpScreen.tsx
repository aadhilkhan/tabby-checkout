import { useState, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { OtpInputGroup } from '../ui/OtpInputGroup';
import { PhonePill } from '../ui/PhonePill';
import { Button } from '../ui/Button';
import { LegalText } from '../ui/LegalText';
import { useCountdown } from '../../hooks/useCountdown';
import { useCheckout } from '../../context/CheckoutContext';
import { ROUTES } from '../../config/routes';
import { OTP_COUNTDOWN_SECONDS } from '../../config/constants';

const VALID_OTP = '8888';

export function OtpScreen() {
  const navigate = useNavigate();
  const { state, dispatch } = useCheckout();
  const { formatted, isExpired, restart } = useCountdown(OTP_COUNTDOWN_SECONDS);
  const [otpValue, setOtpValue] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [error, setError] = useState('');
  const errorRef = useRef('');

  const isComplete = otpValue.length === 4;

  const handleOtpChange = useCallback((value: string) => {
    setOtpValue(value);
    if (errorRef.current) {
      errorRef.current = '';
      setError('');
    }
  }, []);

  const handleContinue = async () => {
    if (!isComplete) return;
    setIsVerifying(true);
    dispatch({ type: 'SET_OTP', payload: otpValue });
    // Simulate verification delay
    await new Promise((resolve) => setTimeout(resolve, 800));

    if (otpValue !== VALID_OTP) {
      errorRef.current = 'Incorrect code. Please try again.';
      setError('Incorrect code. Please try again.');
      setIsVerifying(false);
      return;
    }

    dispatch({ type: 'VERIFY_OTP' });
    setIsVerifying(false);
    navigate(ROUTES.PLAN);
  };

  return (
    <div className="flex flex-col">
      <div className="px-8 pb-6">
        <h1 className="text-h1 text-[var(--front-primary)] pb-2">Enter 4-digit code</h1>
        <p className="text-body1 text-[var(--front-secondary)]">Sent via push notification or SMS</p>
      </div>

      <div className="px-8 pb-6">
        <PhonePill phoneNumber={state.phoneNumber} />
      </div>

      <div className="px-8 pb-5 flex flex-col gap-4">
        <OtpInputGroup
          onChange={handleOtpChange}
          onComplete={(code) => handleOtpChange(code)}
          hasError={!!error}
        />
        {error && (
          <p className="text-body2 text-[#ef4444]">{error}</p>
        )}
        {isExpired ? (
          <button
            onClick={restart}
            className="text-body2 text-[var(--accent-link)] cursor-pointer bg-transparent border-none text-left hover:underline p-0"
          >
            Send another code
          </button>
        ) : (
          <p className="text-body2 text-[var(--front-tertiary)]">
            Send another code {formatted}
          </p>
        )}
      </div>

      <div className="px-8 pb-0">
        <LegalText variant="otp" />
      </div>

      <div className="px-6 pt-6">
        <Button
          onClick={handleContinue}
          disabled={!isComplete}
          loading={isVerifying}
        >
          Continue
        </Button>
      </div>
    </div>
  );
}
