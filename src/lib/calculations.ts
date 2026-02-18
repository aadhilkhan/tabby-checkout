import { SERVICE_FEE_RATES } from '../config/constants';
import type { PlanOption } from '../types/checkout';

export function calculateInstallment(orderAmount: number, installments: number): PlanOption {
  const rate = SERVICE_FEE_RATES[installments] ?? 0;
  const totalServiceFee = Math.round(orderAmount * rate * 100) / 100;
  const totalAmount = orderAmount + totalServiceFee;
  const monthlyAmount = Math.round((totalAmount / installments) * 100) / 100;

  return {
    installments,
    monthlyAmount,
    totalServiceFee,
    hasInterest: rate > 0,
    totalAmount,
  };
}

export function generateAllPlans(orderAmount: number): PlanOption[] {
  return [12, 10, 8, 6, 4].map((n) => calculateInstallment(orderAmount, n));
}
