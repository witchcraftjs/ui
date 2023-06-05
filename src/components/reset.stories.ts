/* eslint-disable @typescript-eslint/naming-convention */
import type { Meta, StoryObj } from "@storybook/vue3"


const meta: Meta<{}> = {
	title: "Reset",
	args: {

	},
}

export default meta
type Story = StoryObj<{}>


export const Primary: Story = {
	render: args => ({
		setup: () => ({ args }),
		template: `
			<h1>h1 Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer ullamcorper est at dui eleifend, et egestas libero gravida. Phasellus non erat pretium, commodo massa sit amet, accumsan nisl.</h1>
			<h2>h2 Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer ullamcorper est at dui eleifend, et egestas libero gravida. Phasellus non erat pretium, commodo massa sit amet, accumsan nisl.</h2>
			<h3>h3 Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer ullamcorper est at dui eleifend, et egestas libero gravida. Phasellus non erat pretium, commodo massa sit amet, accumsan nisl.</h3>
			<h4>h4 Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer ullamcorper est at dui eleifend, et egestas libero gravida. Phasellus non erat pretium, commodo massa sit amet, accumsan nisl.</h4>
			<h5>h5 Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer ullamcorper est at dui eleifend, et egestas libero gravida. Phasellus non erat pretium, commodo massa sit amet, accumsan nisl.</h5>
			<h6>h6 Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer ullamcorper est at dui eleifend, et egestas libero gravida. Phasellus non erat pretium, commodo massa sit amet, accumsan nisl.</h6>
			<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer ullamcorper est at dui eleifend, et egestas libero gravida. Phasellus non erat pretium, commodo massa sit amet, accumsan nisl.</p>
		`,
	}),
}

