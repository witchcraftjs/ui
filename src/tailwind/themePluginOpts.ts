import { type createTailwindPlugin } from "metamorphosis/tailwind"


export const themePluginOpts: Parameters<typeof createTailwindPlugin>[1] = {
	topLevel: ["color-neutral"],
	twTypeMap: { color: "colors" },
	convertValueMap: {
		color: key => `rgb(var(--${key}) / <alpha-value>)`
		,
	},
	defaultsMap: {
		"color-neutral": "50",
		"color-warning": "500",
		"color-ok": "500",
		"color-error": "500",
		"color-accent": "500",
	},
}
