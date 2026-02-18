import { Chip } from './Chip';

interface ChipGroupProps {
  options: number[];
  selected: number;
  onSelect: (value: number) => void;
}

export function ChipGroup({ options, selected, onSelect }: ChipGroupProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((opt) => (
        <Chip
          key={opt}
          label={String(opt)}
          selected={opt === selected}
          onClick={() => onSelect(opt)}
        />
      ))}
    </div>
  );
}
