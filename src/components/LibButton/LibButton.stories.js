import "../../assets/global.scss"

import { library } from "@fortawesome/fontawesome-svg-core"
import { far } from "@fortawesome/free-regular-svg-icons"
import { fas } from "@fortawesome/free-solid-svg-icons"

import { theme } from "../../helpers"
import TestWrapper from "../../TestWrapper.vue"
import { fa, LibButton } from "../index.ts"


library.add(fas, far)

// More on default export: https://storybook.js.org/docs/vue/writing-stories/introduction#default-export

export default {
	title: "Example/Button",
	component: LibButton,
}

// More on component templates: https://storybook.js.org/docs/vue/writing-stories/introduction#using-args
const Template = args => ({
	components: { LibButton, fa, TestWrapper },
	setup() {
		theme()
		return {
			args: {
				label: "Label",
				...args,
			},
		}
	},
	// And then the `args` are bound to your component with `v-bind="args"`
	template: `
		<test-wrapper :outline="args.outline">
			<lib-button v-bind="args" />
			<br>
			<lib-button v-bind="{...args, color: 'blue'}" />
			<br>
			<lib-button v-bind="{...args, color: 'green'}" />
			<br>
			<lib-button v-bind="{...args, color: 'yellow'}" />
			<br>
			<lib-button v-bind="{...args, color: 'orange'}" />
			<br>
			<lib-button v-bind="{...args, color: 'red'}" />
		</test-wrapper>
		`,
		backgrounds: { disable: true },
	})

const TemplateWIcon = args => ({
	...Template(args),
	template: `
		<test-wrapper :outline="args.outline">
			<lib-button v-bind="args">
				<fa :icon="'bell'"/>
			</lib-button>
		</test-wrapper>
	`,
})


export const Primary = Template.bind({})
export const Small = Template.bind({})
Small.args = { class: "small" }
export const Large = Template.bind({})
Large.args = { class: "large" }
export const Disabled = Template.bind({})
export const DisabledWithIcon = TemplateWIcon.bind({})
DisabledWithIcon.args = { disabled: true }
Disabled.args = { disabled: true }
export const WithIcon = TemplateWIcon.bind({})
export const BorderlessWithIcon = TemplateWIcon.bind({})
BorderlessWithIcon.args = { border: false }
export const BorderlessDisabledWithIcon = TemplateWIcon.bind({})
BorderlessDisabledWithIcon.args = { border: false, disabled: true }
