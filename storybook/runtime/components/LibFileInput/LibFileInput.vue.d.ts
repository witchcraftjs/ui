import { type HTMLAttributes, type InputHTMLAttributes } from "vue";
import type { FileInputError } from "../../types/index.js";
import { type LinkableByIdProps, type TailwindClassProp, type WrapperProps } from "../shared/props.js";
declare const _default: __VLS_WithSlots<import("vue").DefineComponent<Props, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {} & {
    input: (val: File[]) => any;
    errors: (val: FileInputError[]) => any;
}, string, import("vue").PublicProps, Readonly<Props> & Readonly<{
    onInput?: ((val: File[]) => any) | undefined;
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
export default _default;
type WrapperTypes = WrapperProps<"input", InputHTMLAttributes> & WrapperProps<"wrapper", HTMLAttributes> & WrapperProps<"previews", HTMLAttributes>;
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
Partial<Omit<InputHTMLAttributes, "class" | "multiple" | "formats" | "compact"> & TailwindClassProp>, 
/** @vue-ignore */
Partial<WrapperTypes>, RealProps {
}
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
//# sourceMappingURL=LibFileInput.vue.d.ts.map