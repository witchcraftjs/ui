/* eslint-disable @typescript-eslint/naming-convention */
import type { Meta, StoryObj } from "@storybook/vue3"
import { computed, ref, watch } from "vue"

import LibPopup from "./LibPopup.vue"

import { vExtractRootEl } from "../../directives/vExtractRootEl.js"
import * as components from "../index.js"


const meta: Meta<typeof LibPopup> = {
	component: LibPopup,
	args: {

	},
}

export default meta
type Story = StoryObj<typeof LibPopup>


export const Primary: Story = {
	render: args => ({
		components,
		directives: { extractRootEl: vExtractRootEl },
		setup: () => {
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
					if (buttonI < 5) { buttonPos.value = buttonPositions[buttonI + 1] } else {
						buttonPos.value = buttonPositions[0]
					}
				}
			})


			return {
				args,
				buttonPos,
				autoRotatePos,
				buttonStyle,
				value,
			}
		},
		template: `
			<lib-input
				:suggestions="['TL', 'TR', 'BL', 'BR']"
				:restrict-to-suggestions="true"
				:suggestions-filter="(_, items) => items"
				:label="'Button Position'"
				v-model="buttonPos"
			>
			</lib-input>
			<div>
				<label>Auto Rotate Position</label>
				<input type="checkbox" v-model="autoRotatePos">
			</div>
			<div class="test" style="display:grid;height:80vh;padding:50px;border:1px solid black;">

			<lib-popup
				v-model="value"
				v-bind="{
					preferredHorizontal:args.preferredHorizontal, 
					preferredVertical:args.preferredVertical
				}"
			>
			{{value}}
				<template #button="{extractEl}">
					<lib-button :style="buttonStyle" @click="value = !value" v-extract-root-el="extractEl">Toggle Popup</lib-button>
				</template>
				<template #popup="{position, extractEl}">
					<lib-debug v-extract-root-el="extractEl" :style="args.width ? 'width: ${args.width};' : ''" class="bg-bg dark:bg-fg">
						{{ position }}
					</lib-debug>
				</template>
			</lib-popup>
			</div>
			`,
	}),
}
/** When the popup is too wide, it's positioned to the left and overflow scroll is set with an invisible scrollbar. */
export const PopupTooBig = {
	...Primary,
	args: {
		...Primary,
		width: "110vw",
	},
}
export const PopupCenterScreen = {
	...Primary,
	args: {
		...Primary,
		width: "500px",
		preferredHorizontal: ["center-screen"],
		preferredVertical: ["center-screen"],
	},
}
