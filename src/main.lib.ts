import "./assets/style.css"

import type { App, Plugin } from "vue"


export * as components from "./components/index.js"
export * as helpers from "./helpers/index.js"
export * as composables from "./composables/index.js"
export * as directives from "./directives/index.js"

import { capitalize } from "@alanscodelog/utils"

import * as components from "./components/index.js"

// eslint-disable-next-line @typescript-eslint/naming-convention
export const VueComponentsPlugin: Plugin = {
	install(app: App) {
		for (const componentName of Object.keys(components)) {
			const component = (components as any)[componentName]
			const capitalizedName = component.name.split("-").map((_: string) => capitalize(_)).join("")
			app.component(component.name, component)
			app.component(capitalizedName, component)
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

