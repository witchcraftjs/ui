// import { baseTheme as theme } from "metamorphosis/BaseTheme"
import type { Config } from "tailwindcss"

import { plugin as libraryPlugin } from "./src/tailwind/plugin.js"
import { themePluginOpts } from "./src/tailwind/themePluginOpts.js"
import { theme } from "./src/theme.js"

import { createTailwindPlugin } from "metamorphosis/tailwind"


const config = {
	// todo https://tailwindcss.com/docs/dark-mode#toggling-dark-mode-manually
	darkMode: "class",
	content: [
		"./index.html",
		"./src/**/*.{vue,js,ts,jsx,tsx}",
	],
	safelist: [
		// only needed for the library so that the palette story will work correctly
		{
			// pattern: /bg-(?:[0-9]+|warning|error|accent|ok|neutral)/,
			pattern: /bg-.*/,
		},
	],
	plugins: [
		createTailwindPlugin(theme, themePluginOpts),
		libraryPlugin,
	],
} satisfies Config

console.log(createTailwindPlugin(theme, themePluginOpts).config.theme)
export default config

