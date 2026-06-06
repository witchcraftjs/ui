/* eslint-disable @typescript-eslint/naming-convention */
import type { Meta, StoryObj } from "@storybook/vue3"
import { ControlVar, InterpolatedVars, Units } from "metamorphosis"

// we import because it's not part of the publicly exported components
import WMetamorphosisInterpolatedColors from "./WMetamorphosisInterpolatedColors.vue"

import * as components from "../index.js"

const meta: Meta<typeof WMetamorphosisInterpolatedColors> = {
	component: WMetamorphosisInterpolatedColors,
	title: "Components/MetamorphosisTheme/internal/MetamorphosisInterpolatedColors",
	args: {},
	parameters: {
		argTypes: {
			_interpolatedVars: {
				table: { disable: true }
			}
		}
	}
}


export default meta
type ExtraTestArgs = {
	_interpolatedVars?: InterpolatedVars<any>
}

type Story = StoryObj<typeof WMetamorphosisInterpolatedColors> & { args?: ExtraTestArgs }


/** Two-stop RGB color interpolation with explicit stops [0, 1]. */
export const Primary: Story = {
	tags: ["skip-smoke-test"],
	render: _args => {
		const args = _args as any as NonNullable<Story["args"]>
		return {
			components: {
				...components as any,
				WMetamorphosisInterpolatedColors
			},
			setup() {
				return {
					args
				}
			},
			template: `
			<div class="flex flex-col gap-4">
				<WMetamorphosisInterpolatedColors v-bind="{
					interpolatedVars: args._interpolatedVars,
					...args,
				}" />
			</div>
		`
		}
	},
	args: {
		_interpolatedVars: new InterpolatedVars("color", Units.rgb, [
			new ControlVar(Units.rgb, { r: 255, g: 0, b: 0 }),
			new ControlVar(Units.rgb, { r: 0, g: 0, b: 255 })
		], [0, 1])
	}
}

/** Two-stop RGB color interpolation without explicit stops. */
export const Stopless: Story = {
	tags: ["skip-smoke-test"],
	...Primary,
	args: {
		_interpolatedVars: new InterpolatedVars("color", Units.rgb, [
			new ControlVar(Units.rgb, { r: 255, g: 0, b: 0 }),
			new ControlVar(Units.rgb, { r: 0, g: 0, b: 255 })
		])
	}
}

/** Three-stop RGB interpolation with stop-switching disabled. */
export const MultipleStoplessWithChangeDisallowed: Story = {
	tags: ["skip-smoke-test"],
	...Primary,
	args: {
		allowSwitchingStopsMode: false,
		_interpolatedVars: new InterpolatedVars("color", Units.rgb, [
			new ControlVar(Units.rgb, { r: 255, g: 0, b: 0 }),
			new ControlVar(Units.rgb, { r: 0, g: 0, b: 255 }),
			new ControlVar(Units.rgb, { r: 0, g: 255, b: 0 })
		], [0, 0.5, 1])

	}
}

/** RGB color interpolation with step modification disabled. */
export const StepsDisabled: Story = {
	tags: ["skip-smoke-test"],
	...Primary,
	args: {
		_interpolatedVars: new InterpolatedVars("color", Units.rgb, [
			new ControlVar(Units.rgb, { r: 255, g: 0, b: 0 }),
			new ControlVar(Units.rgb, { r: 0, g: 0, b: 255 })
		]),
		allowModifyingSteps: false
	}
}
