import { type Ref } from "vue";
/**
 * @deprecated Use `useSetupDarkMode` instead.
 *
 * A composable for setting up dark mode that automatically takes care of saving the user's preference.
 *
 * See the returned utilities for more details.
 *
 * It also provides injection keys with a ref so it can be accessed in deep nested components if needed. Alternatively you can use `useInjectedDarkMode` for ease of use.
 *
 * Note that this should only be called once at the root of the app.
 */
export declare const useDarkMode: ({ useLocalStorage, darkModeOrder, isClientSide, useViewTransition }?: DarkModeOptions) => DarkModeState & DarkModeCommands;
export declare const defaultDarkModeOrder: readonly ["system", "dark", "light"];
export type DarkModeOptions = {
    useLocalStorage?: boolean | string;
    darkModeOrder?: readonly ("system" | "dark" | "light")[];
    /** True by default, should be passed import.meta.client if using nuxt, or false when running server side. */
    isClientSide?: boolean;
    /**
     * Whether to use the view transition to animate the dark mode switch (you just need to add the css).
     *
     * Note that the transitition is NOT triggered if visually the mode does not change (e.g. system mode is dark and the user switches from system to dark, visually nothing changes so transitioning is skipped).
     *
     * There is an example in storybook. But basically:
     *
     * ```css
     *
     * #root { // the dark mode switcher works on the WRoot component not the html root
     *		view-transition-name: wroot;
     *		height: 100dvh;
     *		padding: 0;
     *	}
     *
     * ::view-transition-new(wroot) {
     * 	animation: grow var(--story-anim-length) ease-in-out;
     * 	animation-fill-mode: both;
     * 	z-index: 2;
     * 	mask: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40"><circle cx="20" cy="20" r="20" fill="white"/></svg>') center / 0 no-repeat;
     * }
     *
     * ::view-transition-old(wroot) {
     * 	animation: none;
     * 	animation-fill-mode: both;
     * 	z-index: 1;
     * }
     *
     * @keyframes grow {
     * 	from {
     * 		mask-size: 0dvw;
     * 	}
     * 	to {
     * 		mask-size: 300dvw;
     * 	}
     * }
     * ```
     *
     * See https://theme-toggle.rdsx.dev/ for more ideas.
     *
     * @default true
     */
    useViewTransition?: boolean;
};
export interface DarkModeCommands {
    setDarkMode: (value: "dark" | "light" | "system") => void;
    cycleDarkMode: () => void;
}
export interface DarkModeState {
    /** Whether the dark mode should be enabled or not */
    darkMode: Ref<boolean>;
    /** The current state of the darkMode but as a string (dark, light, system) */
    darkModeState: Ref<"dark" | "light" | "system">;
    /** The value of the manuably controllable dark mode. You can set this to true/false or undefined to allow the systemDarkMode to take priority. Alternatively use setDarkMode instead. */
    manualDarkMode: Ref<boolean | undefined>;
    /** The value of the system dark mode. This is automatically set depending on the user's `prefer-color-scheme` and should not be set directly. */
    systemDarkMode: Ref<boolean>;
}
//# sourceMappingURL=useDarkMode.d.ts.map