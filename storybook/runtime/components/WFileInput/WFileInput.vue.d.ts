import type { StandardSchemaV1 } from "@standard-schema/spec";
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
    /**
     * Optional standard-schema validator for the selected files.
     *
     * Note that because schemas can be async, the emits will be async and input errors might show visually before @errors emits. This is so you only get one possible error emit per change, instead of possibly two, one sync and one async.
     *
     * Additionally, clearErrors cannot clear the validation errors. You must clear files so the component stops trying to validate them.
     *
     * @example z.array(z.instanceof(File).refine(f => f.size < 10_000_000))
     */
    schema?: StandardSchemaV1<File[]>;
    inputAttrs?: Omit<InputHTMLAttributes, "class" | "autocomplete"> & TailwindClassProp;
    wrapperAttrs?: Omit<HTMLAttributes, "class"> & TailwindClassProp;
    /**
     * The component uses createObjectURL internally to preview files. This can be dangerous for some mime types (e.g. SVG). The default setting for this prop only allows previewing:
     * ["image/jpeg", "image/jpg", "image/png", "image/gif", "image/webp", "image/bmp", "image/x-icon", "image/vnd.microsoft.icon", "image/apng", "image/avif", "image/jxl"]
     *
     * But if you know what you're doing, you can pass a custom list or further limit the existing one.
     */
    safeToPreviewMimeTypes?: string[];
}, {
    clearFiles: typeof clearFiles;
    clearErrors: typeof clearErrors;
}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {} & {
    input: (val: File[], clearFiles: () => void) => any;
    errors: (val: FileInputError[], clearErrors: () => void, clearFiles: () => void) => any;
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
    /**
     * Optional standard-schema validator for the selected files.
     *
     * Note that because schemas can be async, the emits will be async and input errors might show visually before @errors emits. This is so you only get one possible error emit per change, instead of possibly two, one sync and one async.
     *
     * Additionally, clearErrors cannot clear the validation errors. You must clear files so the component stops trying to validate them.
     *
     * @example z.array(z.instanceof(File).refine(f => f.size < 10_000_000))
     */
    schema?: StandardSchemaV1<File[]>;
    inputAttrs?: Omit<InputHTMLAttributes, "class" | "autocomplete"> & TailwindClassProp;
    wrapperAttrs?: Omit<HTMLAttributes, "class"> & TailwindClassProp;
    /**
     * The component uses createObjectURL internally to preview files. This can be dangerous for some mime types (e.g. SVG). The default setting for this prop only allows previewing:
     * ["image/jpeg", "image/jpg", "image/png", "image/gif", "image/webp", "image/bmp", "image/x-icon", "image/vnd.microsoft.icon", "image/apng", "image/avif", "image/jxl"]
     *
     * But if you know what you're doing, you can pass a custom list or further limit the existing one.
     */
    safeToPreviewMimeTypes?: string[];
}> & Readonly<{
    onInput?: ((val: File[], clearFiles: () => void) => any) | undefined;
    onErrors?: ((val: FileInputError[], clearErrors: () => void, clearFiles: () => void) => any) | undefined;
}>, {
    multiple: boolean;
    compact: boolean;
    formats: string[];
    safeToPreviewMimeTypes: string[];
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