import { crop, indent } from "@alanscodelog/utils"
import {
	addComponent,
	addImports, addTemplate, addTypeTemplate,
	createResolver,
	defineNuxtModule,
	installModule,
	useLogger,
} from "@nuxt/kit"
import tailwindcss from "@tailwindcss/vite"
import { addImportsCustom } from "@witchcraft/nuxt-utils/utils/addImportsCustom.js"
import { globFiles } from "@witchcraft/nuxt-utils/utils/globFiles.js"
import { defu } from "defu"
import fs from "fs"
import { themeAsTailwindCss } from "metamorphosis/tailwind"
import IconsResolver from "unplugin-icons/resolver"
import Icons from "unplugin-icons/vite"
import ViteComponents from "unplugin-vue-components/vite"

import { unpluginIconViteOptions } from "./runtime/build/unpluginIconViteOptions.js"
import { themeConvertionOpts } from "./runtime/tailwind/themeConvertionOpts.js"
import { theme } from "./runtime/theme.js"
const knownDirectives = ["vExtractRootEl", "vResizableCols", "vResizeObserver", "vResizableCols"] as const

const { resolve, resolvePath } = createResolver(import.meta.url)

const componentsInfo: {
	name: string
	originalName: string
	filepath: string
}[] = globFiles([
	`${resolve("./runtime/components")}/**/*.vue*`,
	`!**/Template/**.vue`,
],[], (filepath: string, name: string) => ({
	originalName: name,
	name: name.startsWith("Lib") ? name.replace("Lib", "PREFIX") : `PREFIX${name}`,
	filepath,
}))

declare module "@nuxt/schema" {
	interface PublicRuntimeConfig {
		witchcraftUi: Pick<ModuleOptions, "directives">
	}
}

 
export interface ModuleOptions {
/**
 * Whether to include the vite unplugin-icons plugins (pre-configured with the ui module's defaults.
 *
 * @default true
 */
	includeUnpluginIconsPlugins?: boolean
	directives: (typeof knownDirectives[number])[]
	/**
		* Which components (without a prefix) to register for auto-importing globally.
		*/
	globalComponents: string[]
	/**
	 * @default "W"
	 */
	componentPrefix: string
	debug?: boolean
	/**
	 * @default "~/assets/css/tailwind.css" if it exists.
	 */
	mainCssFile?: string
	/** @internal */
	_playgroundWorkaround?: boolean
}

export default defineNuxtModule<ModuleOptions>({
	meta: {
		name: "witchcraftUi",
		configKey: "witchcraftUi",
	},
	defaults: {
		includeUnpluginIconsPlugins: true,
		directives: [ ...knownDirectives ],
		globalComponents: [
			...componentsInfo.map(_ => _.name.slice("PREFIX".length)),
		],
		componentPrefix: "W",
		debug: true,
		mainCssFile: "~/assets/css/tailwind.css",
		_playgroundWorkaround: false,
	},
	async setup(options, nuxt) {
		const moduleName = "@witchcraft/ui"
		const logger = useLogger(moduleName, { level: options.debug ? 10 : 0 })

		const filteredComponentsInfo: typeof componentsInfo = []
		for (const component of componentsInfo) {
			const prefixless = component.name.slice("PREFIX".length)
			component.name = options.componentPrefix + prefixless
			if (options.globalComponents.includes(prefixless)) {
				filteredComponentsInfo.push(component)
			}
		}


		const unknownDirectives = options.directives.filter(_ => !knownDirectives.includes(_))
		if (unknownDirectives.length > 0) {
			throw new Error(`Witchcraft Components: Directives list contains unknown directives: ${unknownDirectives.join(",")}`)
		}
		nuxt.options.runtimeConfig.public.witchcraftUi = defu(
			nuxt.options.runtimeConfig.public.witchcraftUi,
			{
				directives: options.directives,
			}
		)


		addTemplate({
			filename: "witchcraft-ui.css",
			write: true,
			getContents: () => options._playgroundWorkaround
				? crop`
					${indent(themeAsTailwindCss(theme, themeConvertionOpts), 5)}
					@import "${resolve("runtime/assets/base.css")}";
					@import "${resolve("runtime/assets/utils.css")}";
					${indent(filteredComponentsInfo.map(_ => `@source "${_.filepath}";`).join("\n"), 5)}
				`
				: crop`
					${indent(themeAsTailwindCss(theme, themeConvertionOpts), 5)}
					@import "@witchcraft/ui/base.css";
					@import "@witchcraft/ui/utils.css";
					${indent(filteredComponentsInfo.map(_ => `@source "${_.filepath}";`).join("\n"), 5)}
				`
		})
		
		
		await Promise.all(filteredComponentsInfo
			.map(async entry => addComponent({
				filePath: entry.filepath,
				name: entry.name,
				global: options.globalComponents.includes(entry.name.slice(options.componentPrefix.length)),
			}))
		)

		logger.info(`Added components: ${filteredComponentsInfo.map(_ => _.name).join(", ")}`)

		const added: string[] = []
		addImportsCustom([
			`${resolve("runtime/composables")}/**/*`,
			`${resolve("runtime/utils")}/**/*`,
		], [],(filePath: string, name: string) => {
			added.push(name)
			return addImports({
				name,
				from: filePath,
			})
		})
		logger.info(`Added imports: ${added.join(", ")}`)

		nuxt.hook("vite:extendConfig", async config => {
			if (options.includeUnpluginIconsPlugins) {
				logger.info(`Adding unplugin-icons`)
				config.plugins ??= []
				config.plugins = [
					// we must prepend or the custom style options don't work when the module is used
					ViteComponents({
						resolvers: [
							IconsResolver(),
							// we don't need our resolver since we use nuxt instead
						],
					}),
					Icons({
						...unpluginIconViteOptions,
					}),
					tailwindcss() as any,
					...config.plugins,
				]
			}
		})
		const mainCssFile = await resolvePath(options.mainCssFile!, nuxt.options.alias)

		const exists = fs.existsSync(mainCssFile)
		if (exists) {
			nuxt.options.css.push(mainCssFile)
		}

		// we need to hook in first before it does, otherwise the plugins don't load correctly
		await installModule("unplugin-icons/nuxt")
		await installModule("reka-ui/nuxt")

		// todo make names more specific
		// addImportsDir(resolve("helpers"))
		nuxt.options.alias["#witchcraft-ui"] = resolve("runtime")
		nuxt.options.alias["#witchcraft-ui-helpers"] = resolve("runtime/helpers")
		addTypeTemplate({
			filename: "types/witchcraft-ui.d.ts",
			getContents: () => fs.readFileSync(resolve("../types/global.d.ts")).toString(),
		})
	},
})
