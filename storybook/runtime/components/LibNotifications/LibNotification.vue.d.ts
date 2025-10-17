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
declare const _default: __VLS_WithSlots<import("vue").DefineComponent<Props, {
    focus: () => void;
}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<Props> & Readonly<{}>, {
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
export default _default;
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
//# sourceMappingURL=LibNotification.vue.d.ts.map