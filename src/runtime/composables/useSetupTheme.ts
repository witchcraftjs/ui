import type { Theme } from "metamorphosis/Theme"
import { markRaw, onBeforeUnmount, onMounted, provide, type Ref, type ShallowRef, shallowRef, toRaw, watch } from "vue"

import { themeInjectionKey } from "../injectionKeys.js"
import { theme as defaultTheme } from "../theme.js"

/**
 * Sets up and provides a Metamorphosis theme via injection.
 *
 * Attaches the theme to the given element ref and listens for theme changes.
 * Call this once at the root of the app.
 *
 * Use `useInjectedTheme` to access the injected theme in child components.
 */
export function useSetupTheme({
	props,
	attachElement,
	isClientSide = true
}: {
	/** Props with optional theme prop to use as theme. If theme prop is not provided, the default theme is used. Mark it raw to avoid Vue proxying it. */
	// must be done this way so the prop can be reactive and a theme can be swapped out at the component level
	props: { theme?: Theme<any> }
	/** Ref to the DOM element that the theme will attach to. */
	attachElement: Ref<HTMLElement | null>
	/** Whether we're running on the client. */
	isClientSide?: boolean
}): ShallowRef<Theme<any>> {
	const themeRef = shallowRef(props.theme ?? markRaw(defaultTheme))
	provide(themeInjectionKey, themeRef)

	watch(() => !!props.theme, () => {
		themeRef.value = props.theme ?? markRaw(defaultTheme)
	})
	const themeCb = (): void => {
		toRaw(themeRef.value).attach(attachElement.value!)
	}
	if (isClientSide) {
		onMounted(() => {
			toRaw(themeRef.value).on("change", themeCb)
			themeCb()
		})
		onBeforeUnmount(() => {
			toRaw(themeRef.value).off("change", themeCb)
		})
	}
	return themeRef
}
