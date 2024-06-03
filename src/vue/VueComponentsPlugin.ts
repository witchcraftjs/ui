import type { App, Plugin } from "vue"

import { registerComponents } from "./registerComponents.js"
import { registerDirectives } from "./registerDirectives.js"

import * as components from "../components/index.js"
import * as directives from "../directives/index.js"

// eslint-disable-next-line @typescript-eslint/naming-convention
export const VueComponentsPlugin: Plugin = {
	install(app: App) {
		registerComponents(app, components)
		registerDirectives(app, directives)
	},
}

