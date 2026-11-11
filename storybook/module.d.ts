import type Icons from "unplugin-icons/vite";
declare const knownDirectives: readonly ["vExtractRootEl", "vResizableCols", "vResizeObserver", "vResizableCols"];
declare module "@nuxt/schema" {
    interface PublicRuntimeConfig {
        witchcraftUi: Pick<ModuleOptions, "directives">;
    }
}
export interface ModuleOptions {
    /**
     * Whether to include the vite unplugin-icons plugins (pre-configured with the ui module's defaults, i.e. prefix "i").
     *
     * @default true
     */
    includeUnpluginIconsPlugins?: boolean;
    /**
     * Pass options to unplugin-icons/nuxt
     *
     * The module doesn't define a key for it's options so this is the only way to allow proper merging.
     */
    unpluginOptions?: Parameters<typeof Icons>[0];
    directives: (typeof knownDirectives[number])[];
    /**
     * Which components (without a prefix) to register for auto-importing globally.
     */
    globalComponents: string[];
    /**
     * @default "W"
     */
    componentPrefix: string;
    debug?: boolean;
    /**
     * @default "~/assets/css/tailwind.css" if it exists.
     */
    mainCssFile?: string;
    /** @internal */
    _playgroundWorkaround?: string;
}
declare const _default: import("@nuxt/schema").NuxtModule<ModuleOptions, ModuleOptions, false>;
export default _default;
//# sourceMappingURL=module.d.ts.map