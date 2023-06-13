/** Fixes tailwind autocompletion for variable dependent colors. */
import { themePluginOpts } from "./src/tailwind/themePluginOpts.js"
import { theme } from "./src/theme.js"
import config from "./tailwind.config.js"

import { createTailwindPlugin } from "metamorphosis/tailwind"


config.plugins = [...config.plugins, createTailwindPlugin(theme, {
	...themePluginOpts,
	convertValueMap: {
		color: (_key, val) => `rgb(${val} / <alpha-value>)`,
	},
})]
export default config
