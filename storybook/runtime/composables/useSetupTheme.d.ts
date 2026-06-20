import type { Theme } from "metamorphosis/Theme";
import { type Ref, type ShallowRef } from "vue";
/**
 * Sets up and provides a Metamorphosis theme via injection.
 *
 * Attaches the theme to the given element ref and listens for theme changes.
 * Call this once at the root of the app.
 *
 * Use `useInjectedTheme` to access the injected theme in child components.
 */
export declare function useSetupTheme({ props, attachElement, isClientSide }: {
    /** Props with optional theme prop to use as theme. If theme prop is not provided, the default theme is used. Mark it raw to avoid Vue proxying it. */
    props: {
        theme?: Theme<any>;
    };
    /** Ref to the DOM element that the theme will attach to. */
    attachElement: Ref<HTMLElement | null>;
    /** Whether we're running on the client. */
    isClientSide?: boolean;
}): ShallowRef<Theme<any>>;
//# sourceMappingURL=useSetupTheme.d.ts.map