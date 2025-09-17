import { type InjectionKey, type Ref } from "vue";
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
export declare const useDarkMode: ({ useLocalStorage, darkModeOrder, isClientSide }?: DarkModeOptions) => DarkModeState & DarkModeCommands;
export declare const defaultDarkModeOrder: readonly ["system", "dark", "light"];
export declare const isDarkModeInjectionKey: InjectionKey<Ref<boolean, boolean>>;
export declare const manualDarkModeInjectionKey: InjectionKey<Ref<boolean | undefined, boolean | undefined>>;
export declare const darkModeCommandsInjectionKey: InjectionKey<DarkModeCommands>;
export declare const darkModeStateInjectionKey: InjectionKey<DarkModeState>;
export type DarkModeOptions = {
    useLocalStorage?: boolean | string;
    darkModeOrder?: readonly ("system" | "dark" | "light")[];
    /** True by default, should be passed import.meta.client if using nuxt, or false when running server side. */
    isClientSide?: boolean;
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