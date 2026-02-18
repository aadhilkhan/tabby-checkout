import { DirhamSymbol } from './DirhamSymbol';
import { formatAmount } from '../../lib/formatCurrency';

interface CurrencyAmountProps {
  amount: number;
  className?: string;
  showDecimals?: boolean;
}

export function CurrencyAmount({ amount, className = '', showDecimals = false }: CurrencyAmountProps) {
  return (
    <span className={className}>
      <DirhamSymbol /> {formatAmount(amount, showDecimals)}
    </span>
  );
}
