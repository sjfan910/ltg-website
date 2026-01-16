/**
 * Format a number with thousand separators
 * @param value - The number to format
 * @returns Formatted string (e.g., 2345 → "2,345")
 */
export function formatNumber(value: number): string {
  return Math.floor(value).toLocaleString('en-US');
}

/**
 * Format dual currency display with USD and THB
 * @param usd - Amount in USD
 * @param thb - Amount in THB
 * @returns Formatted string (e.g., "$3,060 (฿96,262)")
 */
export function formatDualCurrency(usd: number, thb: number): string {
  return `$${formatNumber(usd)} (฿${formatNumber(thb)})`;
}

/**
 * Format a number with a "+" suffix if it meets the threshold
 * @param value - The number to format
 * @param threshold - Minimum value to add "+" (default: 10)
 * @returns Formatted string (e.g., 90 → "90+", 5 → "5")
 */
export function formatWithPlus(value: number, threshold: number = 10): string {
  const formatted = formatNumber(value);
  return value >= threshold ? `${formatted}+` : formatted;
}

/**
 * Format currency for chatbot (USD only with "+" suffix)
 * @param usd - Amount in USD
 * @returns Formatted string (e.g., "$3,060+")
 */
export function formatChatbotCurrency(usd: number): string {
  return `$${formatNumber(usd)}+`;
}

/**
 * Strip currency symbols and thousand separators from a string
 * @param value - String with currency formatting (e.g., "฿96,262.21" or "$3,060.02")
 * @returns Parsed number
 */
export function parseCurrencyString(value: string): number {
  // Remove currency symbols (฿, $, £, etc.) and thousand separators
  const cleaned = value.replace(/[฿$£€,]/g, '').trim();
  const parsed = parseFloat(cleaned);
  return isNaN(parsed) ? 0 : parsed;
}
