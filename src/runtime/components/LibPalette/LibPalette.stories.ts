/* eslint-disable @typescript-eslint/naming-convention */
import type { Meta, StoryObj } from "@storybook/vue3"

import LibPalette from "./LibPalette.vue"

import { theme } from "../../theme.js"
// eslint-disable-next-line @typescript-eslint/no-restricted-imports
import * as components from "../index.js"


const meta: Meta<typeof LibPalette> = {
	component: LibPalette,
	title: "Components/Palette",
	args: {
		// theme,
	},
}

export default meta
type Story = StoryObj<typeof LibPalette>


export const Primary: Story = {
	render: args => ({
		components: { ...components, LibPalette },
		setup: () => ({ args: { ...args, theme } }),
		template: `
			<LibPalette v-bind="{...args}">{{args.value}}</LibPalette>
		`,
	}),
}

