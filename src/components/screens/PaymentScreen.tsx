import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../ui/Button';
import { Divider } from '../ui/Divider';
import { CurrencyAmount } from '../ui/CurrencyAmount';
import { Badge } from '../ui/Badge';
import { ToggleSwitch } from '../ui/ToggleSwitch';
import { LegalText } from '../ui/LegalText';
import { Skeleton } from '../ui/Skeleton';
import { DirhamSymbol } from '../ui/DirhamSymbol';
import { ClockIcon } from '../../assets/icons/ClockIcon';
import { ChevronRightIcon } from '../../assets/icons/ChevronRightIcon';
import { MastercardIcon } from '../../assets/icons/MastercardIcon';
import { ApplePayIcon } from '../../assets/icons/ApplePayIcon';
import { DiamondIcon } from '../../assets/icons/DiamondIcon';
import { PaymentMethodModal } from '../modals/PaymentMethodModal';
import { RepaymentScheduleModal } from '../modals/RepaymentScheduleModal';
import { useCheckout } from '../../context/CheckoutContext';
import { ROUTES } from '../../config/routes';
import { SKELETON_DELAY_MS } from '../../config/constants';
import { formatAmount } from '../../lib/formatCurrency';

function PaymentSkeleton() {
  return (
    <div className="flex flex-col">
      <div className="px-8 py-4">
        <Skeleton width="180px" height="24px" />
      </div>
      <div className="px-8 pb-4">
        <Skeleton width="140px" height="20px" className="mb-2" />
        <Skeleton width="100%" height="16px" className="mb-4" />
        <Skeleton width="100%" height="56px" rounded="12px" className="mb-3" />
        <Skeleton width="100%" height="56px" rounded="12px" />
      </div>
      <Divider />
      <div className="px-8 py-4">
        <Skeleton width="100px" height="20px" className="mb-3" />
        <Skeleton width="100%" height="56px" rounded="12px" className="mb-3" />
        <Skeleton width="100%" height="20px" className="mb-2" />
        <Skeleton width="100%" height="20px" />
      </div>
      <div className="px-6 pt-6">
        <Skeleton width="100%" height="56px" rounded="16px" />
      </div>
    </div>
  );
}

export function PaymentScreen() {
  const navigate = useNavigate();
  const { state, dispatch, dueToday } = useCheckout();
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isPaying, setIsPaying] = useState(false);

  const plan = state.selectedPlan;
  const method = state.selectedPaymentMethod;

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), SKELETON_DELAY_MS);
    return () => clearTimeout(timer);
  }, []);

  const handlePay = async () => {
    setIsPaying(true);
    await new Promise((resolve) => setTimeout(resolve, 1200));
    dispatch({ type: 'COMPLETE_PAYMENT' });
    setIsPaying(false);
    navigate(ROUTES.SUCCESS);
  };

  if (isLoading) return <PaymentSkeleton />;

  return (
    <div className="flex flex-col">
      <div className="px-8 py-4">
        <h2 className="text-h3 text-[var(--front-primary)]">Review and pay</h2>
      </div>

      {/* Payment Method Section */}
      <div className="px-8">
        <div className="pb-1 pt-2">
          <h3 className="text-h4 text-[var(--front-primary)]">Payment method</h3>
        </div>
        <p className="text-body2 text-[var(--front-secondary)] pb-2">
          This will become your default method for future repayments on all of your purchases
        </p>

        {method && (
          <button
            onClick={() => setShowPaymentModal(true)}
            className="flex items-center gap-4 w-full py-3 cursor-pointer bg-transparent border-none text-left hover:opacity-80 transition-opacity"
          >
            <div className="w-10 h-10 shrink-0 flex items-center justify-center">
              {method.type === 'apple_pay' ? <ApplePayIcon size={40} /> : <MastercardIcon size={40} />}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-body2 text-[var(--front-secondary)]">{method.label}</div>
              {method.lastFour && (
                <div className="text-body1 text-[var(--front-primary)]">•••• {method.lastFour}</div>
              )}
            </div>
            <ChevronRightIcon size={20} className="text-[var(--front-tertiary)]" />
          </button>
        )}

        <div className="flex items-center gap-4 py-3">
          <div className="w-10 h-10 shrink-0 flex items-center justify-center">
            <DiamondIcon size={40} />
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-body1 text-[var(--front-primary)]">Cashback balance</div>
            <div className="text-body2 text-[var(--front-secondary)]">
              Use <DirhamSymbol /> {formatAmount(state.cashbackAmount, true)}
            </div>
          </div>
          <ToggleSwitch
            checked={state.useCashback}
            onChange={() => dispatch({ type: 'TOGGLE_CASHBACK' })}
          />
        </div>
      </div>

      <Divider />

      {/* Plan Summary Section */}
      {plan && (
        <div className="px-8 pt-2">
          <div className="py-2">
            <h3 className="text-h4 text-[var(--front-primary)]">Your plan</h3>
          </div>

          <button
            onClick={() => setShowScheduleModal(true)}
            className="flex items-center gap-3 w-full py-3 cursor-pointer bg-transparent border-none text-left hover:opacity-80 transition-opacity"
          >
            <div className="w-10 h-10 rounded-full bg-[#f0e6ff] flex items-center justify-center shrink-0">
              <ClockIcon size={20} className="text-[#5d21de]" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-body1 text-[var(--front-primary)]">
                <CurrencyAmount amount={plan.monthlyAmount} showDecimals />/mo
              </div>
              <div className={`text-body2 ${plan.hasInterest ? 'text-[var(--front-secondary)]' : 'text-[var(--front-positive)]'}`}>
                {plan.hasInterest ? 'Includes service fee' : 'No interest. No fees.'}
              </div>
            </div>
            <Badge>Pay in {plan.installments}</Badge>
            <ChevronRightIcon size={20} className="text-[var(--front-tertiary)]" />
          </button>

          <div className="flex flex-col py-1.5">
            <div className="flex justify-between items-end px-4 py-1.5">
              <span className="text-body1 text-[var(--front-secondary)]">Order amount</span>
              <CurrencyAmount amount={state.orderAmount} showDecimals className="text-body1 text-[var(--front-secondary)]" />
            </div>
            <div className="flex justify-between items-end px-4 py-1.5">
              <span className="text-body1-bold text-[var(--front-primary)]">Due today</span>
              <CurrencyAmount amount={dueToday} showDecimals className="text-body1-bold text-[var(--front-primary)]" />
            </div>
          </div>
        </div>
      )}

      <Divider />

      <div className="px-8 pt-2">
        <LegalText variant="payment" />
      </div>

      <div className="px-6 pt-6">
        <Button onClick={handlePay} loading={isPaying}>
          Pay <DirhamSymbol /> {formatAmount(dueToday)}
        </Button>
      </div>

      <PaymentMethodModal
        isOpen={showPaymentModal}
        onClose={() => setShowPaymentModal(false)}
      />
      <RepaymentScheduleModal
        isOpen={showScheduleModal}
        onClose={() => setShowScheduleModal(false)}
      />
    </div>
  );
}
