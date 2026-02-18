import { createContext, useContext, useReducer, useMemo, type ReactNode } from 'react';
import type { CheckoutState, CheckoutAction, PlanOption } from '../types/checkout';
import { generateAllPlans } from '../lib/calculations';
import { generateRepaymentSchedule } from '../lib/dateUtils';
import {
  DEFAULT_MERCHANT,
  DEFAULT_ORDER_AMOUNT,
  DEFAULT_CURRENCY,
  DEFAULT_PHONE,
  DEFAULT_CASHBACK,
  DEFAULT_PAYMENT_METHODS,
  DEFAULT_INSTALLMENT,
} from '../config/constants';

function getInitialState(): CheckoutState {
  const plans = generateAllPlans(DEFAULT_ORDER_AMOUNT);
  const defaultPlan = plans.find((p) => p.installments === DEFAULT_INSTALLMENT) || plans[plans.length - 1];
  const defaultMethod = DEFAULT_PAYMENT_METHODS.find((m) => m.isDefault) || DEFAULT_PAYMENT_METHODS[0];

  return {
    merchant: DEFAULT_MERCHANT,
    orderAmount: DEFAULT_ORDER_AMOUNT,
    currency: DEFAULT_CURRENCY,
    phoneNumber: DEFAULT_PHONE,
    otpCode: '',
    otpVerified: false,
    availablePlans: plans,
    selectedPlan: defaultPlan,
    repaymentSchedule: generateRepaymentSchedule(defaultPlan.monthlyAmount, defaultPlan.installments),
    paymentMethods: DEFAULT_PAYMENT_METHODS,
    selectedPaymentMethod: defaultMethod,
    useCashback: false,
    cashbackAmount: DEFAULT_CASHBACK,
    isLoading: false,
    currentStep: 'otp',
  };
}

function checkoutReducer(state: CheckoutState, action: CheckoutAction): CheckoutState {
  switch (action.type) {
    case 'SET_OTP':
      return { ...state, otpCode: action.payload };

    case 'VERIFY_OTP':
      return { ...state, otpVerified: true, currentStep: 'plan' };

    case 'SELECT_PLAN': {
      const plan = state.availablePlans.find((p) => p.installments === action.payload);
      if (!plan) return state;
      return {
        ...state,
        selectedPlan: plan,
        repaymentSchedule: generateRepaymentSchedule(plan.monthlyAmount, plan.installments),
      };
    }

    case 'SELECT_PAYMENT_METHOD': {
      const method = state.paymentMethods.find((m) => m.id === action.payload);
      if (!method) return state;
      return { ...state, selectedPaymentMethod: method };
    }

    case 'TOGGLE_CASHBACK':
      return { ...state, useCashback: !state.useCashback };

    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };

    case 'SET_STEP':
      return { ...state, currentStep: action.payload };

    case 'COMPLETE_PAYMENT':
      return { ...state, currentStep: 'success' };

    default:
      return state;
  }
}

interface CheckoutContextType {
  state: CheckoutState;
  dispatch: React.Dispatch<CheckoutAction>;
  dueToday: number;
}

const CheckoutContext = createContext<CheckoutContextType | undefined>(undefined);

export function CheckoutProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(checkoutReducer, undefined, getInitialState);

  const dueToday = useMemo(() => {
    if (!state.selectedPlan) return 0;
    return state.selectedPlan.monthlyAmount;
  }, [state.selectedPlan]);

  return (
    <CheckoutContext.Provider value={{ state, dispatch, dueToday }}>
      {children}
    </CheckoutContext.Provider>
  );
}

export function useCheckout() {
  const context = useContext(CheckoutContext);
  if (!context) {
    throw new Error('useCheckout must be used within a CheckoutProvider');
  }
  return context;
}
