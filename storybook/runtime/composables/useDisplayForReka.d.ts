import type { AcceptableValue, ComboboxRootProps } from "reka-ui";
export type SuggestionsDisplayProps<T extends NonNullable<AcceptableValue>> = {
    displayKey?: string;
    /**
     * Override's reka-ui's displayValue.
     *
     * Prefer displayKey or displayEntry if possible as it's easier to type and requires less code.
     *
     * It's passed a special options object with a `isForEmit` boolean that tells you whether the value will be used for emits or just visually/search. This is useful to v-model an id when suggestions are objects.
     */
    displayValue?: (value: T | T[], options?: {
        isForEmit?: boolean;
    }) => string;
    /**
     * When displayKey is not enough, prefer this over displayValue as it takes care of extracting the entry (from the array/object/value).
     *
     * The component uses this to filter out the suggestions. In some rare cases you might want to display a different label than the one filtered on (e.g. for example, to indicate some suggestion is active), in these cases, the function will be called with the visualOnly option set to true. This applies only to the visual suggestion in the suggestion list.
     */
    displayEntry?: (value: T, options: {
        isForEmit?: boolean;
    }) => string;
};
export declare function useDisplayForReka<T extends NonNullable<ComboboxRootProps["modelValue"]>>(props: SuggestionsDisplayProps<T>): (value: T, options?: {
    isForEmit?: boolean;
}) => string;
//# sourceMappingURL=useDisplayForReka.d.ts.map