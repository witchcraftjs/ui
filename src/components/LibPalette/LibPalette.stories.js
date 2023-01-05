import "../../assets/global.scss"

import { library } from "@fortawesome/fontawesome-svg-core"
import { far } from "@fortawesome/free-regular-svg-icons"
import { fas } from "@fortawesome/free-solid-svg-icons"

import { theme } from "../../helpers"
import TestWrapper from "../../TestWrapper.vue"

import { LibButton, LibInput, LibPalette } from ".."


library.add(fas, far)

export default {
	title: "Example/Palette",
	component: LibPalette,
	argTypes: {
	},
}

const Template = args => ({
	components: { TestWrapper, LibPalette, LibInput, LibButton },
	setup() {
		theme()
		return { args: {
			outline: true,
			...args,
		} }
	},
	template: `
		<test-wrapper :outline="args.outline">
			<lib-palette >
			</lib-palette>
		</test-wrapper>
	`,
	backgrounds: { disable: true },
})


export const Primary = Template.bind({})
