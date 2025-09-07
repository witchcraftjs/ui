import { type CalendarDate, ZonedDateTime } from "@internationalized/date"

/**
 * Takes the given local DATE (ignores the time), and converts it to a UTC (0 offset) date at noon.
 *
 * This should be used to wrap fallback dates for timeless dates, so that the date never changes regardless of the timezone it's converted too.
 */
export function createNoonUtcDate(date: CalendarDate): ZonedDateTime {
	const noon = [12, 0, 0]
	const timeZoneOffset = 0
	const d = new ZonedDateTime(
		date.year,
		date.month,
		date.day,
		"UTC",
		timeZoneOffset,
		...noon
	)
	return d
}
