// @ts-expect-error: resolved by Nuxt
import type { NuxtApp } from "@nuxt/types"

// @ts-expect-error only defined in nuxt
import { defineNuxtPlugin } from "#app"

import * as directives from "../../directives/index.js"
import { registerDirectives } from "../../vue/registerDirectives.js"


export default defineNuxtPlugin((nuxtApp: NuxtApp) => {
	const app = nuxtApp.vueApp
	registerDirectives(app, directives)
})
