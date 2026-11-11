import type { RangeDate, SingleDate } from "../../types/index.js";
declare var __VLS_11: any;
type __VLS_Slots = {} & {
    default?: (props: typeof __VLS_11) => any;
};
declare const __VLS_base: import("vue").DefineComponent<{
    showTime?: boolean;
    /** The fallback suggested date when the modelValue is undefined (it will not update modelValue, it only serves as a suggestions and is used internally in the temporary value). If ignoring the time element, you should probably use the {@link createNoonTodayUtc} function (`createNonTodayUtc().toDate(())`) in the helpers, otherwise `new Date()` (the default) will do. */
    fallbackDate?: Date;
    /** The local user's timezone, defaults to @internationalized/date's getLocalTimeZone(). */
    timeZone?: string;
    /**
     * modelValue can be undefined or an object with start/end undefined, but it must be passed, otherwise we can't tell the difference between a single date and a range date.
     *
     * In the case of an undefined date, the current date at NOON UTC will be used to avoid the date changing.
     *
     * The @internationalized/date library's fromDate function is used internally to convert the date given (should be UTC) to the local time zone. It's converted back via it's toDate function.
     */
    modelValue: SingleDate | RangeDate;
}, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    "update:modelValue": (value: SingleDate | RangeDate) => any;
}, string, import("vue").PublicProps, Readonly<{
    showTime?: boolean;
    /** The fallback suggested date when the modelValue is undefined (it will not update modelValue, it only serves as a suggestions and is used internally in the temporary value). If ignoring the time element, you should probably use the {@link createNoonTodayUtc} function (`createNonTodayUtc().toDate(())`) in the helpers, otherwise `new Date()` (the default) will do. */
    fallbackDate?: Date;
    /** The local user's timezone, defaults to @internationalized/date's getLocalTimeZone(). */
    timeZone?: string;
    /**
     * modelValue can be undefined or an object with start/end undefined, but it must be passed, otherwise we can't tell the difference between a single date and a range date.
     *
     * In the case of an undefined date, the current date at NOON UTC will be used to avoid the date changing.
     *
     * The @internationalized/date library's fromDate function is used internally to convert the date given (should be UTC) to the local time zone. It's converted back via it's toDate function.
     */
    modelValue: SingleDate | RangeDate;
}> & Readonly<{
    "onUpdate:modelValue"?: ((value: SingleDate | RangeDate) => any) | undefined;
}>, {
    fallbackDate: Date;
    timeZone: string;
    showTime: boolean;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
declare const __VLS_export: __VLS_WithSlots<typeof __VLS_base, __VLS_Slots>;
declare const _default: typeof __VLS_export;
export default _default;
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
//# sourceMappingURL=WDatePicker.vue.d.ts.map