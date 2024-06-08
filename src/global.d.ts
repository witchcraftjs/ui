import type { AdditionalAttributes } from "./types.js"

// for native html elements
declare module "@vue/runtime-dom" {
	// eslint-disable-next-line @typescript-eslint/naming-convention
	export interface HTMLAttributes extends AdditionalAttributes {
		// allow any data-* attr
		[key: `data-${string}`]: any
		// some aria attributes are missing...
		// eslint-disable-next-line @typescript-eslint/naming-convention
		"aria-description"?: string
	}
}

// for vue components
declare module "@vue/runtime-core" {
	// eslint-disable-next-line @typescript-eslint/consistent-indexed-object-style
	export interface AllowedComponentProps extends AdditionalAttributes {
		// some aria attributes are missing...
		[key: `${string}-attr`]: any
	}
}

export {}

