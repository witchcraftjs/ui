
import {mergeConfig} from "vite"
export default {
	"stories": [
		// "../src/**/*.stories.mdx",
		"../src/**/*.stories.@(js|jsx|ts|tsx)"
	],
	"addons": [
		"@storybook/addon-links",
		"@storybook/addon-essentials",
		"@storybook/addon-a11y",
		"@storybook/addon-storysource",
		"storybook-tailwind-dark-mode"
	],
	"framework": {
		name: "@storybook/vue3-vite",
		options: {}
	},
	docsPage: {
		docs: "automatic"
	},
	async viteFinal(config) {
		return mergeConfig(config, {
		});
	},
	docs: {
		autodocs: true
	}
};
