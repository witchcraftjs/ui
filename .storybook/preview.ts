import "../src/runtime/assets/tailwind.css"

// import toReact from "@egoist/vue-to-react"
import { type Parameters,type Preview } from "@storybook/vue3"

import LibRoot from "../src/runtime/components/LibRoot/LibRoot.vue"
import { vExtractRootEl } from "../src/runtime/directives/vExtractRootEl.js"


export const parameters: Parameters = {
	docs: {
	},
	controls: {
		matchers: {
			color: /(background|color)$/i,
			date: /Date$/i,
		},
		controls: { expanded: true },
	},
	layout: "fullscreen",
	backgrounds: {
		default: "default",
		values: [
			{
				name: "light",
				value: "var(--cGray0)",
			},
			{
				name: "dark",
				value: "var(--cGray10)",
			},
			{
				name: "default",
				value: "var(--cBg)",
			},
		],
	},
}


const preview: Preview = {
	parameters: {
		options: {
			storySort: {
				order: ["Components", "Composables", "Other"],
			},
		},
		// for dark mode addon
		darkMode: {
			current: 'dark'
		}
	},
	decorators: [(story, { args }) => ({
		directives: { vExtractRootEl },
		components: { LibRoot, story },
		setup: () => ({ args }),
		template: `
			<lib-root :test-wrapper-mode="true" :outline="args.outline"><story/></lib-root>
		`,
	})],
	args: {
		outline: true,
	},

	// not working right, prepareForInline not working either, and neither is inlineStories false
	// tags: ["autodocs"]
}
export default preview
