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
declare const _default: import("vue").DefineComponent<Props, {
    focus: () => void;
}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<Props> & Readonly<{}>, {
    handler: NotificationHandler;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
export default _default;
//# sourceMappingURL=LibNotification.vue.d.ts.map