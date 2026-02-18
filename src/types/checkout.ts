export interface Merchant {
  name: string;
  logoUrl: string;
}

export interface PaymentMethod {
  id: string;
  type: 'apple_pay' | 'card';
  brand?: 'mastercard' | 'visa';
  label: string;
  lastFour?: string;
  isDefault: boolean;
}

export interface PlanOption {
  installments: number;
  monthlyAmount: number;
  totalServiceFee: number;
  hasInterest: boolean;
  totalAmount: number;
}

export interface ScheduleEntry {
  date: Date;
  amount: number;
  isFirst: boolean;
  label: string;
}

export interface CheckoutState {
  merchant: Merchant;
  orderAmount: number;
  currency: string;
  phoneNumber: string;
  otpCode: string;
  otpVerified: boolean;
  availablePlans: PlanOption[];
  selectedPlan: PlanOption | null;
  repaymentSchedule: ScheduleEntry[];
  paymentMethods: PaymentMethod[];
  selectedPaymentMethod: PaymentMethod | null;
  useCashback: boolean;
  cashbackAmount: number;
  isLoading: boolean;
  currentStep: 'otp' | 'plan' | 'payment' | 'success';
}

export type CheckoutAction =
  | { type: 'SET_OTP'; payload: string }
  | { type: 'VERIFY_OTP' }
  | { type: 'SELECT_PLAN'; payload: number }
  | { type: 'SELECT_PAYMENT_METHOD'; payload: string }
  | { type: 'TOGGLE_CASHBACK' }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_STEP'; payload: CheckoutState['currentStep'] }
  | { type: 'COMPLETE_PAYMENT' };
