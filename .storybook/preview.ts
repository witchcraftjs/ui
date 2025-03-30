import "../src/runtime/assets/tailwind.css"

// import toReact from "@egoist/vue-to-react"
import { type Parameters,type Preview } from "@storybook/vue3"

import TestWrapper from "../src/runtime/components/TestWrapper/TestWrapper.vue"
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
	globalTypes: {
		darkMode: {
			// defaultValue: true, // Enable dark mode by default on all stories
		},
	},
	decorators: [(story, { args }) => ({
		directives: { vExtractRootEl },
		components: { TestWrapper, story },
		setup: () => ({ args }),
		template: `
			<test-wrapper :outline="args.outline"><story/></test-wrapper>
		`,
	})],
	args: {
		outline: true,
	},

	// not working right, prepareForInline not working either, and neither is inlineStories false
	// tags: ["autodocs"]
}
export default preview
