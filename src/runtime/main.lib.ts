export * from "./types/index.js"
export * as components from "./components/index.js"
export * as helpers from "./helpers/index.js"
export * as composables from "./composables/index.js"
export * as directives from "./directives/index.js"
export { registerDirectives } from "./vue/registerDirectives.js"
export { registerComponents } from "./vue/registerComponents.js"
export { VueComponentsPlugin } from "./vue/VueComponentsPlugin.js"

import type * as components from "./components/index.js"


type Components = typeof components

/**
 * To get global typings, in a global declaration file (e.g. global.d.ts) do:
 *
 * ```ts
 * import { GlobalComponentTypes } from "@witchcraft/ui"
 *
 * declare module "@vue/runtime-core" {
 * 	export interface GlobalComponents extends GlobalComponentTypes { }
 * }
 * export {}
 * ```
 * To be able to pass extra attributes you will have to have a global declaration file like the one the library has ({@link ./global.d.ts}), see https://github.com/vuejs/language-tools/issues/1077#issuecomment-1145960878
 */
export type GlobalComponentTypes = {
	[key in keyof Components]: Components[key]
}

