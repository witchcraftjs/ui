// https://github.com/vuejs/language-tools/issues/1077#issuecomment-1145960878
// todo filter what's allowed a bit more
// some components are using useDivideAttrs but others aren't
import "@vue/runtime-core"
import "@vue/runtime-dom"


// for native html elements
declare module "@vue/runtime-dom" {
	// eslint-disable-next-line @typescript-eslint/naming-convention
	export interface HTMLAttributes {
		// allow any data-* attr
		[key: `data-${string}`]: any
		[key: string]: any
	}
}

// for vue components
declare module "@vue/runtime-core" {
	export interface AllowedComponentProps {
		[key: `${string}-attr`]: any
		[key: string]: any
	}
}

export {}

