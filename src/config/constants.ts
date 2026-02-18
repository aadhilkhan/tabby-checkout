import type { Merchant, PaymentMethod } from '../types/checkout';

export const SERVICE_FEE_RATES: Record<number, number> = {
  4: 0,
  6: 0.05,
  8: 0.09,
  10: 0.13,
  12: 0.17,
};

export const AVAILABLE_INSTALLMENTS = [12, 10, 8, 6, 4] as const;

export const DEFAULT_INSTALLMENT = 4;

export const OTP_LENGTH = 4;
export const OTP_COUNTDOWN_SECONDS = 59;

export const SKELETON_DELAY_MS = 1500;

export const DEFAULT_MERCHANT: Merchant = {
  name: 'Adidas',
  logoUrl: '',
};

export const DEFAULT_ORDER_AMOUNT = 1600;
export const DEFAULT_CURRENCY = 'AED';
export const DEFAULT_PHONE = '+971 58 5858 290';
export const DEFAULT_CASHBACK = 50;

export const DEFAULT_PAYMENT_METHODS: PaymentMethod[] = [
  {
    id: 'apple-pay',
    type: 'apple_pay',
    label: 'Apple Pay',
    isDefault: false,
  },
  {
    id: 'mc-1234',
    type: 'card',
    brand: 'mastercard',
    label: 'Debit Card',
    lastFour: '1234',
    isDefault: true,
  },
];
