import "./assets/style.css"

import type { App, Plugin } from "vue"


export * as components from "./components/index.js"
export * as helpers from "./helpers/index.js"
export * as composables from "./composables/index.js"
export * as directives from "./directives/index.js"

import { capitalize } from "@alanscodelog/utils"

import * as components from "./components/index.js"


/**
 * Register only specific components. Will register components as both snake case and pascal case.
 *
 * ```ts
 * import {SomeComponent} from "@alanscodelog/vue-components"
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

// eslint-disable-next-line @typescript-eslint/no-shadow
export const registerComponents = (app: App, components: Record<string, any>, prefix = ""): void => {
	for (const key of Object.keys(components)) {
		const component = (components as any)[key]
		const name = prefix + component.name
		const capitalizedname = name.split("-").map((_: string) => capitalize(_)).join("")
		app.component(name, component)
		app.component(capitalizedname, component)
	}
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export const VueComponentsPlugin: Plugin = {
	install(app: App) {
		registerComponents(app, components)
	},
}


type Components = typeof components

/**
 * To get global typings, in a global declaration file (e.g. global.d.ts) do:
 *
 * ```ts
 * import { GlobalComponentTypes } from "@alanscodelog/vue-components"
 * declare module "@vue/runtime-core" {
 * 	export interface GlobalComponents extends GlobalComponentTypes { }
 * }
 * ```
 */
export type GlobalComponentTypes = {
	[key in keyof Components]: Components[key]
}

