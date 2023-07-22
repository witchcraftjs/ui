import "./assets/style.css"

import type { App, Plugin } from "vue"


export * as components from "./components/index.js"
export * as helpers from "./helpers/index.js"
export * as composables from "./composables/index.js"
export * as directives from "./directives/index.js"

import * as components from "./components/index.js"

// eslint-disable-next-line @typescript-eslint/naming-convention
export const MyLibPlugin: Plugin = {
	install(app: App) {
		for (const componentName of Object.keys(components)) {
			const component = (components as any)[componentName]
			app.component(component.name, component)
		}
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

