import { type themeAsTailwindCss } from "metamorphosis/tailwind.js"


export const themeConvertionOpts: Parameters<typeof themeAsTailwindCss>[1] = {
	topLevel: ["number-spacing"],
	twTypeMap: { color: "colors" },
	// note, not available yet
	defaultsMap: {
		"color-neutral": "50",
		"color-warning": "500",
		"color-ok": "500",
		"color-error": "500",
		"color-accent": "500",
	},
}
