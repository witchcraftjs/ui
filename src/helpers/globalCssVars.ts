import { keys } from "@alanscodelog/utils"


export function setGlobalCssVars(input: Record<string, string>): void {
	const root = document.documentElement
	for (const key of keys(input)) {
		root.style.setProperty(`--${key}`, input[key])
	}
}
