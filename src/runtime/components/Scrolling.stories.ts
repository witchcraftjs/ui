/* eslint-disable @typescript-eslint/naming-convention */
import type { Meta, StoryObj } from "@storybook/vue3"

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
const meta: Meta<{}> = {
	title: "Other/Scrolling",
	args: {

	}
}

export default meta
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
type Story = StoryObj<{}>

export const Scrollbars: Story = {
	render: args => ({
		setup: () => ({ args }),
		template: `
		<div 
			class="
				relative
				flex
				flex-col
				max-h-[300px]
				max-w-[300px]
				border-2
				border-neutral-500
			"
			
		>
			<div 
				class="overflow-auto"
			>
				<div class="h-[1000px] w-[1000px]"/>
			</div>
		</div>
		`
	})
}

export const TextareaResizer: Story = {
	render: args => ({
		setup: () => ({ args }),
		template: `
			<textarea class="
				border-2
				border-neutral-500
				min-w-[200px]
				min-h-[200px]
				[resize:both]
			" />
		`
	})
}
