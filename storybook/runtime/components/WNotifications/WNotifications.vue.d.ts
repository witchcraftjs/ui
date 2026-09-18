import type { HTMLAttributes } from "vue";
import { NotificationHandler } from "../../helpers/NotificationHandler.js";
import type { TailwindClassProp } from "../../types/index.js";
type __VLS_Props = {
    /** If not provided, uses the global handler (this requires useNotificationHandler be called and configured). */
    handler?: NotificationHandler;
    progressUpdateInterval?: number;
} & /** @vue-ignore */ Omit<HTMLAttributes, "class"> & /** @vue-ignore */ TailwindClassProp;
declare const __VLS_export: import("vue").DefineComponent<__VLS_Props, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<__VLS_Props> & Readonly<{}>, {}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
declare const _default: typeof __VLS_export;
export default _default;
//# sourceMappingURL=WNotifications.vue.d.ts.map