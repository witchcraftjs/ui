import { type HTMLAttributes } from "vue";
import { type BaseInteractiveProps, type LabelProps, type LinkableByIdProps, type TailwindClassProp } from "../shared/props.js";
type RealProps = LinkableByIdProps & BaseInteractiveProps & LabelProps & {
    border?: boolean;
    /** A value to display while recording, if none given the i18n `recorder.recording` key is used. */
    recordingValue?: string;
    /** A title to display on the input div while recording. Is also used as the aria-description. */
    recordingTitle?: string;
    /**
     * The recorder object is a series of event listeners to attach to the input div while recording is started. If you need to bind directly to the element, see the `binders` prop.
     *
     * The listeners are then unbound when recording is set to false again.
     *
     * Note that the component does not handle the setting of `recording` (unless the component is disabled), `modelValue`,  or `recordingValue` at all and has no mechanism for cancelling a recording. It is left to the recorder listeners and any `recorder:*` handlers to determine what to do.
     */
    recorder?: undefined | Record<string, any>;
    /** This provides a way to manually attach/remove event listeners to/from the element. It is an alternative to the `recorder` prop, see it for more details. Both cannot be specified at the same time. */
    binders?: undefined | {
        bind: (el: HTMLElement) => void;
        unbind: (el: HTMLElement) => void;
    };
    /** The id of the element. If not provided, the id will be generated automatically. */
    id?: string;
};
interface Props extends 
/** @vue-ignore */
Partial<Omit<HTMLAttributes, "class"> & TailwindClassProp>, RealProps {
}
declare const _default: typeof __VLS_export;
export default _default;
declare const __VLS_export: import("vue").DefineComponent<Props & {
    /**
     * Puts the element into recording mode if true. See {@link props.recorder}.
     */
    recording?: boolean;
    /** The final value of the recorder. For intermediate values while recording, pass a recorder and set an appropriate recording value. */
    modelValue: string;
}, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    "update:modelValue": (value: string) => any;
    "update:recording": (value: boolean) => any;
} & {
    "recorder:blur": ($event: FocusEvent) => any;
    "recorder:click": (args_0: {
        event: MouseEvent | KeyboardEvent;
        indicator: HTMLElement;
        input: HTMLInputElement;
    }) => any;
    "focus:parent": () => any;
}, string, import("vue").PublicProps, Readonly<Props & {
    /**
     * Puts the element into recording mode if true. See {@link props.recorder}.
     */
    recording?: boolean;
    /** The final value of the recorder. For intermediate values while recording, pass a recorder and set an appropriate recording value. */
    modelValue: string;
}> & Readonly<{
    "onUpdate:modelValue"?: ((value: string) => any) | undefined;
    "onUpdate:recording"?: ((value: boolean) => any) | undefined;
    "onRecorder:blur"?: (($event: FocusEvent) => any) | undefined;
    "onRecorder:click"?: ((args_0: {
        event: MouseEvent | KeyboardEvent;
        indicator: HTMLElement;
        input: HTMLInputElement;
    }) => any) | undefined;
    "onFocus:parent"?: (() => any) | undefined;
}>, {
    disabled: boolean;
    id: string;
    readonly: boolean;
    border: boolean;
    unstyle: boolean;
    recordingTitle: string;
    recorder: Record<string, any>;
    binders: {
        bind: (el: HTMLElement) => void;
        unbind: (el: HTMLElement) => void;
    };
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
//# sourceMappingURL=LibRecorder.vue.d.ts.map