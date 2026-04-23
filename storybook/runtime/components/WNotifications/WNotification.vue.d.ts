import { type HTMLAttributes } from "vue";
import { type NotificationEntry, NotificationHandler } from "../../helpers/NotificationHandler.js";
import type { TailwindClassProp } from "../../types/index.js";
type __VLS_Props = {
    notification: NotificationEntry;
    handler?: NotificationHandler;
} & /** @vue-ignore */ Omit<HTMLAttributes, "class"> & /** @vue-ignore */ TailwindClassProp;
declare var __VLS_1: {
    notification: NotificationEntry;
}, __VLS_3: {
    id: string;
    title: string;
    class: string;
}, __VLS_43: {
    class: string;
    message: string;
};
type __VLS_Slots = {} & {
    top?: (props: typeof __VLS_1) => any;
} & {
    title?: (props: typeof __VLS_3) => any;
} & {
    message?: (props: typeof __VLS_43) => any;
};
declare const __VLS_base: import("vue").DefineComponent<__VLS_Props, {
    focus: () => void;
}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<__VLS_Props> & Readonly<{}>, {
    handler: NotificationHandler;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
declare const __VLS_export: __VLS_WithSlots<typeof __VLS_base, __VLS_Slots>;
declare const _default: typeof __VLS_export;
export default _default;
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
//# sourceMappingURL=WNotification.vue.d.ts.map