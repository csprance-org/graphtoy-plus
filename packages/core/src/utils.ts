/**
 * Get error message from unknown error type
 */
export function getErrorMessage(error: unknown): string {
  if (error instanceof Error) return error.message;
  return String(error);
}

/**
 * Check if a number is NaN, Infinity, or -Infinity
 */
export function isBadNum(num: number): boolean {
  return Number.isNaN(num) || !Number.isFinite(num);
}

/**
 * Sort array items by their id property
 */
export function sortById<T extends { id: number }>(a: T, b: T): number {
  return a.id - b.id;
}