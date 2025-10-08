import { type CalendarDate, ZonedDateTime } from "@internationalized/date";
/**
 * @internal
 *
 * Converts the input date to a @internationalized/date instance we can use internally.
 */
export declare function convertDateWithFallback(date: Date | undefined, { fallbackDate, timeZone, useTime }: {
    fallbackDate: Date;
    timeZone: string;
    useTime: boolean;
}): ZonedDateTime | CalendarDate;
/**
 * @internal
 *
 * Converts the internal temporary date values to js dates. If the value is a CalendarDate, the time is set to 12 noon and the timezone to UTC so that regardless of what timezone it's converted to, the date itself won't change and the time component can be safely discarded.
 */
export declare function toEmittableDate(date: ZonedDateTime | CalendarDate): Date;
/**
 * @internal
 *
 * Gets the current date, if `withTime` is true, it will return a ZonedDateTime (with the time set to noon), otherwise it will return a CalendarDate (without the time).
 */
export declare function getNow(opts: {
    withTime: boolean;
}): ZonedDateTime | CalendarDate;
//# sourceMappingURL=helpers.d.ts.map