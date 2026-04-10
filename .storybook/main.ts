import type { StorybookConfig } from "@storybook/vue3-vite"

const config: StorybookConfig = {
	stories: [
		{
			// 👇 Sets the directory containing your stories
			directory: "../src/runtime/",
			// 👇 Storybook will load all files that match this glob
			files: "**/*.stories.*"
		}
	],
	tags: {
		deprecated: {
			excludeFromSidebar: true // Automatically hides anything with this tag
		}
	},
	addons: [
		"@storybook/addon-links",
		"@storybook/addon-essentials",
		"@chromatic-com/storybook",
		"@storybook/addon-interactions",
		// just for storybook, should not affect the theme of the compoenents
		// which can be controlled by the test controls
		"storybook-dark-mode"
	],
	framework: {
		name: "@storybook/vue3-vite",
		options: {
			docgen: "vue-component-meta"
		}
	},
	typescript: { check: false }
}
export default config
