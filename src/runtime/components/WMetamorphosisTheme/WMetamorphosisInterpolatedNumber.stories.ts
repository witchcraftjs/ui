/* eslint-disable @typescript-eslint/naming-convention */
import type { Meta, StoryObj } from "@storybook/vue3"
import { ControlVar, InterpolatedVars, Units } from "metamorphosis"

// we import because it's not part of the publicly exported components
import WMetamorphosisInterpolatedNumber from "./WMetamorphosisInterpolatedNumber.vue"

import * as components from "../index.js"

const meta: Meta<typeof WMetamorphosisInterpolatedNumber> = {
	component: WMetamorphosisInterpolatedNumber,
	title: "Components/MetamorphosisTheme/internal/MetamorphosisInterpolatedNumber",
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

type Story = StoryObj<typeof WMetamorphosisInterpolatedNumber> & { args?: ExtraTestArgs }


/** Two-stop numeric interpolation (0 to 100) with explicit stops [0, 1]. */
export const Primary: Story = {
	tags: ["skip-smoke-test"],
	render: _args => {
		const args = _args as any as NonNullable<Story["args"]>
		return {
			components: {
				...components as any,
				WMetamorphosisInterpolatedNumber
			},
			setup() {
				return {
					args
				}
			},
			template: `
			<div class="flex flex-col gap-4">
				<WMetamorphosisInterpolatedNumber v-bind="{
					interpolatedVars: args._interpolatedVars,
					...args,
				}" />
			</div>
		`
		}
	},
	args: {
		_interpolatedVars: new InterpolatedVars("spacing", Units.px, [new ControlVar(Units.num, 0), new ControlVar(Units.num, 100)], [0, 1])
	}
}

/** Two-stop numeric interpolation without explicit stops. */
export const Stopless: Story = {
	tags: ["skip-smoke-test"],
	...Primary,
	args: {
		_interpolatedVars: new InterpolatedVars("spacing", Units.px, [new ControlVar(Units.num, 0), new ControlVar(Units.num, 100)])
	}
}

/** Three-stop numeric interpolation with stop-switching disabled. */
export const MultipleStoplessWithChangeDisallowed: Story = {
	tags: ["skip-smoke-test"],
	...Primary,
	args: {
		allowSwitchingStopsMode: false,
		_interpolatedVars: new InterpolatedVars("spacing", Units.px, [new ControlVar(Units.num, 0), new ControlVar(Units.num, 100), new ControlVar(Units.num, 30)], [0, 0.5, 1])

	}
}

/** Numeric interpolation with step modification disabled. */
export const StepsDisabled: Story = {
	tags: ["skip-smoke-test"],
	...Primary,
	args: {
		_interpolatedVars: new InterpolatedVars("spacing", Units.px, [new ControlVar(Units.num, 0), new ControlVar(Units.num, 100)]),
		allowModifyingSteps: false
	}
}

export const ForceDisplayStopHandles: Story = {
	tags: ["skip-smoke-test"],
	...Primary,
	args: {
		_interpolatedVars: new InterpolatedVars("spacing", Units.px, [new ControlVar(Units.num, 0), new ControlVar(Units.num, 100)], [0, 1]),
		forceDisplayStopHandles: true
	}
}
