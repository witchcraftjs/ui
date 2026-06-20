import type { App } from "vue";
/**
 * Register only specific components. Will register components as both snake case and pascal case.
 *
 * ```ts
 * import {SomeComponent} from "@witchcraft/ui/components/SomeComponent"
 * const components = { SomeComponent }
 * createApp(App)
 * 	.use({
 * 		install(app: typeof App) {
 * 			// will register optional-prefix-some-component and optionalPrefixSomeComponent
 * 			// note it doesn't matter what you call the component in the Object
 * 			// its name is set internally already
 * 			registerComponents(app, components, "optional-prefix-")
 * 		},
 *	})
 * ```
 */
export declare const registerComponents: (app: App, components: Record<string, any>, prefix?: string) => void;
//# sourceMappingURL=registerComponents.d.ts.map