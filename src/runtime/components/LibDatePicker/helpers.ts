// todo move to helpers
import {
	type CalendarDate,
	fromDate,
	getLocalTimeZone,
	Time,
	toCalendarDate,
	toCalendarDateTime,
	today,
	toZoned,
	ZonedDateTime } from "@internationalized/date"

import { createNoonUtcDate } from "../../helpers/createNoonUtcDate.js"

/**
 * @internal
 *
 * Converts the input date to a @internationalized/date instance we can use internally.
 */
export function convertDateWithFallback(
	date: Date | undefined,
	{
		fallbackDate,
		timeZone = getLocalTimeZone(),
		useTime
	}: { fallbackDate: Date, timeZone: string, useTime: boolean }
): ZonedDateTime | CalendarDate {
	const finalDate = fromDate(date ?? fallbackDate, timeZone)
	return useTime ? finalDate : toCalendarDate(finalDate)
}

/**
 * @internal
 *
 * Converts the internal temporary date values to js dates. If the value is a CalendarDate, the time is set to 12 noon and the timezone to UTC so that regardless of what timezone it's converted to, the date itself won't change and the time component can be safely discarded.
 */
export function toEmittableDate(date: ZonedDateTime | CalendarDate): Date {
	return date instanceof ZonedDateTime
		? date.toDate()
		: toZoned(toCalendarDateTime(date, new Time(12, 0, 0)), "UTC").toDate()
}


/**
 * @internal
 *
 * Gets the current date, if `withTime` is true, it will return a ZonedDateTime (with the time set to noon), otherwise it will return a CalendarDate (without the time).
 */
export function getNow(opts: { withTime: boolean }): ZonedDateTime | CalendarDate {
	if (opts.withTime) {
		return createNoonUtcDate(today(getLocalTimeZone()))
	}
	return today(getLocalTimeZone())
}

