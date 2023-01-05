/* eslint-disable @typescript-eslint/naming-convention */
/// <reference types="vite/client" />

declare module "*.vue" {
	import { DefineComponent } from "vue"


	const component: DefineComponent<{}, {}, any>
	export default component
}


import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome"


declare module "@vue/runtime-core" {
	export interface GlobalComponents {
		FontAwesomeIcon: typeof FontAwesomeIcon
	}
}
