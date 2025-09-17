import { type ComputedRef } from "vue";
/** Returns a computed ref that creates aria-label and aria-labelledby with the correct id for labelledby. */
export declare const useAriaLabel: (props: {
    id?: string;
    label?: string;
}, fallbackId?: string) => ComputedRef<Record<string, string | undefined>>;
//# sourceMappingURL=useAriaLabel.d.ts.map