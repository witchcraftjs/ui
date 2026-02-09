import type { Theme } from "metamorphosis";
import { NotificationHandler } from "../../helpers/NotificationHandler.js";
type __VLS_Props = {
    theme?: Theme;
    outline?: boolean;
    forceOutline?: boolean;
    testWrapperMode?: boolean;
    id?: string;
    /** You can set a ref to the root element by passing :getRef="_ => el = _" */
    getRef?: (el: HTMLElement | null) => void;
    /** True by default, should be passed import.meta.client if using nuxt, or false when running server side. */
    isClientSide?: boolean;
    useBuiltinTranslations?: boolean;
    useNotifications?: boolean;
    notificationHandler?: NotificationHandler;
};
declare var __VLS_11: {};
type __VLS_Slots = {} & {
    default?: (props: typeof __VLS_11) => any;
};
declare const __VLS_base: import("vue").DefineComponent<__VLS_Props, {
    darkMode: import("../../composables/useDarkMode.js").DarkModeState & import("../../composables/useDarkMode.js").DarkModeCommands;
}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<__VLS_Props> & Readonly<{}>, {
    theme: Theme;
    isClientSide: boolean;
    useBuiltinTranslations: boolean;
    id: string;
    outline: boolean;
    forceOutline: boolean;
    testWrapperMode: boolean;
    getRef: (el: HTMLElement | null) => void;
    useNotifications: boolean;
    notificationHandler: NotificationHandler;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
declare const __VLS_export: __VLS_WithSlots<typeof __VLS_base, __VLS_Slots>;
declare const _default: typeof __VLS_export;
export default _default;
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
//# sourceMappingURL=LibRoot.vue.d.ts.map