import { useDarkMode } from "./useDarkMode.js"
/**
 * A composable for setting up dark mode that automatically takes care of saving the user's preference.
 *
 * See the returned utilities for more details.
 *
 * Use it's twin, `useInjectedDarkMode` for accessing the injected state and commands in components
 *
 * Note that this should only be called once at the root of the app.
 *
 */
export function useSetupDarkMode(...args: Parameters<typeof useDarkMode>): ReturnType<typeof useDarkMode> {
	return useDarkMode(...args)
}
