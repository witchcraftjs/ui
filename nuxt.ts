import { addImports, addPlugin, createResolver, defineNuxtModule } from "@nuxt/kit"
import { fileURLToPath } from "url"

import { theme } from "./src/theme.js"
import config from "./tailwind.config.js"

import { type Config } from "tailwindcss"
import type { DeepPartial } from "@alanscodelog/utils"


export default defineNuxtModule({
	meta: {
		name: "@alanscodelog/vue-components",
	},
	setup(_opts, nuxt) {
		const { resolve } = createResolver(import.meta.url)


		nuxt.hook("components:dirs", dirs => {
			dirs.push({
				path: fileURLToPath(new URL("./src/components/", import.meta.url)),
				prefix: "",
			})
		})

		nuxt.hook("tailwindcss:config" as any, (twConfig: DeepPartial<Config>) => {
			twConfig.plugins = [...(twConfig.plugins ?? []), ...config.plugins]
			twConfig.darkMode = config.darkMode
			twConfig.theme ??= {}
			twConfig.theme.configViewer = {
			// https://github.com/rogden/tailwind-config-viewer/issues/84
				themeReplacements: Object.fromEntries(
					Object.entries(theme.css)
						.map(([key, value]) => [`rgb(var(${key}) / <alpha-value>)`, `rgb(${value})`]),
				),
			}
			twConfig.content ??= []
			// todo check am not overriding anything wrong
			;(twConfig.content as string[]).push(resolve("./src/**/*.vue"))
		})
		addImports([
			{
				name: "twMerge",
				from: resolve("./src/helpers/twMerge.ts"),
			},
		])
	},
})
