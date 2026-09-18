import type { StandardSchemaV1 } from "@standard-schema/spec";
import type { AuthLocalUser } from "../../types/index.js";
type __VLS_Props = {
    id?: string;
    /** List of existing local users. */
    users: AuthLocalUser[];
    /** Optional slot props forwarded from Auth component (which passes some classes). */
    providerButtonsSlotProps?: {
        class: string;
        iconClass: string;
    };
    /**
     * Optional confirmation before showing the create form.
     * Return `false` to cancel.
     */
    onBeforeCreate?: () => boolean | Promise<boolean>;
    /**
     * Username validation schema.
     *
     * @default is the zod schema from @witchcraft/zod-auth (minLength 3, maxLength 32, regex /^[\w.]+$/)
     */
    usernameSchema?: StandardSchemaV1<string>;
};
type __VLS_ModelProps = {
    "username"?: string;
    /** Exposed only so you can reset it if the login fails. */
    "loadingMessage"?: string;
    "hideNonLocalUserProviders"?: boolean;
};
type __VLS_PublicProps = __VLS_Props & __VLS_ModelProps;
declare var __VLS_27: {
    errors: (StandardSchemaV1.Issue | {
        path: string;
        message: string;
    })[];
    id: string;
};
type __VLS_Slots = {} & {
    error?: (props: typeof __VLS_27) => any;
};
declare const __VLS_base: import("vue").DefineComponent<__VLS_PublicProps, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    "update:username": (value: string) => any;
    "update:loadingMessage": (value: string) => any;
    "update:hideNonLocalUserProviders": (value: boolean) => any;
} & {
    login: (user: AuthLocalUser) => any;
    hide: () => any;
    create: (username: string) => any;
    remove: (user: AuthLocalUser) => any;
}, string, import("vue").PublicProps, Readonly<__VLS_PublicProps> & Readonly<{
    onLogin?: ((user: AuthLocalUser) => any) | undefined;
    onHide?: (() => any) | undefined;
    onCreate?: ((username: string) => any) | undefined;
    onRemove?: ((user: AuthLocalUser) => any) | undefined;
    "onUpdate:username"?: ((value: string) => any) | undefined;
    "onUpdate:loadingMessage"?: ((value: string) => any) | undefined;
    "onUpdate:hideNonLocalUserProviders"?: ((value: boolean) => any) | undefined;
}>, {
    providerButtonsSlotProps: {
        class: string;
        iconClass: string;
    };
    onBeforeCreate: () => boolean | Promise<boolean>;
    usernameSchema: StandardSchemaV1<string>;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
declare const __VLS_export: __VLS_WithSlots<typeof __VLS_base, __VLS_Slots>;
declare const _default: typeof __VLS_export;
export default _default;
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
//# sourceMappingURL=WAuthLocalUsers.vue.d.ts.map