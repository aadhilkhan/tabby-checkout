import type { ScheduleEntry } from '../types/checkout';

export function generateRepaymentSchedule(
  monthlyAmount: number,
  installments: number,
  startDate: Date = new Date()
): ScheduleEntry[] {
  const schedule: ScheduleEntry[] = [];

  for (let i = 0; i < installments; i++) {
    const date = new Date(startDate);
    date.setMonth(date.getMonth() + i);

    schedule.push({
      date,
      amount: monthlyAmount,
      isFirst: i === 0,
      label: i === 0
        ? 'Today'
        : date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' }),
    });
  }

  return schedule;
}
