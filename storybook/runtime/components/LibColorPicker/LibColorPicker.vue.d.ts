import type { HsvaColor, RgbaColor } from "../../types/index.js";
declare var __VLS_1: {}, __VLS_28: {};
type __VLS_Slots = {} & {
    input?: (props: typeof __VLS_1) => any;
} & {
    buttons?: (props: typeof __VLS_28) => any;
};
declare const __VLS_component: import("vue").DefineComponent<{
    label?: string;
    id?: string | undefined;
    allowAlpha?: boolean;
    /**
     * The precision of the rgba string representation of the color. Defaults to 3. Extra trailing zeros are removed for a prettier number.
     *
     * Does not affect the number saved unless the user manually edits the color.
     *
     * Ignored if `customRepresentation` is set.
     */
    stringPrecision?: number;
    /** Allows overriding the string representation of the color. Useful for using a different representation than rgba (e.g. hex). The fromStringToHsva part is rarely needed as the colorjs.io library can normally parse the color. Returning undefined signals an error. */
    customRepresentation?: {
        fromHsvaToString: (hsva: HsvaColor, includeAlpha: boolean) => string;
        fromStringToHsva?: (string: string) => HsvaColor | undefined;
    };
    border?: boolean;
    /** Modify what the user copies to the clipboard. */
    copyTransform?: (val: HsvaColor, stringVal: string) => any;
    valid?: boolean;
    modelValue?: RgbaColor;
    tempValue?: RgbaColor | undefined;
    color?: string | undefined | undefined;
    dir?: string | undefined | undefined;
    class?: any;
    prefix?: string | undefined | undefined;
    style?: import("vue").StyleValue;
    title?: string | undefined | undefined;
    tabindex?: (string | number) | undefined;
    innerHTML?: string | undefined | undefined;
    accesskey?: string | undefined | undefined;
    contenteditable?: (boolean | "true" | "false") | "inherit" | "plaintext-only" | undefined;
    contextmenu?: string | undefined | undefined;
    draggable?: (boolean | "true" | "false") | undefined;
    hidden?: "" | "hidden" | (boolean | "true" | "false") | "until-found" | undefined;
    inert?: (boolean | "true" | "false") | undefined;
    lang?: string | undefined | undefined;
    placeholder?: string | undefined | undefined;
    spellcheck?: (boolean | "true" | "false") | undefined;
    translate?: "yes" | "no" | undefined | undefined;
    radiogroup?: string | undefined | undefined;
    role?: string | undefined | undefined;
    about?: string | undefined | undefined;
    datatype?: string | undefined | undefined;
    inlist?: any;
    property?: string | undefined | undefined;
    resource?: string | undefined | undefined;
    typeof?: string | undefined | undefined;
    vocab?: string | undefined | undefined;
    autocapitalize?: string | undefined | undefined;
    autocorrect?: string | undefined | undefined;
    autosave?: string | undefined | undefined;
    itemprop?: string | undefined | undefined;
    itemscope?: (boolean | "true" | "false") | undefined;
    itemtype?: string | undefined | undefined;
    itemid?: string | undefined | undefined;
    itemref?: string | undefined | undefined;
    results?: (string | number) | undefined;
    security?: string | undefined | undefined;
    unselectable?: "on" | "off" | undefined | undefined;
    inputmode?: "none" | "text" | "tel" | "url" | "email" | "numeric" | "decimal" | "search" | undefined | undefined;
    is?: string | undefined | undefined;
    'aria-activedescendant'?: string | undefined | undefined;
    'aria-atomic'?: (boolean | "true" | "false") | undefined;
    'aria-autocomplete'?: "none" | "inline" | "list" | "both" | undefined | undefined;
    'aria-busy'?: (boolean | "true" | "false") | undefined;
    'aria-checked'?: (boolean | "true" | "false") | "mixed" | undefined;
    'aria-colcount'?: (string | number) | undefined;
    'aria-colindex'?: (string | number) | undefined;
    'aria-colspan'?: (string | number) | undefined;
    'aria-controls'?: string | undefined | undefined;
    'aria-current'?: "time" | (boolean | "true" | "false") | "page" | "step" | "location" | "date" | undefined;
    'aria-describedby'?: string | undefined | undefined;
    'aria-details'?: string | undefined | undefined;
    'aria-disabled'?: (boolean | "true" | "false") | undefined;
    'aria-dropeffect'?: "none" | "copy" | "execute" | "link" | "move" | "popup" | undefined | undefined;
    'aria-errormessage'?: string | undefined | undefined;
    'aria-expanded'?: (boolean | "true" | "false") | undefined;
    'aria-flowto'?: string | undefined | undefined;
    'aria-grabbed'?: (boolean | "true" | "false") | undefined;
    'aria-haspopup'?: "dialog" | "menu" | (boolean | "true" | "false") | "listbox" | "tree" | "grid" | undefined;
    'aria-hidden'?: (boolean | "true" | "false") | undefined;
    'aria-invalid'?: (boolean | "true" | "false") | "grammar" | "spelling" | undefined;
    'aria-keyshortcuts'?: string | undefined | undefined;
    'aria-label'?: string | undefined | undefined;
    'aria-labelledby'?: string | undefined | undefined;
    'aria-level'?: (string | number) | undefined;
    'aria-live'?: "off" | "assertive" | "polite" | undefined | undefined;
    'aria-modal'?: (boolean | "true" | "false") | undefined;
    'aria-multiline'?: (boolean | "true" | "false") | undefined;
    'aria-multiselectable'?: (boolean | "true" | "false") | undefined;
    'aria-orientation'?: "horizontal" | "vertical" | undefined | undefined;
    'aria-owns'?: string | undefined | undefined;
    'aria-placeholder'?: string | undefined | undefined;
    'aria-posinset'?: (string | number) | undefined;
    'aria-pressed'?: (boolean | "true" | "false") | "mixed" | undefined;
    'aria-readonly'?: (boolean | "true" | "false") | undefined;
    'aria-relevant'?: "additions" | "additions removals" | "additions text" | "all" | "removals" | "removals additions" | "removals text" | "text" | "text additions" | "text removals" | undefined | undefined;
    'aria-required'?: (boolean | "true" | "false") | undefined;
    'aria-roledescription'?: string | undefined | undefined;
    'aria-rowcount'?: (string | number) | undefined;
    'aria-rowindex'?: (string | number) | undefined;
    'aria-rowspan'?: (string | number) | undefined;
    'aria-selected'?: (boolean | "true" | "false") | undefined;
    'aria-setsize'?: (string | number) | undefined;
    'aria-sort'?: "none" | "ascending" | "descending" | "other" | undefined | undefined;
    'aria-valuemax'?: (string | number) | undefined;
    'aria-valuemin'?: (string | number) | undefined;
    'aria-valuenow'?: (string | number) | undefined;
    'aria-valuetext'?: string | undefined | undefined;
    "aria-description"?: string | undefined;
    key?: PropertyKey | undefined;
    ref?: import("vue").VNodeRef | undefined;
    ref_for?: boolean | undefined | undefined;
    ref_key?: string | undefined | undefined;
}, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    "update:modelValue": (value: RgbaColor) => any;
    "update:tempValue": (value: RgbaColor | undefined) => any;
} & {
    save: (val: RgbaColor) => any;
    cancel: () => any;
}, string, import("vue").PublicProps, Readonly<{
    label?: string;
    id?: string | undefined;
    allowAlpha?: boolean;
    /**
     * The precision of the rgba string representation of the color. Defaults to 3. Extra trailing zeros are removed for a prettier number.
     *
     * Does not affect the number saved unless the user manually edits the color.
     *
     * Ignored if `customRepresentation` is set.
     */
    stringPrecision?: number;
    /** Allows overriding the string representation of the color. Useful for using a different representation than rgba (e.g. hex). The fromStringToHsva part is rarely needed as the colorjs.io library can normally parse the color. Returning undefined signals an error. */
    customRepresentation?: {
        fromHsvaToString: (hsva: HsvaColor, includeAlpha: boolean) => string;
        fromStringToHsva?: (string: string) => HsvaColor | undefined;
    };
    border?: boolean;
    /** Modify what the user copies to the clipboard. */
    copyTransform?: (val: HsvaColor, stringVal: string) => any;
    valid?: boolean;
    modelValue?: RgbaColor;
    tempValue?: RgbaColor | undefined;
    color?: string | undefined | undefined;
    dir?: string | undefined | undefined;
    class?: any;
    prefix?: string | undefined | undefined;
    style?: import("vue").StyleValue;
    title?: string | undefined | undefined;
    tabindex?: (string | number) | undefined;
    innerHTML?: string | undefined | undefined;
    accesskey?: string | undefined | undefined;
    contenteditable?: (boolean | "true" | "false") | "inherit" | "plaintext-only" | undefined;
    contextmenu?: string | undefined | undefined;
    draggable?: (boolean | "true" | "false") | undefined;
    hidden?: "" | "hidden" | (boolean | "true" | "false") | "until-found" | undefined;
    inert?: (boolean | "true" | "false") | undefined;
    lang?: string | undefined | undefined;
    placeholder?: string | undefined | undefined;
    spellcheck?: (boolean | "true" | "false") | undefined;
    translate?: "yes" | "no" | undefined | undefined;
    radiogroup?: string | undefined | undefined;
    role?: string | undefined | undefined;
    about?: string | undefined | undefined;
    datatype?: string | undefined | undefined;
    inlist?: any;
    property?: string | undefined | undefined;
    resource?: string | undefined | undefined;
    typeof?: string | undefined | undefined;
    vocab?: string | undefined | undefined;
    autocapitalize?: string | undefined | undefined;
    autocorrect?: string | undefined | undefined;
    autosave?: string | undefined | undefined;
    itemprop?: string | undefined | undefined;
    itemscope?: (boolean | "true" | "false") | undefined;
    itemtype?: string | undefined | undefined;
    itemid?: string | undefined | undefined;
    itemref?: string | undefined | undefined;
    results?: (string | number) | undefined;
    security?: string | undefined | undefined;
    unselectable?: "on" | "off" | undefined | undefined;
    inputmode?: "none" | "text" | "tel" | "url" | "email" | "numeric" | "decimal" | "search" | undefined | undefined;
    is?: string | undefined | undefined;
    'aria-activedescendant'?: string | undefined | undefined;
    'aria-atomic'?: (boolean | "true" | "false") | undefined;
    'aria-autocomplete'?: "none" | "inline" | "list" | "both" | undefined | undefined;
    'aria-busy'?: (boolean | "true" | "false") | undefined;
    'aria-checked'?: (boolean | "true" | "false") | "mixed" | undefined;
    'aria-colcount'?: (string | number) | undefined;
    'aria-colindex'?: (string | number) | undefined;
    'aria-colspan'?: (string | number) | undefined;
    'aria-controls'?: string | undefined | undefined;
    'aria-current'?: "time" | (boolean | "true" | "false") | "page" | "step" | "location" | "date" | undefined;
    'aria-describedby'?: string | undefined | undefined;
    'aria-details'?: string | undefined | undefined;
    'aria-disabled'?: (boolean | "true" | "false") | undefined;
    'aria-dropeffect'?: "none" | "copy" | "execute" | "link" | "move" | "popup" | undefined | undefined;
    'aria-errormessage'?: string | undefined | undefined;
    'aria-expanded'?: (boolean | "true" | "false") | undefined;
    'aria-flowto'?: string | undefined | undefined;
    'aria-grabbed'?: (boolean | "true" | "false") | undefined;
    'aria-haspopup'?: "dialog" | "menu" | (boolean | "true" | "false") | "listbox" | "tree" | "grid" | undefined;
    'aria-hidden'?: (boolean | "true" | "false") | undefined;
    'aria-invalid'?: (boolean | "true" | "false") | "grammar" | "spelling" | undefined;
    'aria-keyshortcuts'?: string | undefined | undefined;
    'aria-label'?: string | undefined | undefined;
    'aria-labelledby'?: string | undefined | undefined;
    'aria-level'?: (string | number) | undefined;
    'aria-live'?: "off" | "assertive" | "polite" | undefined | undefined;
    'aria-modal'?: (boolean | "true" | "false") | undefined;
    'aria-multiline'?: (boolean | "true" | "false") | undefined;
    'aria-multiselectable'?: (boolean | "true" | "false") | undefined;
    'aria-orientation'?: "horizontal" | "vertical" | undefined | undefined;
    'aria-owns'?: string | undefined | undefined;
    'aria-placeholder'?: string | undefined | undefined;
    'aria-posinset'?: (string | number) | undefined;
    'aria-pressed'?: (boolean | "true" | "false") | "mixed" | undefined;
    'aria-readonly'?: (boolean | "true" | "false") | undefined;
    'aria-relevant'?: "additions" | "additions removals" | "additions text" | "all" | "removals" | "removals additions" | "removals text" | "text" | "text additions" | "text removals" | undefined | undefined;
    'aria-required'?: (boolean | "true" | "false") | undefined;
    'aria-roledescription'?: string | undefined | undefined;
    'aria-rowcount'?: (string | number) | undefined;
    'aria-rowindex'?: (string | number) | undefined;
    'aria-rowspan'?: (string | number) | undefined;
    'aria-selected'?: (boolean | "true" | "false") | undefined;
    'aria-setsize'?: (string | number) | undefined;
    'aria-sort'?: "none" | "ascending" | "descending" | "other" | undefined | undefined;
    'aria-valuemax'?: (string | number) | undefined;
    'aria-valuemin'?: (string | number) | undefined;
    'aria-valuenow'?: (string | number) | undefined;
    'aria-valuetext'?: string | undefined | undefined;
    "aria-description"?: string | undefined;
    key?: PropertyKey | undefined;
    ref?: import("vue").VNodeRef | undefined;
    ref_for?: boolean | undefined | undefined;
    ref_key?: string | undefined | undefined;
}> & Readonly<{
    "onUpdate:modelValue"?: ((value: RgbaColor) => any) | undefined;
    onSave?: ((val: RgbaColor) => any) | undefined;
    onCancel?: (() => any) | undefined;
    "onUpdate:tempValue"?: ((value: RgbaColor | undefined) => any) | undefined;
}>, {
    border: boolean;
    valid: boolean;
    allowAlpha: boolean;
    stringPrecision: number;
    customRepresentation: {
        fromHsvaToString: (hsva: HsvaColor, includeAlpha: boolean) => string;
        fromStringToHsva?: (string: string) => HsvaColor | undefined;
    };
    copyTransform: (val: HsvaColor, stringVal: string) => any;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
declare const _default: __VLS_WithSlots<typeof __VLS_component, __VLS_Slots>;
export default _default;
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
//# sourceMappingURL=LibColorPicker.vue.d.ts.map