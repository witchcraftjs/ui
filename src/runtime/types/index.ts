import type { ErrorW } from "@alanscodelog/utils"
import type { Ref } from "vue"

export type ResizableOptions = {
	/**
	 * ### true (default)
	 * The directive will shrink/expand the columns when the table is resized and will use percentage widths on the table cells. This disables resizing of the last column (from the right handle).
	 *
	 * Additionally because of the way `table-layout:fixed` works, a min-width cannot be set on the elements via css, so instead, if the table shrinks past `opts.margin * col #`, `min-width` is set on the table until it's resized larger.
	 *
	 * Note that by definition, the columns are not resizable when this happens.
	 *
	 * ### false
	 *
	 * The table can be resized past it's normal width and uses pixel widths on the table cells. You might want to set `overscroll-x: scroll` on a parent wrapping element.
	 *
	 * This will set the table width to `min-content`, else it doesn't work. Note that it does this after the initial reading/setting of sizes so you can, for example, layout the table with `width: 100%`.
	 *
	 * @default true
	 */
	fitWidth: boolean
	/**
	 * The minimum width a column can have.
	 *
	 * Can be a number, or "dynamic". When dynamic, the directive attempts to get the width of `.grip` and multiplies it times 3.
	 */
	margin: "dynamic" | number
	/**
	 * Whether resizing is enabled.
	 *
	 * Can be turned off and all listeners, grips, etc, will be removed.
	 *
	 * Note that element styles set are not removed.
	 */
	enabled: boolean
	/** The number of columns. It will be assumed the first colCount elements are the initial widths of the table columns. */
	colCount: number
	/**
	 * A ref that gets filled in with the element width string values by the directive.
	 *
	 * It can then be used as needed by the component.
	 */
	widths: Ref<string[]>
	/** The selector to use for the header cells. "tr > th" by default. */
	selector: string
	/** Is called just after the `resizable-cols-setup` class is added. Can be useful for controlling the styling of wrappers or doing additional things post-setup. The default table element uses it to set the class on the wrapper also. */
	onSetup?: (el: Element) => void
	/** Is called on teardown (after the `resizable-cols-setup` class is removed). */
	onTeardown?: (el: Element) => void
}
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export type TableColConfig<T = {}> = Record<keyof T, { name?: string, resizable?: boolean }>

export type ResizeCallback = (_rect: DOMRectReadOnly, el: Element) => void

export type FileInputError = ErrorW<{ file: File, isValidMimeType: boolean, isValidExtension: boolean }>

/** h 0-360+ (deg), s 0-100%, v 0-100%, a 0-1 */
export type HsvaColor = { h: number, s: number, v: number, a?: number }
/** rgb 0-255, 0-1 for alpha */
export type RgbaColor = { r: number, g: number, b: number, a?: number }

export type Point = { x: number, y: number }

export type ScrollNearContainerEdgesOptions = {
	containerEl: Ref<HTMLElement | null>
	/** Margin inside contianer that allows scrolling. 10 by default. */
	scrollMargin?: number
	/** Margin around container that still allows scrolling. 0 by defualt. */
	outerScrollMargin?: number
	/**
		* Controls the scrolling speed.
		*
		*  Scroll happens faster the nearer to the outer edge the cursor.
		*
		* This is calculated as a percent (0 near the inner edge, and 1 near the outer edge), which is then multiplied by this multiplier, since moving by less than 1 pixel is quite slow. The default is 4.
		*/
	fastPixelMultiplier?: number
	/** @deprecated Use fastPixelMultiplier instead. */
	fastPixelAmount?: number
	useTimer?: boolean
	timerInterval?: number
}
// eslint-disable-next-line @typescript-eslint/naming-convention
export type SimpleDOMRect = Omit<DOMRect, "toJSON">

export type SingleDate = Date | undefined

export type RangeDate = {
	start?: SingleDate
	end?: SingleDate
}

export type CustomNotificationComponentProps = {
	message: string
	messageClasses?: string
}


export type BaseInteractiveProps = {
	/** Default is false. */
	disabled?: boolean
	/** Default is false. */
	readonly?: boolean
	/** Default is true. */
	border?: boolean
	/** Removes styles from the component. Default is false. */
	unstyle?: boolean
}


export type TailwindClassProp = {
	/** Tailwind classes. */
	class?: string | false
}


export const defaultDarkModeOrder = ["system", "dark", "light"] as const


export type DarkModeOptions = {
	/* Whether to save the manual dark mode to local storage. Uses the key "prefersColorSchemeDark" by default. You can pass a key instead of true to use that as the key instead. */
	useLocalStorage?: boolean | string
	/* The order of the string dark modes when using `cycleDarkMode`. Defaults to `["system", "dark", "light"]` */
	darkModeOrder?: readonly ("system" | "dark" | "light")[]
	/** True by default, should be passed import.meta.client if using nuxt, or false when running server side. */
	isClientSide?: boolean
	/**
	 * Whether to use the view transition to animate the dark mode switch (you just need to add the css).
	 *
	 * Note that the transitition is NOT triggered if visually the mode does not change (e.g. system mode is dark and the user switches from system to dark, visually nothing changes so transitioning is skipped).
	 *
	 * There is an example in storybook. But basically:
	 *
	 * ```css
	 *
	 * #root { // the dark mode switcher works on the WRoot component not the html root
	 *		view-transition-name: wroot;
	 *		height: 100dvh;
	 *		padding: 0;
	 *	}
	 *
	 * ::view-transition-new(wroot) {
	 * 	animation: grow var(--story-anim-length) ease-in-out;
	 * 	animation-fill-mode: both;
	 * 	z-index: 2;
	 * 	mask: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40"><circle cx="20" cy="20" r="20" fill="white"/></svg>') center / 0 no-repeat;
	 * }
	 *
	 * ::view-transition-old(wroot) {
	 * 	animation: none;
	 * 	animation-fill-mode: both;
	 * 	z-index: 1;
	 * }
	 *
	 * @keyframes grow {
	 * 	from {
	 * 		mask-size: 0dvw;
	 * 	}
	 * 	to {
	 * 		mask-size: 300dvw;
	 * 	}
	 * }
	 * ```
	 *
	 * See https://theme-toggle.rdsx.dev/ for more ideas.
	 *
	 * @default true
	 */
	useViewTransition?: boolean
}

export interface DarkModeCommands {
	setDarkMode: (value: "dark" | "light" | "system") => void
	cycleDarkMode: () => void
}

export interface DarkModeState {
	/** Whether the dark mode should be enabled or not */
	darkMode: Ref<boolean>
	/** The current state of the darkMode but as a string (dark, light, system) */
	darkModeState: Ref<"dark" | "light" | "system">
	/** The value of the manuably controllable dark mode. You can set this to true/false or undefined to allow the systemDarkMode to take priority. Alternatively use setDarkMode instead. */
	manualDarkMode: Ref<boolean | undefined>
	/** The value of the system dark mode. This is automatically set depending on the user's `prefer-color-scheme` and should not be set directly. */
	systemDarkMode: Ref<boolean>

}
export type PopupConstrainToProps = {
	constrainWidthTo?: number | "trigger" | "available" | string | null
	constrainHeightTo?: number | "trigger" | "available" | string | null
}


export type EmitsToProps<T> = {
	[K in keyof T as K extends string ? `on${Capitalize<K>}` : never]?:
	T[K] extends (...args: infer Args) => any
		? (...args: Args) => void
		: T[K] extends any[]
			? (...args: T[K]) => void
			: T[K]
}
