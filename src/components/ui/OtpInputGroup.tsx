import { useEffect } from 'react';
import { OtpInput } from './OtpInput';
import { useOtpInput } from '../../hooks/useOtpInput';
import { OTP_LENGTH } from '../../config/constants';

interface OtpInputGroupProps {
  onComplete?: (code: string) => void;
  onChange?: (code: string) => void;
  hasError?: boolean;
}

export function OtpInputGroup({ onComplete, onChange, hasError }: OtpInputGroupProps) {
  const { values, setRef, handleChange, handleKeyDown, handlePaste, otp, isComplete } = useOtpInput(OTP_LENGTH);

  useEffect(() => {
    onChange?.(otp);
    if (isComplete) {
      onComplete?.(otp);
    }
  }, [otp, isComplete, onComplete, onChange]);

  return (
    <div className="flex gap-2">
      {values.map((value, index) => (
        <OtpInput
          key={index}
          value={value}
          hasError={hasError}
          inputRef={setRef(index)}
          onChange={(val) => handleChange(index, val)}
          onKeyDown={(e) => handleKeyDown(index, e)}
          onPaste={handlePaste}
        />
      ))}
    </div>
  );
}
