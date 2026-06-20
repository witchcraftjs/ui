import { type CalendarDate, ZonedDateTime } from "@internationalized/date";
/**
 * Takes the given local DATE (ignores the time), and converts it to a UTC (0 offset) date at noon.
 *
 * This should be used to wrap fallback dates for timeless dates, so that the date never changes regardless of the timezone it's converted too.
 */
export declare function createNoonUtcDate(date: CalendarDate): ZonedDateTime;
//# sourceMappingURL=createNoonUtcDate.d.ts.map