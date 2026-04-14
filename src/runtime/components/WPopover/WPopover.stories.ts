/* eslint-disable @typescript-eslint/naming-convention */
import type { Meta, StoryObj } from "@storybook/vue3"
import { computed, ref, useTemplateRef, watch } from "vue"

import WPopover from "./WPopover.vue"

import * as components from "../index.js"

type ExtraTestArgs = {
	container?: Record<string, string>
}
const meta: Meta<typeof WPopover> = {
	component: WPopover,
	title: "Components/Popover",
	args: {

	}
}

export default meta
type Story = StoryObj<typeof WPopover> & { args?: ExtraTestArgs }

export const Primary: Story = {
	render: args => {
		const extraArgs = args as ExtraTestArgs
		return {
			components,
			setup: () => {
				const collisionBoundary = useTemplateRef("collisionBoundary")
				const value = ref(false)
				const buttonPositions = ["TL", "TC", "TR", "BL", "BC", "BR"] as const
				const buttonPos = ref<typeof buttonPositions[number]>("TL")
				const autoRotatePos = ref(true)
				const buttonStyle = computed(() => {
					switch (buttonPos.value) {
						case "TL": return `align-self: flex-start; justify-self: flex-start;`
						case "TC": return `align-self: flex-start; justify-self: center;`
						case "TR": return `align-self: flex-start; justify-self: flex-end;`
						case "BL": return `align-self: flex-end; justify-self: flex-start;`
						case "BC": return `align-self: flex-end; justify-self: center;`
						case "BR": return `align-self: flex-end; justify-self: flex-end;`
						default: return ""
					}
				})

				watch(value, () => {
					if (!value.value && autoRotatePos.value) {
						const buttonI = buttonPositions.indexOf(buttonPos.value)
						if (buttonI < 5) { buttonPos.value = buttonPositions[buttonI + 1]! } else {
							buttonPos.value = buttonPositions[0]!
						}
					}
				})

				return {
					args,
					buttonPos,
					autoRotatePos,
					buttonStyle,
					value,
					collisionBoundary,
					extraArgs
				}
			},
			template: `
			<WSimpleInput
				:suggestions="['TL', 'TR', 'BL', 'BR']"
				:restrict-to-suggestions="true"
				:suggestions-filter="(_, items) => items"
				:label="'Button Position'"
				v-model="buttonPos"
			>
			</WSimpleInput>
			<div>
				<label>Auto Rotate Position</label>
				<input type="checkbox" v-model="autoRotatePos">
			</div>
			<div
				ref="collisionBoundary"
				class="border border-red-500"
			>
				<div
					class="overflow-auto max-w-[100vw] max-h-[100vh]"
				>
					<div
						class="test bg-transparency-squares"
							
						:style="{
							display: 'grid',	
							width: '100vw',
							height: '80vh',
							padding: '50px',
							border: '1px solid black',
							...extraArgs.container
						}"
					>
								
					<WPopover v-model="value" v-bind="{
						...args,
						contentProps: {...args.contentProps, collisionBoundary},
						width:undefined,
						height:undefined,
					}" >
						<template #button>
							<WButton :style="buttonStyle" @click="value = !value" >Toggle Popover</WButton>
						</template>
						<template #popover>
								<WDebug
									:style="{width: args.width, height: args.height}"
									class="overflow-auto"
								>
									Popover Content
								</WDebug>
						</template>
					</WPopover>
					</div>
				</div>
			</div>
			`
		}
	}
}

export const PopoverPreventsBoundaryEscape = {
	...Primary,
	args: {
		container: {
			width: "150vw",
			height: "150vh"
		}
	}
}
export const PopoverAllowBoundaryEscape = {
	...Primary,
	args: {
		contentProps: {
			sticky: "partial"
		},
		container: {
			width: "150vw",
			height: "150vh"
		}
	}
}
/** Should cover button due to prioritizePosition */
export const PopoverPositionPriority = {
	...Primary,
	args: {
		height: "500px",
		contentProps: {
			prioritizePosition: true,
			side: "top"
		},
		container: {
			width: "150vw",
			height: "150vh"
		}
	}
}
/** When the popover is too wide, it's set to overscroll content although ideally the popover should scroll it's own content. */
export const PopoverTooBig = {
	...Primary,
	args: {
		width: "110vw",
		height: "110vh"
	}
}
export const PopoverRightStart = {
	...Primary,
	args: {
		contentProps: {
			side: "right",
			align: "start"
		}
	}
}

export const PopoverLeftEnd = {
	...Primary,
	args: {
		contentProps: {
			side: "left",
			align: "end"
		}
	}
}
export const PopoverBottomStart = {
	...Primary,
	args: {
		contentProps: {
			side: "bottom",
			align: "start"
		}
	}
}

export const PopoverTopEnd = {
	...Primary,
	args: {
		contentProps: {
			side: "top",
			align: "end"
		}
	}
}

export const RightMenuShapeExample = {
	...Primary,
	args: {
		contentProps: {
			width: "300px",
			height: "500px",
			side: "right",
			align: "start"
		},
		animationDirection: "use-align"
	}
}
