import { type ButtonHTMLAttributes } from "vue";
import type { TailwindClassProp } from "../shared/props.js";
declare const _default: import("vue").DefineComponent<Props, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {} & {
    "update:darkMode": (value: boolean) => any;
    "update:darkModeState": (value: "system" | "dark" | "light") => any;
}, string, import("vue").PublicProps, Readonly<Props> & Readonly<{
    "onUpdate:darkMode"?: ((value: boolean) => any) | undefined;
    "onUpdate:darkModeState"?: ((value: "system" | "dark" | "light") => any) | undefined;
}>, {}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
export default _default;
type RealProps = {
    showLabel?: boolean;
};
interface Props extends 
/** @vue-ignore */
Partial<Omit<ButtonHTMLAttributes, "class" | "color" | "disabled"> & TailwindClassProp & {
    disabled?: boolean;
    unstyle?: boolean;
}>, RealProps {
}
//# sourceMappingURL=LibDarkModeSwitcher.vue.d.ts.map