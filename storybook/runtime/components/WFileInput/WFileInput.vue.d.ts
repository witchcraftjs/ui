import type { HTMLAttributes, InputHTMLAttributes } from "vue";
import type { FileInputError, TailwindClassProp } from "../../types/index.js";
declare function clearFiles(): void;
declare function clearErrors(): void;
declare var __VLS_1: {}, __VLS_14: {}, __VLS_16: {};
type __VLS_Slots = {} & {
    icon?: (props: typeof __VLS_1) => any;
} & {
    label?: (props: typeof __VLS_14) => any;
} & {
    formats?: (props: typeof __VLS_16) => any;
};
declare const __VLS_base: import("vue").DefineComponent<{
    id?: string;
    multiple?: boolean;
    /**
     * A list of extensions or mime types to add to the input's accept. Basic validations are done so that files match an extension and mimeType, but note that a file could still be lying, all files should be validated server side.
     *
     * Pass an empty array to allow any filetype.
     */
    formats?: string[];
    compact?: boolean;
    inputAttrs?: Omit<InputHTMLAttributes, "class"> & TailwindClassProp;
    wrapperAttrs?: Omit<HTMLAttributes, "class"> & TailwindClassProp;
}, {
    clearFiles: typeof clearFiles;
    clearErrors: typeof clearErrors;
}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {} & {
    input: (val: File[], clearFiles: () => void) => any;
    errors: (val: FileInputError[], clearErrors: () => void) => any;
}, string, import("vue").PublicProps, Readonly<{
    id?: string;
    multiple?: boolean;
    /**
     * A list of extensions or mime types to add to the input's accept. Basic validations are done so that files match an extension and mimeType, but note that a file could still be lying, all files should be validated server side.
     *
     * Pass an empty array to allow any filetype.
     */
    formats?: string[];
    compact?: boolean;
    inputAttrs?: Omit<InputHTMLAttributes, "class"> & TailwindClassProp;
    wrapperAttrs?: Omit<HTMLAttributes, "class"> & TailwindClassProp;
}> & Readonly<{
    onInput?: ((val: File[], clearFiles: () => void) => any) | undefined;
    onErrors?: ((val: FileInputError[], clearErrors: () => void) => any) | undefined;
}>, {
    multiple: boolean;
    compact: boolean;
    formats: string[];
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
declare const __VLS_export: __VLS_WithSlots<typeof __VLS_base, __VLS_Slots>;
declare const _default: typeof __VLS_export;
export default _default;
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
//# sourceMappingURL=WFileInput.vue.d.ts.map