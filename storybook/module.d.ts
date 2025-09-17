declare const knownDirectives: readonly ["vExtractRootEl", "vResizableCols", "vResizeObserver", "vResizableCols"];
declare module "@nuxt/schema" {
    interface PublicRuntimeConfig {
        witchcraftUi: Pick<ModuleOptions, "directives">;
    }
}
export interface ModuleOptions {
    /**
     * Whether to include the vite unplugin-icons plugins (pre-configured with the ui module's defaults.
     *
     * @default true
     */
    includeUnpluginIconsPlugins?: boolean;
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
    _playgroundWorkaround?: boolean;
}
declare const _default: import("@nuxt/schema").NuxtModule<ModuleOptions, ModuleOptions, false>;
export default _default;
//# sourceMappingURL=module.d.ts.map