/* eslint-disable @typescript-eslint/consistent-indexed-object-style */
/* eslint-disable @typescript-eslint/naming-convention */
export {}

declare module "vue" {
	interface HTMLAttributes {
		// allow any data-* attr
		[key: `data-${string}`]: any
	}
	interface AriaAttributes {
		// some aria attributes are missing...
		"aria-description"?: string
	}
	// interface ComponentCustomProps {
	// }
}
