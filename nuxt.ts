import { type DeepPartial } from "@alanscodelog/utils"
import { defineNuxtModule } from "@nuxt/kit"
import { type Config } from "tailwindcss"
import { fileURLToPath } from "url"

import { theme } from "./src/theme.js"
import config from "./tailwind.config.js"


export default defineNuxtModule({
	meta: {
		name: "@alanscodelog/vue-components",
	},
	setup(_opts, nuxt) {
		nuxt.hook("components:dirs", dirs => {
			dirs.push({
				path: fileURLToPath(new URL("./src/components/", import.meta.url)),
				prefix: "",
			})
		})
		nuxt.hook("tailwindcss:config" as any, (twConfig: DeepPartial<Config>) => {
			twConfig.plugins = [...(twConfig.plugins ?? []), ...config.plugins]
			twConfig.darkMode = "class"
			twConfig.theme ??= {}
			twConfig.theme.configViewer = {
			// https://github.com/rogden/tailwind-config-viewer/issues/84
				themeReplacements: Object.fromEntries(
					Object.entries(theme.css)
						.map(([key, value]) => [`rgb(var(${key}) / <alpha-value>)`, `rgb(${value})`]),
				),
			}
			return twConfig
		})
	},
})
