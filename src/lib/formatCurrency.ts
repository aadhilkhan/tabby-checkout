export function formatAmount(amount: number, showDecimals: boolean = false): string {
  if (showDecimals) {
    return amount.toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  }
  // If amount has decimals, show them; otherwise show integer
  if (amount % 1 !== 0) {
    return amount.toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  }
  return amount.toLocaleString('en-US');
}
