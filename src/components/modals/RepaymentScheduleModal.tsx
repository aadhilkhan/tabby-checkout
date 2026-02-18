import { ModalSheet } from './ModalSheet';
import { TimelineTracker } from './TimelineTracker';
import { Button } from '../ui/Button';
import { ClockIcon } from '../../assets/icons/ClockIcon';
import { Divider } from '../ui/Divider';
import { useCheckout } from '../../context/CheckoutContext';

interface RepaymentScheduleModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function RepaymentScheduleModal({ isOpen, onClose }: RepaymentScheduleModalProps) {
  const { state } = useCheckout();
  const plan = state.selectedPlan;

  if (!plan) return null;

  return (
    <ModalSheet isOpen={isOpen} onClose={onClose}>
      <div className="pt-6 pb-8">
        <div className="flex items-center gap-3 px-8 py-2">
          <div className="w-10 h-10 rounded-full bg-[#f0e6ff] flex items-center justify-center shrink-0">
            <ClockIcon size={20} className="text-[#5d21de]" />
          </div>
          <h2 className="text-h3 text-[var(--front-primary)]">
            Pay in {plan.installments}
          </h2>
        </div>

        <Divider className="px-4" />

        <div className="px-8 pt-4">
          <h3 className="text-h4 text-[var(--front-primary)] pb-1">Repayment schedule</h3>
          <p className={`text-body2 pb-4 ${plan.hasInterest ? 'text-[var(--front-secondary)]' : 'text-[var(--front-positive)]'}`}>
            {plan.hasInterest
              ? `Includes service fee`
              : 'No interest. No fees.'}
          </p>
          <TimelineTracker schedule={state.repaymentSchedule} />
        </div>

        <div className="px-6 pt-4">
          <Button onClick={onClose}>Got it</Button>
        </div>
      </div>
    </ModalSheet>
  );
}
