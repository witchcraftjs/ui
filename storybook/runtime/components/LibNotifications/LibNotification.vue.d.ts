import { type HTMLAttributes } from "vue";
import { type NotificationEntry, NotificationHandler } from "../../helpers/NotificationHandler.js";
import type { TailwindClassProp } from "../shared/props.js";
type RealProps = {
    notification: NotificationEntry;
    handler?: NotificationHandler;
};
interface Props extends 
/** @vue-ignore */
Partial<Omit<HTMLAttributes, "class"> & TailwindClassProp>, RealProps {
}
declare const _default: typeof __VLS_export;
export default _default;
declare const __VLS_export: __VLS_WithSlots<import("vue").DefineComponent<Props, {
    focus: () => void;
}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {} & {
    pause: (notification: NotificationEntry) => any;
    resume: (notification: NotificationEntry) => any;
}, string, import("vue").PublicProps, Readonly<Props> & Readonly<{
    onPause?: ((notification: NotificationEntry) => any) | undefined;
    onResume?: ((notification: NotificationEntry) => any) | undefined;
}>, {
    handler: NotificationHandler;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>, {
    top?: (props: {
        notification: NotificationEntry;
    }) => any;
} & {
    title?: (props: {
        title: string;
        class: string;
        tabindex: number;
    }) => any;
} & {
    message?: (props: {
        class: string;
        message: string;
        tabindex: number;
    }) => any;
}>;
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
//# sourceMappingURL=LibNotification.vue.d.ts.map