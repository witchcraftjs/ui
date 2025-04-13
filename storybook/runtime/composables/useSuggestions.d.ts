import { type Ref } from "vue";
import { type SuggestionsEmits, type SuggestionsOptions } from "../components/shared/props.js";
/**
 * The logic for the suggestions component.
 *
 * Note that while object suggestions are supported, the `suggestionLabel` prop is required and $inputModel and $modelValue will still be string values (as returned by the suggestionLabel function).
 */
export declare function useSuggestions<TSuggestion>($inputValue: Ref<string>, $modelValue: Ref<string>, emit: SuggestionsEmits, opts: SuggestionsOptions<TSuggestion>, debug?: boolean): {
    list: import("vue").ComputedRef<any[] | undefined>;
    filtered: import("vue").ComputedRef<any[] | undefined>;
    active: Ref<number, number>;
    available: import("vue").ComputedRef<boolean>;
    moreThanOneAvailable: import("vue").ComputedRef<boolean>;
    hasExactlyMatching: import("vue").ComputedRef<TSuggestion | undefined>;
    /** Whether there is a valid suggestion that can be submitted. If `restrictToSuggestions` is true, this will be true if isValid is true, otherwise this is considered to be true if suggestions are available. */
    hasValidSuggestion: import("vue").ComputedRef<boolean>;
    openable: import("vue").ComputedRef<boolean | undefined>;
    getLabel: (item: any) => string;
    isOpen: Ref<boolean, boolean>;
    open: () => void;
    close: () => void;
    enterSelected: () => void;
    enterSuggestion: (num: number) => void;
    toggle: () => void;
    cancel: () => void;
    select: (num: number) => void;
    prev: () => void;
    next: () => void;
    first: () => void;
    last: () => void;
};
export declare function useSuggestionsInputAria(id: Ref<string>, isOpen: Ref<boolean>, activeSuggestion: Ref<number>, suggestions: Ref<any | undefined>): import("vue").ComputedRef<{
    "aria-autocomplete": "both" | undefined;
    "aria-controls": string | undefined;
    role: string | undefined;
    "aria-expanded": boolean | undefined;
    "aria-activedescendant": string | undefined;
}>;
//# sourceMappingURL=useSuggestions.d.ts.map