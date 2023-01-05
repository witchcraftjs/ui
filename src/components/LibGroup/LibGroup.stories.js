import "../../assets/global.scss"

import { library } from "@fortawesome/fontawesome-svg-core"
import { far } from "@fortawesome/free-regular-svg-icons"
import { fas } from "@fortawesome/free-solid-svg-icons"

import { theme } from "../../helpers"
import TestWrapper from "../../TestWrapper.vue"

import { LibButton, LibGroup, LibInput } from ".."


library.add(fas, far)

export default {
	title: "Example/Group",
	component: LibGroup,
	argTypes: {
	},
}

const Template = args => ({
	components: { TestWrapper, LibGroup, LibInput, LibButton },
	setup() {
		theme()
		return { args: {
			outline: true,
			...args,
		} }
	},
	template: `
		<test-wrapper :outline="args.outline">
			<lib-group v-bind="args" :class="'test'">
				<lib-input labelType="none"></lib-input>
				<lib-button label="Ok"></lib-button>
			</lib-group>
		</test-wrapper>
	`,
	backgrounds: { disable: true },
})


export const Primary = Template.bind({})
export const Vertical = Template.bind({})

Vertical.args = { vertical: true }

const TemplateNested = args => ({
	...Template(args),
	template: `
		<test-wrapper :outline="args.outline">
			<lib-group v-bind="args" :class="'test'">
				<lib-input labelType="none"></lib-input>
				<lib-button label="Ok"></lib-button>
				<lib-group v-bind="{...args, vertical: !args.vertical}" :class="'test'" >
					<lib-input labelType="none"></lib-input>
					<lib-button label="Ok"></lib-button>
				</lib-group>
					<lib-group v-bind="args" :class="'test'">
						<lib-input labelType="none"></lib-input>
						<lib-button label="Ok"></lib-button>
						<lib-group v-bind="{...args, vertical: !args.vertical}" :class="'test'" >
							<lib-input labelType="none"></lib-input>
							<lib-button label="Ok"></lib-button>
						</lib-group>
						<lib-group v-bind="{...args, vertical: !args.vertical}" :class="'test'" >
							<lib-input labelType="none"></lib-input>
							<lib-button label="Ok"></lib-button>
						</lib-group>
					</lib-group>
			</lib-group>
		</test-wrapper>
	`,
})

export const NestedTODO = TemplateNested.bind({})
NestedTODO.args = { vertical: false }
