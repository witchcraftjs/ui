import LibRangeDatePicker from "./LibRangeDatePicker.vue";
import LibSingleDatePicker from "./LibSingleDatePicker.vue";
import type { RangeDate, SingleDate } from "../../types/index.js";
declare const attrs: {
    [x: string]: unknown;
};
type __VLS_Props = {
    showTime?: boolean;
    id?: string;
    /** The fallback suggested date when the modelValue is undefined (it will not update modelValue, it only serves as a suggestions and is used internally in the temporary value). If ignoring the time element, you should probably use the {@link createNoonTodayUtc} function (`createNonTodayUtc().toDate(())`) in the helpers, otherwise `new Date()` (the default) will do. */
    fallbackDate?: Date;
    /** The local user's timezone, defaults to @internationalized/date's getLocalTimeZone(). */
    timeZone?: string;
};
declare const fallbackId: string;
declare const date: import("vue").ModelRef<SingleDate | RangeDate, string, SingleDate | RangeDate, SingleDate | RangeDate>;
declare const isRange: import("vue").ComputedRef<boolean>;
type __VLS_PublicProps = __VLS_Props & {
    /**
     * modelValue can be undefined or an object with start/end undefined, but it must be passed, otherwise we can't tell the difference between a single date and a range date.
     *
     * In the case of an undefined date, the current date at NOON UTC will be used to avoid the date changing.
     *
     * The @internationalized/date library's fromDate function is used internally to convert the date given (should be UTC) to the local time zone. It's converted back via it's toDate function.
     */
    modelValue: SingleDate | RangeDate;
};
declare const __VLS_ctx: InstanceType<__VLS_PickNotAny<typeof __VLS_self, new () => {}>>;
declare var __VLS_5: {
    tempValue: {
        readonly calendar: {
            identifier: import("@internationalized/date").CalendarIdentifier;
            fromJulianDay: (jd: number) => import("@internationalized/date").CalendarDate;
            toJulianDay: (date: import("@internationalized/date").AnyCalendarDate) => number;
            getDaysInMonth: (date: import("@internationalized/date").AnyCalendarDate) => number;
            getMonthsInYear: (date: import("@internationalized/date").AnyCalendarDate) => number;
            getYearsInEra: (date: import("@internationalized/date").AnyCalendarDate) => number;
            getEras: () => string[];
            getMinimumMonthInYear?: ((date: import("@internationalized/date").AnyCalendarDate) => number) | undefined;
            getMinimumDayInMonth?: ((date: import("@internationalized/date").AnyCalendarDate) => number) | undefined;
            getFormattableMonth?: ((date: import("@internationalized/date").AnyCalendarDate) => import("@internationalized/date").CalendarDate) | undefined;
            isEqual?: ((calendar: import("@internationalized/date").Calendar) => boolean) | undefined;
            balanceDate?: ((date: import("@internationalized/date").AnyCalendarDate) => void) | undefined;
            balanceYearMonth?: ((date: import("@internationalized/date").AnyCalendarDate, previousDate: import("@internationalized/date").AnyCalendarDate) => void) | undefined;
            constrainDate?: ((date: import("@internationalized/date").AnyCalendarDate) => void) | undefined;
            isInverseEra?: ((date: import("@internationalized/date").AnyCalendarDate) => boolean) | undefined;
        };
        readonly era: string;
        readonly year: number;
        readonly month: number;
        readonly day: number;
        copy: () => import("@internationalized/date").CalendarDate;
        add: (duration: import("@internationalized/date").DateDuration) => import("@internationalized/date").CalendarDate;
        subtract: (duration: import("@internationalized/date").DateDuration) => import("@internationalized/date").CalendarDate;
        set: (fields: import("@internationalized/date").DateFields) => import("@internationalized/date").CalendarDate;
        cycle: (field: import("@internationalized/date").DateField, amount: number, options?: import("@internationalized/date").CycleOptions) => import("@internationalized/date").CalendarDate;
        toDate: (timeZone: string) => Date;
        toString: () => string;
        compare: (b: import("@internationalized/date").AnyCalendarDate) => number;
    } | {
        readonly calendar: {
            identifier: import("@internationalized/date").CalendarIdentifier;
            fromJulianDay: (jd: number) => import("@internationalized/date").CalendarDate;
            toJulianDay: (date: import("@internationalized/date").AnyCalendarDate) => number;
            getDaysInMonth: (date: import("@internationalized/date").AnyCalendarDate) => number;
            getMonthsInYear: (date: import("@internationalized/date").AnyCalendarDate) => number;
            getYearsInEra: (date: import("@internationalized/date").AnyCalendarDate) => number;
            getEras: () => string[];
            getMinimumMonthInYear?: ((date: import("@internationalized/date").AnyCalendarDate) => number) | undefined;
            getMinimumDayInMonth?: ((date: import("@internationalized/date").AnyCalendarDate) => number) | undefined;
            getFormattableMonth?: ((date: import("@internationalized/date").AnyCalendarDate) => import("@internationalized/date").CalendarDate) | undefined;
            isEqual?: ((calendar: import("@internationalized/date").Calendar) => boolean) | undefined;
            balanceDate?: ((date: import("@internationalized/date").AnyCalendarDate) => void) | undefined;
            balanceYearMonth?: ((date: import("@internationalized/date").AnyCalendarDate, previousDate: import("@internationalized/date").AnyCalendarDate) => void) | undefined;
            constrainDate?: ((date: import("@internationalized/date").AnyCalendarDate) => void) | undefined;
            isInverseEra?: ((date: import("@internationalized/date").AnyCalendarDate) => boolean) | undefined;
        };
        readonly era: string;
        readonly year: number;
        readonly month: number;
        readonly day: number;
        readonly hour: number;
        readonly minute: number;
        readonly second: number;
        readonly millisecond: number;
        readonly timeZone: string;
        readonly offset: number;
        copy: () => import("@internationalized/date").ZonedDateTime;
        add: (duration: import("@internationalized/date").DateTimeDuration) => import("@internationalized/date").ZonedDateTime;
        subtract: (duration: import("@internationalized/date").DateTimeDuration) => import("@internationalized/date").ZonedDateTime;
        set: (fields: import("@internationalized/date").DateFields & import("@internationalized/date").TimeFields, disambiguation?: import("@internationalized/date").Disambiguation) => import("@internationalized/date").ZonedDateTime;
        cycle: (field: import("@internationalized/date").DateField | import("@internationalized/date").TimeField, amount: number, options?: import("@internationalized/date").CycleTimeOptions) => import("@internationalized/date").ZonedDateTime;
        toDate: () => Date;
        toString: () => string;
        toAbsoluteString: () => string;
        compare: (b: import("@internationalized/date").CalendarDate | import("@internationalized/date").CalendarDateTime | import("@internationalized/date").ZonedDateTime) => number;
    };
}, __VLS_11: {};
type __VLS_Slots = __VLS_PrettifyGlobal<__VLS_OmitStringIndex<typeof __VLS_ctx.$slots> & {
    default?: (props: typeof __VLS_5) => any;
} & {
    default?: (props: typeof __VLS_11) => any;
}>;
declare const __VLS_self: import("vue").DefineComponent<__VLS_PublicProps, {
    LibRangeDatePicker: typeof LibRangeDatePicker;
    LibSingleDatePicker: typeof LibSingleDatePicker;
    attrs: typeof attrs;
    fallbackId: typeof fallbackId;
    date: typeof date;
    isRange: typeof isRange;
}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    "update:modelValue": (value: SingleDate | RangeDate) => any;
}, string, import("vue").PublicProps, Readonly<__VLS_PublicProps> & Readonly<{
    "onUpdate:modelValue"?: ((value: SingleDate | RangeDate) => any) | undefined;
}>, {
    timeZone: string;
    id: string;
    fallbackDate: Date;
    showTime: boolean;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
declare const __VLS_component: import("vue").DefineComponent<__VLS_PublicProps, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    "update:modelValue": (value: SingleDate | RangeDate) => any;
}, string, import("vue").PublicProps, Readonly<__VLS_PublicProps> & Readonly<{
    "onUpdate:modelValue"?: ((value: SingleDate | RangeDate) => any) | undefined;
}>, {
    timeZone: string;
    id: string;
    fallbackDate: Date;
    showTime: boolean;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
declare const _default: __VLS_WithSlots<typeof __VLS_component, __VLS_Slots>;
export default _default;
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
//# sourceMappingURL=LibDatePicker.vue.d.ts.map