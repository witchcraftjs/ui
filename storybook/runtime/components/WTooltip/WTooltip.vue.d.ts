declare var __VLS_20: {}, __VLS_39: {}, __VLS_64: {
    content: string;
};
type __VLS_Slots = {} & {
    default?: (props: typeof __VLS_20) => any;
} & {
    default?: (props: typeof __VLS_39) => any;
} & {
    content?: (props: typeof __VLS_64) => any;
};
declare const __VLS_base: import("vue").DefineComponent<{
    constrainWidthTo?: number | "trigger" | "available" | string | null;
    constrainHeightTo?: number | "trigger" | "available" | string | null;
    delayDuration?: number;
    disabled?: boolean;
    triggerWhileDisabled?: boolean;
    content?: string | import("reka-ui").TooltipContentProps | undefined;
    collisionBoundary?: Element | null;
    to?: string;
    /** Reka's TooltipRoot props */
    rootProps?: any;
    /** Reka's TooltipContent props */
    contentProps?: any;
    skipDelayDuration?: number;
    disableHoverableContent?: boolean;
    disableClosingTrigger?: boolean;
    ignoreNonKeyboardFocus?: boolean;
    key?: PropertyKey | undefined;
    ref?: import("vue").VNodeRef | undefined;
    ref_for?: boolean | undefined;
    ref_key?: string | undefined;
    onVnodeBeforeMount?: (((vnode: import("vue").VNode) => void) | ((vnode: import("vue").VNode) => void)[]) | undefined;
    onVnodeMounted?: (((vnode: import("vue").VNode) => void) | ((vnode: import("vue").VNode) => void)[]) | undefined;
    onVnodeBeforeUpdate?: (((vnode: import("vue").VNode, oldVNode: import("vue").VNode) => void) | ((vnode: import("vue").VNode, oldVNode: import("vue").VNode) => void)[]) | undefined;
    onVnodeUpdated?: (((vnode: import("vue").VNode, oldVNode: import("vue").VNode) => void) | ((vnode: import("vue").VNode, oldVNode: import("vue").VNode) => void)[]) | undefined;
    onVnodeBeforeUnmount?: (((vnode: import("vue").VNode) => void) | ((vnode: import("vue").VNode) => void)[]) | undefined;
    onVnodeUnmounted?: (((vnode: import("vue").VNode) => void) | ((vnode: import("vue").VNode) => void)[]) | undefined;
    class?: unknown;
    style?: unknown;
}, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<{
    constrainWidthTo?: number | "trigger" | "available" | string | null;
    constrainHeightTo?: number | "trigger" | "available" | string | null;
    delayDuration?: number;
    disabled?: boolean;
    triggerWhileDisabled?: boolean;
    content?: string | import("reka-ui").TooltipContentProps | undefined;
    collisionBoundary?: Element | null;
    to?: string;
    /** Reka's TooltipRoot props */
    rootProps?: any;
    /** Reka's TooltipContent props */
    contentProps?: any;
    skipDelayDuration?: number;
    disableHoverableContent?: boolean;
    disableClosingTrigger?: boolean;
    ignoreNonKeyboardFocus?: boolean;
    key?: PropertyKey | undefined;
    ref?: import("vue").VNodeRef | undefined;
    ref_for?: boolean | undefined;
    ref_key?: string | undefined;
    onVnodeBeforeMount?: (((vnode: import("vue").VNode) => void) | ((vnode: import("vue").VNode) => void)[]) | undefined;
    onVnodeMounted?: (((vnode: import("vue").VNode) => void) | ((vnode: import("vue").VNode) => void)[]) | undefined;
    onVnodeBeforeUpdate?: (((vnode: import("vue").VNode, oldVNode: import("vue").VNode) => void) | ((vnode: import("vue").VNode, oldVNode: import("vue").VNode) => void)[]) | undefined;
    onVnodeUpdated?: (((vnode: import("vue").VNode, oldVNode: import("vue").VNode) => void) | ((vnode: import("vue").VNode, oldVNode: import("vue").VNode) => void)[]) | undefined;
    onVnodeBeforeUnmount?: (((vnode: import("vue").VNode) => void) | ((vnode: import("vue").VNode) => void)[]) | undefined;
    onVnodeUnmounted?: (((vnode: import("vue").VNode) => void) | ((vnode: import("vue").VNode) => void)[]) | undefined;
    class?: unknown;
    style?: unknown;
}> & Readonly<{}>, {
    disabled: boolean;
    content: string;
    constrainWidthTo: number | "trigger" | "available" | string | null;
    constrainHeightTo: number | "trigger" | "available" | string | null;
    to: string;
    delayDuration: number;
    triggerWhileDisabled: boolean;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
declare const __VLS_export: __VLS_WithSlots<typeof __VLS_base, __VLS_Slots>;
declare const _default: typeof __VLS_export;
export default _default;
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
//# sourceMappingURL=WTooltip.vue.d.ts.map