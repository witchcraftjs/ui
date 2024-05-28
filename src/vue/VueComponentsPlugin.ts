import type { App, Plugin } from "vue"

import { registerComponents } from "./registerComponents.js"
import { registerDirectives } from "./registerDirectives.js"

export * as directives from "../directives/index.js"
export * as components from "../components/index.js"

// eslint-disable-next-line @typescript-eslint/naming-convention
export const VueComponentsPlugin: Plugin = {
	install(app: App) {
		// @ts-expect-error .
		registerComponents(app, components)
		// @ts-expect-error .
		registerDirectives(app, directives)
	},
}

