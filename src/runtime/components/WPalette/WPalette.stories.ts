/* eslint-disable @typescript-eslint/naming-convention */
import type { Meta, StoryObj } from "@storybook/vue3"

// we import because it's not part of the publicly exported components
import WPalette from "./WPalette.vue"

import { theme } from "../../theme.js"
import * as components from "../index.js"

const meta: Meta<typeof WPalette> = {
	component: WPalette,
	title: "Components/Palette",
	args: {
		// theme,
	}
}

export default meta
type Story = StoryObj<typeof WPalette>

export const Primary: Story = {
	render: args => ({
		components: {
			...components as any,
			WPalette
		},
		setup: () => ({ args: { ...args, theme } }),
		template: `
			<WPalette v-bind="{...args}">{{args.value}}</WPalette>
		`
	})
}
