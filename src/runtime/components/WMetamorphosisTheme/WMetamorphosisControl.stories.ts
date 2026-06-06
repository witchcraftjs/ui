/* eslint-disable @typescript-eslint/naming-convention */
import type { Meta, StoryObj } from "@storybook/vue3"
import { ControlVar, Units } from "metamorphosis"
import { markRaw } from "vue"

import WMetamorphosisControl from "./WMetamorphosisControl.vue"

import * as components from "../index.js"

/** Note that unlike all other components the sub-components cannot v-model. */
const meta: Meta<typeof WMetamorphosisControl> = {
	component: WMetamorphosisControl,
	title: "Components/MetamorphosisTheme/internal/MetamorphosisControl",
	args: {}
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
type ExtraTestArgs = {
}
export default meta
type Story = StoryObj<typeof WMetamorphosisControl> & { args?: ExtraTestArgs }

/** Color space control variants (rgb, hsl, oklch, oklab). */
export const ColorSpaces: Story = {
	tags: ["skip-smoke-test"],
	render: _args => {
		const args = _args as any as NonNullable<Story["args"]>
		return {
			components: {
				...components as any,
				WMetamorphosisControl
			},
			setup() {
				const rgbVar = markRaw(new ControlVar(Units.rgb, { r: 204, g: 51, b: 51 }))
				const hslVar = markRaw(new ControlVar(Units.hsl, { h: 200, s: 70, l: 50 }))
				const oklchVar = markRaw(new ControlVar(Units.oklch, { l: 70, c: 0.1, h: 80 }))
				const oklabVar = markRaw(new ControlVar(Units.oklab, { l: 0.9, a: 0, b: 0.01 }))

				return {
					args,
					rgbVar,
					hslVar,
					oklchVar,
					oklabVar
				}
			},
			template: `
			<div class="flex flex-col gap-2 items-start">
				<WMetamorphosisControl v-bind="{...args,  controlVar: rgbVar}" />
				<WMetamorphosisControl v-bind="{...args,  controlVar: hslVar}" />
				<WMetamorphosisControl v-bind="{...args,  controlVar: oklchVar}" />
				<WMetamorphosisControl v-bind="{...args,  controlVar: oklabVar}" />
			</div>
		`
		}
	}
}

/** Numeric unit control variants (px, num, deg). */
export const NumericUnits: Story = {
	render: _args => {
		const args = _args as any as NonNullable<Story["args"]>
		return {
			components: components as any,
			setup() {
				const pyVar = markRaw(new ControlVar(Units.px, 16))
				const numVar = markRaw(new ControlVar(Units.num, 0.5))
				const degVar = markRaw(new ControlVar(Units.deg, 45))

				return {
					args,
					pyVar,
					numVar,
					degVar
				}
			},
			template: `
			<div class="grid grid-cols-2 gap-2 items-start">
				<WMetamorphosisControl v-bind="{...args, controlVar: pyVar}" />

				<WMetamorphosisControl v-bind="{...args, controlVar: numVar}" />

				<WMetamorphosisControl v-bind="{...args, controlVar: degVar}" />
			</div>
		`
		}
	}
}

/** String unit control variant. */
export const StringValue: Story = {
	tags: ["skip-smoke-test"],
	render: _args => {
		const args = _args as any as NonNullable<Story["args"]>
		return {
			components: components as any,
			setup() {
				const strVar = markRaw(new ControlVar(Units.str, "some string"))

				return {
					args,
					strVar
				}
			},
			template: `
			<div class="grid grid-cols-2 gap-2 items-start">
				<WMetamorphosisControl v-bind="{...args, controlVar: strVar}" />
			</div>
		`
		}
	}
}
