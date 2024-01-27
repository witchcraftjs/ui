// /* eslint-disable @typescript-eslint/naming-convention */
// /// <reference types="vite/client" />

// declare module "*.vue" {
// 	import { type DefineComponent } from "vue"


// 	const component: DefineComponent<{}, {}, any>
// 	export default component
// }


// import { type FontAwesomeIcon } from "@fortawesome/vue-fontawesome"

import "@vue/runtime-core"


declare module "@vue/runtime-core" {
	// eslint-disable-next-line @typescript-eslint/naming-convention
	export type HTMLAttributes = Record<string, any>
	export type AllowedComponentProps = Record<string, any>
// 	export interface GlobalComponents {
// 		FontAwesomeIcon: typeof FontAwesomeIcon
// 	}
}
export {}
