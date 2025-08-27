import { capitalize } from "@alanscodelog/utils/capitalize"
import type { App } from "vue"

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


export const registerComponents = (app: App, components: Record<string, any>, prefix = ""): void => {
	for (const key of Object.keys(components)) {
		const component = (components as any)[key]
		const name = prefix + component.name
		const capitalizedName = name.split("-").map((_: string) => capitalize(_)).join("")
		app.component(name, component)
		app.component(capitalizedName, component)
	}
}
