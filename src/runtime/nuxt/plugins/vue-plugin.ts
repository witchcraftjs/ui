import { isArray } from "@alanscodelog/utils/isArray"

import { defineNuxtPlugin, useRuntimeConfig } from "#imports"

import { registerDirectives } from "../../vue/registerDirectives.js"

export default defineNuxtPlugin({
	name: "components-plugin",
	async setup(nuxtApp): Promise<void> {
		const config = useRuntimeConfig().public.witchcraftUi
		const app = nuxtApp.vueApp
		const directives = (isArray(config?.directives)
			? (await Promise.all(config.directives.map(async (name: string) => (import(`../../directives/${name}.ts`))))).map((_: any) => Object.values(_)[0])
		// @ts-expect-error ts filetype needed for nuxt
			: await import(`../../directives/index.ts`))
		registerDirectives(app as any, Object.values(directives))
	}
})
