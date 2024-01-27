import type { App } from "vue"

/** Like registerComponents but for directives. Directives given must have a directiveName property, else they will be ignored. */
export const registerDirectives = (app: App, directives: Record<string, any>, prefix = ""): void => {
	for (const key of Object.keys(directives)) {
		const directive = (directives as any)[key]
		if (!directive.directiveName) continue
		const name = prefix + directive.directiveName
		const kebabCasedName = name.split("-").map((_: string) => _.toLowerCase()).join("-")
		app.directive(kebabCasedName, directive)
	}
}
