import { isArray } from "@alanscodelog/utils"


export function parseClasses(classes: string | string[] | Record<string, boolean>): Record<string, boolean> {
	if (typeof classes === "string") return Object.fromEntries(classes.split(" ").map(name => [name, true]))

	if (isArray(classes)) return Object.fromEntries(classes.map(name => [name, true]))

	return classes
}
