// lib/money.ts
export function formatMoney(
    value?: number | string | null,
    currency = 'USD'
  ): string {
    if (value == null || value === '') return '';
    const amount =
      typeof value === 'string' ? Number(value) : Number(value);
    // value is "12.00" (dollars) from our API; show as-is with Intl
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency,
      minimumFractionDigits: 2,
    }).format(amount);
  }