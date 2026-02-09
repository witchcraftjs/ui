import { type HTMLAttributes, type InputHTMLAttributes } from "vue";
import type { FileInputError } from "../../types/index.js";
import { type LinkableByIdProps, type TailwindClassProp, type WrapperProps } from "../shared/props.js";
declare const _default: typeof __VLS_export;
export default _default;
type WrapperTypes = WrapperProps<"input", Omit<InputHTMLAttributes, "autocomplete">> & WrapperProps<"wrapper", HTMLAttributes> & WrapperProps<"previews", HTMLAttributes>;
type RealProps = LinkableByIdProps & {
    multiple?: boolean;
    /**
     * A list of extensions or mime types to add to the input's accept. Basic validations are done so that files match an extension and mimeType, but note that a file could still be lying, all files should be validated server side.
     *
     * Pass an empty array to allow any filetype.
     */
    formats?: string[];
    compact?: boolean;
};
interface Props extends 
/** @vue-ignore */
Partial<Omit<InputHTMLAttributes, "class" | "multiple" | "formats" | "compact" | "autocomplete"> & TailwindClassProp>, 
/** @vue-ignore */
Partial<WrapperTypes>, RealProps {
}
declare const __VLS_export: __VLS_WithSlots<import("vue").DefineComponent<Props, {
    clearFiles: () => void;
}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {} & {
    input: (val: File[], clearFiles: () => void) => any;
    errors: (val: FileInputError[]) => any;
}, string, import("vue").PublicProps, Readonly<Props> & Readonly<{
    onInput?: ((val: File[], clearFiles: () => void) => any) | undefined;
    onErrors?: ((val: FileInputError[]) => any) | undefined;
}>, {
    multiple: boolean;
    formats: string[];
    compact: boolean;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>, {
    icon?: (props: {}) => any;
} & {
    label?: (props: {}) => any;
} & {
    formats?: (props: {}) => any;
}>;
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
//# sourceMappingURL=LibFileInput.vue.d.ts.map