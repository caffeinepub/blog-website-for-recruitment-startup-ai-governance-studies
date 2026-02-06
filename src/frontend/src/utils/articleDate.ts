/**
 * Safely converts a backend timestamp (bigint nanoseconds) to a JavaScript Date object.
 * Handles bigint, number, and string inputs with validation and robust fallback handling.
 */
export function timestampToDate(timestamp: bigint | number | string | undefined | null): Date {
  if (timestamp === undefined || timestamp === null) {
    return new Date(); // Fallback to current date
  }

  try {
    let nanos: bigint;

    if (typeof timestamp === 'bigint') {
      nanos = timestamp;
    } else if (typeof timestamp === 'number') {
      // Handle both integer and non-integer numbers
      if (!Number.isFinite(timestamp)) {
        return new Date(); // Fallback for Infinity, -Infinity, NaN
      }
      nanos = BigInt(Math.floor(timestamp));
    } else if (typeof timestamp === 'string') {
      // Validate string is numeric before conversion
      const trimmed = timestamp.trim();
      if (!/^-?\d+$/.test(trimmed)) {
        return new Date(); // Fallback for non-numeric strings
      }
      nanos = BigInt(trimmed);
    } else {
      return new Date(); // Fallback for unexpected types
    }

    // Validate nanos is within reasonable bounds (not negative, not absurdly large)
    if (nanos < BigInt(0)) {
      return new Date(); // Fallback for negative timestamps
    }

    // Convert nanoseconds to milliseconds
    const millis = Number(nanos / BigInt(1000000));
    
    // Validate the milliseconds value is within JavaScript Date range
    // JavaScript Date supports approximately ±8.64e15 milliseconds from epoch
    if (!Number.isFinite(millis) || millis < 0 || millis > 8.64e15) {
      return new Date(); // Fallback for out-of-range values
    }

    // Create date and validate it's not Invalid Date
    const date = new Date(millis);
    if (isNaN(date.getTime())) {
      return new Date(); // Fallback for invalid dates
    }

    return date;
  } catch (error) {
    console.error('Error converting timestamp to date:', error);
    return new Date(); // Fallback on any error
  }
}

/**
 * Formats a timestamp for display with safe fallback.
 * Returns a formatted date string or a fallback message if conversion fails.
 */
export function formatTimestampSafe(
  timestamp: bigint | number | string | undefined | null,
  formatFn: (date: Date) => string,
  fallback: string = 'Date unavailable'
): string {
  try {
    const date = timestampToDate(timestamp);
    const formatted = formatFn(date);
    return formatted;
  } catch (error) {
    console.error('Error formatting timestamp:', error);
    return fallback;
  }
}
