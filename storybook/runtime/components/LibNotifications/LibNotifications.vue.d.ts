import { NotificationHandler } from "../../helpers/NotificationHandler.js";
import type { LinkableByIdProps, TailwindClassProp } from "../shared/props.js";
import type { HTMLAttributes } from "vue";
type RealProps = LinkableByIdProps & {
    /** If not provided, uses the global handler (this requires useNotificationHandler be called and configured). */
    handler?: NotificationHandler;
    progressUpdateInterval?: number;
};
interface Props extends 
/** @vue-ignore */
Partial<Omit<HTMLAttributes, "class"> & TailwindClassProp>, RealProps {
}
declare const _default: typeof __VLS_export;
export default _default;
declare const __VLS_export: import("vue").DefineComponent<Props, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<Props> & Readonly<{}>, {}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
//# sourceMappingURL=LibNotifications.vue.d.ts.map