import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChipGroup } from '../ui/ChipGroup';
import { Button } from '../ui/Button';
import { Divider } from '../ui/Divider';
import { CurrencyAmount } from '../ui/CurrencyAmount';
import { Skeleton } from '../ui/Skeleton';
import { ClockIcon } from '../../assets/icons/ClockIcon';
import { ChevronRightIcon } from '../../assets/icons/ChevronRightIcon';
import { RepaymentScheduleModal } from '../modals/RepaymentScheduleModal';
import { useCheckout } from '../../context/CheckoutContext';
import { ROUTES } from '../../config/routes';
import { AVAILABLE_INSTALLMENTS, SKELETON_DELAY_MS } from '../../config/constants';

function PlanSelectionSkeleton() {
  return (
    <div className="flex flex-col">
      <div className="px-8 pb-8">
        <Skeleton width="160px" height="20px" className="mb-2" />
        <Skeleton width="200px" height="36px" />
      </div>
      <div className="px-8 pb-3">
        <Skeleton width="140px" height="18px" />
      </div>
      <div className="px-8 pb-2 flex gap-2">
        {[1, 2, 3, 4, 5].map((i) => (
          <Skeleton key={i} width="56px" height="40px" rounded="20px" />
        ))}
      </div>
      <Divider />
      <div className="px-8 py-4 flex items-center gap-3">
        <Skeleton width="40px" height="40px" rounded="50%" />
        <div className="flex-1">
          <Skeleton width="120px" height="18px" className="mb-1" />
          <Skeleton width="140px" height="16px" />
        </div>
      </div>
      <div className="px-6 pt-6">
        <Skeleton width="100%" height="56px" rounded="16px" />
      </div>
    </div>
  );
}

export function PlanSelectionScreen() {
  const navigate = useNavigate();
  const { state, dispatch } = useCheckout();
  const [showSchedule, setShowSchedule] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const plan = state.selectedPlan;
  const selectedInstallments = plan?.installments || 4;

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), SKELETON_DELAY_MS);
    return () => clearTimeout(timer);
  }, []);

  const handleSelectPlan = (installments: number) => {
    dispatch({ type: 'SELECT_PLAN', payload: installments });
  };

  const handleContinue = () => {
    navigate(ROUTES.PAYMENT);
  };

  if (isLoading) return <PlanSelectionSkeleton />;

  return (
    <div className="flex flex-col">
      <div className="px-8 pb-8">
        <p className="text-body1 text-[var(--front-secondary)] pb-1">Choose how to pay</p>
        <h1 className="text-h1 text-[var(--front-primary)]">
          <CurrencyAmount amount={state.orderAmount} />
        </h1>
      </div>

      <div className="px-8 pb-3 pt-2">
        <p className="text-body2 text-[var(--front-secondary)]">Number of payments</p>
      </div>

      <div className="px-8 pb-2">
        <ChipGroup
          options={[...AVAILABLE_INSTALLMENTS]}
          selected={selectedInstallments}
          onSelect={handleSelectPlan}
        />
      </div>

      <Divider />

      {plan && (
        <button
          onClick={() => setShowSchedule(true)}
          className="flex items-center gap-3 px-8 py-3 cursor-pointer bg-transparent border-none w-full text-left hover:bg-[var(--bg-general)] transition-colors"
        >
          <div className="w-10 h-10 rounded-full bg-[#f0e6ff] flex items-center justify-center shrink-0">
            <ClockIcon size={20} className="text-[#5d21de]" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-body1 text-[var(--front-primary)] font-medium">
              <CurrencyAmount amount={plan.monthlyAmount} />/mo
            </div>
            <div className={`text-body2 ${plan.hasInterest ? 'text-[var(--front-secondary)]' : 'text-[var(--front-positive)]'}`}>
              {plan.hasInterest
                ? <>Includes <CurrencyAmount amount={plan.totalServiceFee} /> total service fee</>
                : 'No interest. No fees.'}
            </div>
          </div>
          <ChevronRightIcon size={20} className="text-[var(--front-tertiary)] shrink-0" />
        </button>
      )}

      <div className="px-6 pt-6">
        <Button onClick={handleContinue}>Continue</Button>
      </div>

      <RepaymentScheduleModal
        isOpen={showSchedule}
        onClose={() => setShowSchedule(false)}
      />
    </div>
  );
}
