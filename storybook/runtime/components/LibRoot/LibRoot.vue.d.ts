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
declare var __VLS_9: {};
type __VLS_Slots = {} & {
    default?: (props: typeof __VLS_9) => any;
};
declare const __VLS_component: import("vue").DefineComponent<__VLS_Props, {
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
declare const _default: __VLS_WithSlots<typeof __VLS_component, __VLS_Slots>;
export default _default;
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
//# sourceMappingURL=LibRoot.vue.d.ts.map