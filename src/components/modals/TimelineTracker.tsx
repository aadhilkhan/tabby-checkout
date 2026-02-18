import type { ScheduleEntry } from '../../types/checkout';
import { CurrencyAmount } from '../ui/CurrencyAmount';

interface TimelineTrackerProps {
  schedule: ScheduleEntry[];
}

export function TimelineTracker({ schedule }: TimelineTrackerProps) {
  return (
    <div className="flex flex-col">
      {schedule.map((entry, index) => (
        <div key={index} className="flex items-start">
          <div className="flex flex-col items-center w-10 shrink-0">
            <div
              className={`w-3 h-3 rounded-full mt-1 ${
                entry.isFirst
                  ? 'bg-[var(--front-positive)] border-2 border-[var(--front-positive)]'
                  : 'bg-[var(--line-disabled)] border-2 border-[var(--line-disabled)]'
              }`}
            />
            {index < schedule.length - 1 && (
              <div className="w-0.5 flex-1 min-h-[40px] bg-[var(--line-disabled)]" />
            )}
          </div>
          <div className="flex justify-between items-start flex-1 pb-6">
            <span className="text-body2 text-[var(--front-primary)]">{entry.label}</span>
            <CurrencyAmount amount={entry.amount} className="text-body2 text-[var(--front-primary)]" />
          </div>
        </div>
      ))}
    </div>
  );
}
