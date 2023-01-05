import "./assets/global.scss"

import type { App, Plugin } from "vue"


export * as components from "./components/index.js"
export * as helpers from "./helpers/index.js"
export * as mixins from "./mixins/index.js"

// eslint-disable-next-line import/no-namespace
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

declare module "@vue/runtime-core" {
	export interface GlobalComponents extends GlobalComponentTypes { }
}
