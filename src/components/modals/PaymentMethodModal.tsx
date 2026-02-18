import { useState } from 'react';
import { ModalSheet } from './ModalSheet';
import { Button } from '../ui/Button';
import { RadioButton } from '../ui/RadioButton';
import { MastercardIcon } from '../../assets/icons/MastercardIcon';
import { ApplePayIcon } from '../../assets/icons/ApplePayIcon';
import { PlusIcon } from '../../assets/icons/PlusIcon';
import { ChevronRightIcon } from '../../assets/icons/ChevronRightIcon';
import { useCheckout } from '../../context/CheckoutContext';

interface PaymentMethodModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function PaymentMethodModal({ isOpen, onClose }: PaymentMethodModalProps) {
  const { state, dispatch } = useCheckout();
  const [selectedId, setSelectedId] = useState(state.selectedPaymentMethod?.id || '');

  const handleConfirm = () => {
    dispatch({ type: 'SELECT_PAYMENT_METHOD', payload: selectedId });
    onClose();
  };

  return (
    <ModalSheet isOpen={isOpen} onClose={onClose}>
      <div className="pt-8 pb-8">
        <div className="px-8 pb-5">
          <h2 className="text-h2 text-[var(--front-primary)]">Select payment method</h2>
        </div>

        <div className="flex flex-col">
          {state.paymentMethods.map((method) => (
            <button
              key={method.id}
              onClick={() => setSelectedId(method.id)}
              className="flex items-center gap-4 px-8 py-4 hover:bg-[var(--bg-general)] transition-colors cursor-pointer bg-transparent border-none w-full text-left"
            >
              <div className="w-10 h-10 shrink-0 flex items-center justify-center">
                {method.type === 'apple_pay' ? (
                  <ApplePayIcon size={40} />
                ) : (
                  <MastercardIcon size={40} />
                )}
              </div>
              <div className="flex-1 min-w-0">
                {method.lastFour ? (
                  <>
                    <div className="text-body2 text-[var(--front-secondary)]">{method.label}</div>
                    <div className="text-body1 text-[var(--front-primary)]">•••• {method.lastFour}</div>
                  </>
                ) : (
                  <div className="text-body1 text-[var(--front-primary)]">{method.label}</div>
                )}
              </div>
              <RadioButton
                selected={selectedId === method.id}
                onChange={() => setSelectedId(method.id)}
              />
            </button>
          ))}

          <button className="flex items-center gap-4 px-8 py-4 hover:bg-[var(--bg-general)] transition-colors cursor-pointer bg-transparent border-none w-full text-left">
            <div className="w-10 h-10 shrink-0 flex items-center justify-center rounded-full bg-[var(--bg-general)]">
              <PlusIcon size={20} className="text-[var(--front-primary)]" />
            </div>
            <span className="flex-1 text-body1 text-[var(--front-primary)]">Add new card</span>
            <ChevronRightIcon size={20} className="text-[var(--front-tertiary)]" />
          </button>
        </div>

        <div className="px-6 pt-6">
          <Button onClick={handleConfirm}>Continue</Button>
        </div>
      </div>
    </ModalSheet>
  );
}
