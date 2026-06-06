import type { Theme } from "metamorphosis/Theme"
import { inject, type ShallowRef } from "vue"

import { themeInjectionKey } from "../injectionKeys.js"

export function useInjectedTheme(): ShallowRef<Theme<any>> {
	const val = inject(themeInjectionKey, undefined)
	if (val === undefined) throw new Error("witchcraft/ui: theme is not injected. See useSetupTheme or provide themeInjectionKey.")
	return val
}
