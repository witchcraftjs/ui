import type { App, Plugin } from "vue"

import { registerComponents } from "./registerComponents.js"
import { registerDirectives } from "./registerDirectives.js"

import { components, directives } from "../main.lib.js"

// eslint-disable-next-line @typescript-eslint/naming-convention
export const VueComponentsPlugin: Plugin = {
	install(app: App) {
		registerComponents(app, components)
		registerDirectives(app, directives)
	},
}

