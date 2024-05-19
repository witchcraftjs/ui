import type { NuxtApp } from "@nuxt/schema"

// @ts-expect-error only defined in nuxt
import { defineNuxtPlugin, useRuntimeConfig } from "#app"
import { isArray } from "@alanscodelog/utils/isArray.js"

import { registerDirectives } from "../../vue/registerDirectives.js"


export default defineNuxtPlugin({
	name: "components-plugin",
	async setup(nuxtApp: NuxtApp) {
		const config = useRuntimeConfig().public.witchcraftComponents
		const app = nuxtApp.vueApp
		const directives = (isArray(config?.directives)
		? (await Promise.all(config.directives.map(async (name: string) => (import(`../../directives/${name}.ts`))))).map(_ => Object.values(_)[0])
		: await import(`../../directives/index.ts`))
		registerDirectives(app, Object.values(directives))
	},
})
