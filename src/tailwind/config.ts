import { createTailwindPlugin } from "metamorphosis/tailwind"
import type { Config } from "tailwindcss"

import { plugin as libraryPlugin } from "./plugin.js"
import { themePluginOpts } from "./themePluginOpts.js"

import { theme } from "../theme.js"

/**
 * This is available as a compiled file so a typescript postcss config can be imported in a vite file.
 * Since doing so requires importing the tailwind config, but vite can't import typescript files from packages in it's config, this is necessary.
 * #awaiting https://github.com/vitejs/vite/issues/5370
 */
export const config = {
	// todo https://tailwindcss.com/docs/dark-mode#toggling-dark-mode-manually
	// https://github.com/tailwindlabs/tailwindcss/discussions/2917#discussioncomment-5663924
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

