/* eslint-disable @typescript-eslint/naming-convention */
import { faker } from "@faker-js/faker"
import type { Meta, StoryObj } from "@storybook/vue3"
import { reactive, ref, watch } from "vue"

import { twMerge } from "../../utils/twMerge.js"
// todo
import * as components from "../index.js"

// faker is slow, we can just choose from a few hundred pre-generated sentences
const fakerSentences = Array.from({ length: 100 }).fill(0).map(_ => faker.lorem.sentence(faker.number.int({ min: 1, max: 50 })))


type ExtraTestArgs = {
	_slots?: string
}
const meta: Meta<typeof components.WTable> = {
	component: components.WTable as any,
	title: "Components/Table"
}

export default meta
type Story = StoryObj<typeof components.WTable> & { args: ExtraTestArgs }

export const Primary: Story = {
	render: _args => {
		const args = _args as any as NonNullable<Story["args"]>
		return {
			components: components as any,
			setup: () => {
				const show = ref(true)
				const debugGrips = ref(false)
				// careful, storybook passes refs as is causing issues
				const argsReactive = reactive({
					...args,
					resizable: {
						enabled: true,
						...args.resizable
					}
				})

				return {
					args: argsReactive,
					debugGrips,
					show
				}
			},
			template: `
				<div class="p-2 flex flex-col gap-2 border rounded-md mb-10">
					Controls:
					<WButton class="flex-1" @click="args.resizable.enabled = !args.resizable.enabled">Toggle Resizable (currently {{args.resizable.enabled}})</WButton>
					<WButton @click="args.stickyHeader = !args.stickyHeader">Toggle Sticky Header (currently {{args.stickyHeader}})</WButton>
					<WButton @click="show = !show">Toggle Table</WButton>
					<WButton @click="debugGrips = !debugGrips">Toggle Debug Grips (currently {{debugGrips}})</WButton>
				</div>
				<div :class="debugGrips ? ' [&_.grip]:bg-red-500': ''">
					<WTable
						v-if="show"
						v-bind="args"
					>
						${args._slots}
					</WTable>
				</div>
		`
		}
	},
	args: {
		cols: ["prop1", "prop2", "prop3"] as any,
		values: [
			{ prop1: "Item1 Prop 1", prop2: "Item1 Prop 2", prop3: "Item1 Prop 3" },
			{ prop1: "Item2 Prop 1", prop2: "Item2 Prop 2", prop3: "Item2 Prop 3" },
			{ prop1: "Item3 Prop 1", prop2: "Item3 Prop 2", prop3: "Item3 Prop 3" }
		],
		colConfig: { prop1: { name: "Header 1" }, prop2: { name: "Header 2" } }
	}
}

export const NoCellBorders: Story = {
	...Primary,
	args: {
		...Primary.args,
		cellBorder: false
	}
}

export const NoBorders: Story = {
	...Primary,
	args: {
		...Primary.args,
		border: false
	}
}
export const NoCellBordersNoBorders: Story = {
	...Primary,
	args: {
		...Primary.args,
		cellBorder: false,
		border: false
	}
}

export const SquareBorders: Story = {
	...Primary,
	args: {
		...Primary.args,
		rounded: false
	}
}
export const NoHeader: Story = {
	...Primary,
	args: {
		...Primary.args,
		header: false
	}
}
export const NoHeaderNoBorders: Story = {
	...Primary,
	args: {
		...Primary.args,
		header: false,
		border: false
	}
}
export const NoHeaderNoCellBorders: Story = {
	...Primary,
	args: {
		...Primary.args,
		header: false,
		cellBorder: false
	}
}

export const InitialSize: Story = {
	...Primary,
	args: {
		...Primary.args,
		colConfig: {
			prop1: { name: "Initially Flex 1", resizable: true },
			prop2: { name: "Initially Flex 2", resizable: true },
			prop3: { name: "Initially Size of Header", resizable: true }
		},
		resizable: {
			enabled: true
		},
		class: `
			[&:not(.resizable-cols-setup)]:w-full
			[&:not(.resizable-cols-setup)]:block
			[&:not(.resizable-cols-setup)_thead]:block
			[&:not(.resizable-cols-setup)_thead_tr]:w-full
			[&:not(.resizable-cols-setup)_thead_tr]:flex
			[&:not(.resizable-cols-setup)_thead_tr]:flex-nowrap
			[&:not(.resizable-cols-setup)_thead_th:not(.override-initial)]:flex-1
		`,
		_slots: `
			<template #header-prop3="colProps">
				<th
					:class="\`\${colProps.class} [table:not(.resizable-cols-setup)_&]:w-[min-content] whitespace-nowrap override-initial\`"
					:style="colProps.style"
				>
					{{ colProps.config.name }}
				</th>
			</template>
		`
	}
}

export const FitWidthFalse: Story = {
	...Primary,
	args: {
		...Primary.args,
		resizable: {
			fitWidth: false
		}
	}
}


export const StickyHeader: Story = {
	...Primary,
	args: {
		...Primary.args,
		resizable: {
			enabled: true
		},
		stickyHeader: true,
		// moving the border to the wrapper is to hide the little bits of border sticking out
		// added back the right straight border otherwise the scrollbar looks ass
		// this is ever so slightly visible if there is no scrollbar
		wrapperAttrs: {
			class: `
				max-h-[50dvh]
			`
		},
		values: Array.from({ length: 200 }).fill(0).map((_, i) => ({
			prop1: `Item${i + 1} Prop 1`,
			prop2: `Item${i + 1} Prop 2`,
			prop3: `Item${i + 1} Prop 3`
		}))
	}
}


export const VirtualizedFixedHeight: Story = {
	...Primary,
	args: {
		...Primary.args,
		resizable: {
			enabled: true
		},
		virtualizerOptions: {
			enabled: true
		},
		stickyHeader: true,
		wrapperAttrs: {
			class: `
				max-h-[50dvh]
			`
		},
		values: Array.from({ length: 10000 }).fill(0).map((_, i) => ({
			prop1: `Item${i + 1} Prop 1`,
			prop2: `Item${i + 1} Prop 2`,
			prop3: `Item${i + 1} Prop 3`
		}))
	}
}


// this is not the smoothest ever, but then the tan stack example isn't either
// i think the issue is when the scrollbar gets to it's min height
export const VirtualizedDynamicHeightExperimental: Story = {
	...VirtualizedFixedHeight,
	args: {
		...VirtualizedFixedHeight.args,
		virtualizerOptions: {
			enabled: true,
			method: "dynamic",
			overscan: 5 // overscan is more expensive in dynamic mode
		},
		class: `
			[&_td]:no-truncate!
			[&_th]:no-truncate!
		`,
		values: Array.from({ length: 10000 }).fill(0).map((_, i) => ({
			prop1: `Item${i + 1} Prop 1: ${faker.helpers.arrayElement(fakerSentences)}`,
			prop2: `Item${i + 1} Prop 2: ${faker.helpers.arrayElement(fakerSentences)}`,
			prop3: `Item${i + 1} Prop 3: ${faker.helpers.arrayElement(fakerSentences)}`
		}))
	},
	parameters: {
		tags: ["skip-smoke-test"]
	}
}


export const VirtualizedFitWidthFalse: Story = {
	...VirtualizedFixedHeight,
	args: {
		...VirtualizedFixedHeight.args,
		resizable: {
			fitWidth: false
		},

		class: `
			[&_th]:no-truncate!
			[&_th]:whitespace-nowrap!
			[&:not(.resizable-cols-setup)]:w-max
			[&:not(.resizable-cols-setup)_th]:w-max
		`,
		wrapperAttrs: {
			class: `max-h-[50dvh]`
		},
		values: Array.from({ length: 10000 }).fill(0).map((_, i) => ({
			prop1: `Item${i + 1} Prop 1`,
			prop2: `Item${i + 1} Prop 2`,
			prop3: `Item${i + 1} Prop 3`
		}))

	}
}

export const ThreeColSomeColsNotResizable: Story = {
	render: args => ({
		components: components as any,
		setup: () => {
			const debugGrips = ref(false)
			return { args, debugGrips }
		},
		template: `
		<div class="flex flex-col gap-2 w-full border rounded-md mb-10">
			<WButton @click="debugGrips = !debugGrips">Toggle Debug Grips (currently {{debugGrips}})</WButton>
		</div>
		<div :class="debugGrips ? ' [&_.grip]:bg-red-500': ''">
			<div class="flex flex-col gap-2 w-full">
				<WTable
					v-bind="args"
				>
				</WTable>
				<WTable
				v-bind="{...args, colConfig:args.colConfig2}"
				>
				</WTable>
				<WTable
					v-bind="{...args, colConfig:args.colConfig3}"
				>
				</WTable>
			</div>
		</div>
		`
	}),
	args: {
		cols: ["prop1", "prop2", "prop3"],
		itemKey: "prop1",
		values: [
			{ prop1: "Prop 1", prop2: "Prop 2", prop3: "Prop 3" }
		],
		colConfig: { prop1: { name: "No Resize", resizable: false } },
		colConfig2: { prop2: { name: "No Resize", resizable: false } },
		colConfig3: { prop3: { name: "No Resize", resizable: false } }
	} as any
}
export const FourColSomeColsNotResizable: Story = {
	render: ThreeColSomeColsNotResizable.render,
	args: {
		cols: ["prop1", "prop2", "prop3", "prop4"],
		values: [
			{ prop1: "Prop 1", prop2: "Prop 2", prop3: "Prop 3", prop4: "Prop 4" }
		],
		itemKey: "prop1",
		colConfig: { prop1: { name: "No Resize", resizable: false }, prop3: { name: "No Resize", resizable: false } },
		colConfig2: { prop2: { name: "No Resize", resizable: false }, prop3: { name: "No Resize", resizable: false } },
		colConfig3: { prop1: { name: "No Resize", resizable: false }, prop4: { name: "No Resize", resizable: false } }
	} as any
}

export const ExperimentalVirtualizedComparison: Story = {
	args: {},
	render: () => ({
		components: components as any,
		setup: () => {
			const isVirtualized = ref(true)
			const rowCountInput = ref("1000")
			const useContentVisibility = ref(false)
			const values = ref(
				Array.from({ length: 1000 }).fill(0).map((_, i) => ({
					prop1: `Item${i + 1} Prop 1`,
					prop2: `Item${i + 1} Prop 2`,
					prop3: `Item${i + 1} Prop 3`
				}))
			)

			let timer: ReturnType<typeof setTimeout> | null = null
			watch(rowCountInput, () => {
				if (timer) clearTimeout(timer)
				timer = setTimeout(() => {
					const count = Math.max(1, Number.parseInt(rowCountInput.value, 10) || 0)
					values.value = Array.from({ length: count }).fill(0).map((_, i) => ({
						prop1: `Item${i + 1} Prop 1`,
						prop2: `Item${i + 1} Prop 2`,
						prop3: `Item${i + 1} Prop 3`
					}))
				}, 300)
			})

			watch(isVirtualized, v => {
				if (v) useContentVisibility.value = false
			})

			return { isVirtualized, rowCountInput, useContentVisibility, values, twMerge }
		},
		template: `
			<div class="p-2 flex flex-col gap-2 border rounded-md mb-10">
				Controls:
				<div class="flex items-center gap-2">
					<WCheckbox v-model="isVirtualized" label="Virtualized"/>
				</div>
				<div class="flex items-center gap-2">
					<label>Row count:</label>
					<input v-model="rowCountInput" type="number" min="1" class="border rounded px-2 py-1 w-24" />
				</div>
			</div>
			<WTable
				v-if="isVirtualized"
				:cols="['prop1', 'prop2', 'prop3']"
				:values="values"
				:colConfig="{ prop1: { name: 'Header 1' }, prop2: { name: 'Header 2' }, prop3: { name: 'Header 3' } }"
				:resizable="{ enabled: true }"
				:virtualizerOptions="{ enabled: true }"
				:stickyHeader="true"
				:wrapperAttrs="{ class: 'max-h-[50dvh]' }"
			></WTable>
			<WTable
				v-else
				:cols="['prop1', 'prop2', 'prop3']"
				:values="values"
				:colConfig="{ prop1: { name: 'Header 1' }, prop2: { name: 'Header 2' }, prop3: { name: 'Header 3' } }"
				:resizable="{ enabled: true }"
				:stickyHeader="true"
				:wrapperAttrs="{ class: 'max-h-[50dvh]' }"
			>
				<!-- :class=" '[&_.table--row]:animate-[rainbowBg_3s_linear_infinite]'" -->
			</WTable>
			<!-- <component is="style"> -->
			<!-- @keyframes rainbowBg { -->
			<!-- 	0% { color: hsl(0, 70%, 85%); } -->
			<!-- 	14% { color: hsl(45, 70%, 85%); } -->
			<!-- 	28% { color: hsl(90, 70%, 85%); } -->
			<!-- 	42% { color: hsl(135, 70%, 85%); } -->
			<!-- 	57% { color: hsl(180, 70%, 85%); } -->
			<!-- 	71% { color: hsl(225, 70%, 85%); } -->
			<!-- 	85% { color: hsl(270, 70%, 85%); } -->
			<!-- 	100% { color: hsl(315, 70%, 85%); } -->
			<!-- } -->
			<!-- </component> -->
		`
	})
}
