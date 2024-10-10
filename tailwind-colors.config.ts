/** Fixes tailwind autocompletion for variable dependent colors. */
import { createTailwindPlugin } from "metamorphosis/tailwind.js"

import { themePluginOpts } from "./src/tailwind/themePluginOpts.js"
import { theme } from "./src/theme.js"
import config from "./tailwind.config.js"


export default {
	...config,
	plugins: [...config.plugins, createTailwindPlugin(theme, {
		...themePluginOpts,
		convertValueMap: {
			color: (_key, val) => `rgb(${val} / <alpha-value>)`,
		},
	})],
}
