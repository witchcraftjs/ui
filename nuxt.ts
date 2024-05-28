import type { DeepPartial } from "@alanscodelog/utils"
import { isArray } from "@alanscodelog/utils/isArray.js"
import { addComponent, addImports, addPlugin, createResolver, defineNuxtModule } from "@nuxt/kit"
import { defu } from "defu"
import { glob } from "fast-glob"
import path from "path"
import { type Config } from "tailwindcss"

import { theme } from "./src/theme.js"
import config from "./tailwind.config.js"


const knownDirectives = ["vExtractRootEl", "vResizableCols", "vResizeObserver", "vResizableCols"] as const
type Options = {
	directives: (typeof knownDirectives[number])[] | "all"
}

// @ts-expect-error it does work...
declare module "nuxt/schema" {
	interface NuxtOptions {
		witchcraftComponents: Options
	}
	interface RuntimeConfig {
		witchcraftComponents: Options
	}
}

export default defineNuxtModule<Options>({
	meta: {
		name: "@alanscodelog/vue-components",
		configKey: "witchcraftComponents",
	},
	defaults: {
		directives: [],
	},
	async setup(opts, nuxt) {
		const unknownDirectives = isArray(opts.directives) ? opts.directives.filter(_ => !knownDirectives.includes(_)) : []
		if (unknownDirectives.length > 0 || (!isArray(opts.directives) && opts.directives !== "all")) {
			throw new Error(`Witchcraft Components: Directives list contains unknown directives: ${unknownDirectives.join(",")}`)
		}
		nuxt.options.runtimeConfig.public.witchcraftComponents = defu(nuxt.options.runtimeConfig.public.witchcraftComponents as any, {
			directives: opts.directives === "all" ? null : opts.directives,
		})

		const { resolve } = createResolver(import.meta.url)

		const components = await glob(`${resolve("src/components")}/**/*.vue`, { onlyFiles: true, absolute: false })
		await Promise.all(components.map(async component => addComponent({
			filePath: component,
			name: path.parse(component).name,
		})))

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
			{
				name: "vDetectFlex",
				from: resolve("./src/directives/vDetectFlex.ts"),
			},
			{
				name: "vExtractRootEl",
				from: resolve("./src/directives/vExtractRootEl.ts"),
			},
			{
				name: "vResizableCols",
				from: resolve("./src/directives/vResizableCols.ts"),
			},
		])
		// console.log((await glob(`${resolve("src/composables")}/*.ts`, { onlyFiles: true, absolute: false, ignore: ["**/*/index.ts"]})))
		await Promise.all(
			(await glob(`${resolve("src/composables")}/*.ts`, { onlyFiles: true, absolute: false, ignore: ["**/*/index.ts"]}))
				.map(async _ => addImports({
					from: _,
					name: path.parse(_).name,
				})))
		// console.log((await glob(`${resolve("src/directives")}/*.ts`, { onlyFiles: true, absolute: false, ignore: ["**/*/index.ts"]})))
		await Promise.all(
			(await glob(`${resolve("src/directives")}/*.ts`, { onlyFiles: true, absolute: false, ignore: ["**/*/index.ts"]}))
				.map(async _ => addImports({
					from: _,
					name: path.parse(_).name,
				})))

		addPlugin(resolve("./src/nuxt/plugins/vue-plugin.ts"))
	},
})
