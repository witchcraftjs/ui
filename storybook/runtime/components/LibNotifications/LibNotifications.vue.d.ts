import { type HTMLAttributes } from "vue";
import { NotificationHandler } from "../../helpers/NotificationHandler.js";
import type { LinkableByIdProps, TailwindClassProp } from "../shared/props.js";
type RealProps = LinkableByIdProps & {
    handler: NotificationHandler;
};
interface Props extends 
/** @vue-ignore */
Partial<Omit<HTMLAttributes, "class"> & TailwindClassProp>, RealProps {
}
declare const _default: import("vue").DefineComponent<Props, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<Props> & Readonly<{}>, {}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
export default _default;
//# sourceMappingURL=LibNotifications.vue.d.ts.map