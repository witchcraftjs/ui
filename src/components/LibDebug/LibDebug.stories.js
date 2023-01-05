import "../../assets/global.scss"

import { crop } from "@alanscodelog/utils"

import { LibDebug } from ".."


// More on default export: https://storybook.js.org/docs/vue/writing-stories/introduction#default-export

export default {
	title: "Example/Debug",
	component: LibDebug,
}

// More on component templates: https://storybook.js.org/docs/vue/writing-stories/introduction#using-args
const Template = args => ({
	components: { LibDebug },
	setup() {
		return {
			args,
		}
	},
	template: `
		<lib-debug v-bind="args" />
		`,
	})


export const Primary = Template.bind({})
Primary.args = { value: { any: ["any", { value: "any" }]} }

export const WithCustomTab = Template.bind({})
WithCustomTab.args = { value: { any: ["any", { value: "any" }]}, tab: 2 }

export const NoValue = Template.bind({})
NoValue.args = { value: undefined }

export const StringWithWhitespace = Template.bind({})
StringWithWhitespace.args = { value: crop`
		Manually
			Indented
				String
	` }
