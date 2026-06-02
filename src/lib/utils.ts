/**
 * Helper to format price numbers in a deterministic, consistent format.
 * Uses 'en-US' locale (comma separator, e.g. 30,000) to prevent any server-client
 * hydration mismatches in Next.js/SSR.
 */
export function formatPrice(price: number | null | undefined): string {
  if (price === null || price === undefined) return "0";
  return new Intl.NumberFormat("en-US").format(price);
}
