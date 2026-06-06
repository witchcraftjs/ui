/* eslint-disable @typescript-eslint/naming-convention */
import type { Meta, StoryObj } from "@storybook/vue3"
import { ControlVar, InterpolatedVars, Theme, Units } from "metamorphosis"
import { baseTheme } from "metamorphosis/BaseTheme"
import { markRaw, ref, watch } from "vue"

import type { MetamorphosisInterpolatedVarsProps } from "./types.js"

import * as components from "../index.js"

const meta: Meta<typeof components.WMetamorphosisTheme> = {
	component: components.WMetamorphosisTheme,
	title: "Components/MetamorphosisTheme",
	args: {}
}


export default meta
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
type ExtraTestArgs = {
}

type Story = StoryObj<typeof components.WMetamorphosisTheme> & { args?: ExtraTestArgs }


/** The default baseTheme from metamorphosis (spacing, bg, fg, ok, warning, danger, accent). */
export const Primary: Story = {
	tags: ["skip-smoke-test"],
	render: _args => {
		const args = _args as any as NonNullable<Story["args"]>
		return {
			components: components as any,
			setup() {
				return {
					args,
					theme: markRaw(baseTheme)
				}
			},
			template: `
			<div class="flex flex-col gap-4 w-full max-w-xl">
				<WMetamorphosisTheme v-bind="{
					...args,
					theme
				}" />
			</div>
		`
		}
	},
	args: {
		options: {
			forceDisplayStopHandles: true
		} satisfies Partial<MetamorphosisInterpolatedVarsProps>
	}
}

/** A custom theme with all three supported variable types: a numeric ControlVar, a color InterpolatedVars, and a numeric InterpolatedVars. */
export const CustomTheme: Story = {
	render: _args => {
		const args = _args as any as NonNullable<Story["args"]>
		return {
			components: components as any,
			setup() {
				const radius = new ControlVar(Units.px, 20)

				const gradient = new InterpolatedVars("gradient", Units.rgb, [
					new ControlVar(Units.rgb, { r: 255, g: 50, b: 50 }),
					new ControlVar(Units.rgb, { r: 50, g: 100, b: 255 }),
					new ControlVar(Units.rgb, { r: 50, g: 255, b: 100 })
				], [0, 0.5, 1])

				const spacing = new InterpolatedVars("spacing", Units.px, [
					new ControlVar(Units.px, { _: 0 }),
					new ControlVar(Units.px, { _: 8 }),
					new ControlVar(Units.px, { _: 16 })
				], [0, 0.3, 1])

				const theme = markRaw(new Theme({
					radius,
					gradient,
					spacing
				}))

				const dummyEl = ref<HTMLElement | null>(null)
				watch(dummyEl, () => {
					if (dummyEl.value) {
						theme.attach(dummyEl.value)
					} else {
						theme.detach()
					}
				})

				const css = ref(JSON.stringify(theme.css, null, "\t"))
				theme.on("change", () => {
					css.value = JSON.stringify(theme.css, null, "\t")
				})

				return {
					args,
					css,
					dummyEl,
					theme
				}
			},
			template: `
			<div class="flex flex-col gap-4 w-full max-w-xl">
				<WMetamorphosisTheme v-bind="{
					...args,
					theme
				}" />
				<div ref="dummyEl" class="border-2 border-neutral-500 rounded-lg flex flex-col gap-[5px] p-[10px]">
					Theme is attached to this dummy element.

					<div class="min-h-[1.5rem]">
						<div class="rounded-full whitespace-nowrap w-[var(--radius)] h-[var(--radius)] border-2 border-neutral-500">--radius</div>
					</div>
					<div class="w-[var(--spacing-2)] h-[1.5rem] border border-neutral-500 whitespace-nowrap">--spacing-2</div>


					<div class="w-full h-[20px] bg-[var(--gradient-2)]">--gradient-2</div>
					</div>
					<WDebug :value="css"></WDebug>
			</div>
		`
		}
	},
	args: {
		options: {
			forceDisplayStopHandles: true
		} satisfies Partial<MetamorphosisInterpolatedVarsProps>
	}
}
