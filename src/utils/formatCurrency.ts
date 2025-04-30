export function formatCurrency(
    amount: number,
    locale: string = 'en-US',
    currency: string = 'USD'
): string {
    try {
        return new Intl.NumberFormat(locale, {
          style: 'currency',
          currency,
        }).format(amount);
    } catch (error) {
        console.error(`Error formatting currency for locale '${locale}' and currency '${currency}':`, error);
        return `${currency} ${amount.toFixed(2)}`; // Fallback to a basic format
    }
}