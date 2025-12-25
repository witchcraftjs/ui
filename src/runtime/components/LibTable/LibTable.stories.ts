/* eslint-disable @typescript-eslint/naming-convention */
import { faker } from "@faker-js/faker"
import type { Meta, StoryObj } from "@storybook/vue3"
import { reactive, ref } from "vue"

import LibTable from "./LibTable.vue"

// todo
import * as components from "../index.js"

// faker is slow, we can just choose from a few hundred pre-generated sentences
const fakerSentences = Array.from({ length: 100 }).fill(0).map(_ => faker.lorem.sentence(faker.number.int({ min: 1, max: 50 })))

const meta: Meta<typeof LibTable> = {
	component: LibTable as any,
	title: "Components/Table"
}

export default meta
type Story = StoryObj<typeof LibTable> & { args: {
	slots?: string
	wrapperClass?: string
} }
export const Primary: Story = {
	render: args => ({
		components,
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
						<LibButton class="flex-1" @click="args.resizable.enabled = !args.resizable.enabled">Toggle Resizable (currently {{args.resizable.enabled}})</LibButton>
					<LibButton @click="args.stickyHeader = !args.stickyHeader">Toggle Sticky Header (currently {{args.stickyHeader}})</LibButton>
					<LibButton @click="show = !show">Toggle Table</LibButton>
					<LibButton @click="debugGrips = !debugGrips">Toggle Debug Grips (currently {{debugGrips}})</LibButton>
					</div>
				</div>
				<div :class="debugGrips ? ' [&_.grip]:bg-red-500': ''">
					<lib-table
						v-if="show"
						v-bind="args"
					>
						${(args as any).slots}
					</lib-table>
				</div>
		`
	}),
	args: {
		cols: ["prop1", "prop2", "prop3"],
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
		slots: `
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
		wrapperClass: `
			max-h-[50dvh]
		`,
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
		wrapperClass: `
			max-h-[50dvh]
		`,
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
		wrapperClass: `
			max-h-[50dvh]
		`,
		values: Array.from({ length: 10000 }).fill(0).map((_, i) => ({
			prop1: `Item${i + 1} Prop 1`,
			prop2: `Item${i + 1} Prop 2`,
			prop3: `Item${i + 1} Prop 3`
		}))

	}
}

export const ThreeColSomeColsNotResizable: Story = {
	render: args => ({
		components,
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
				<lib-table
					v-bind="args"
				>
				</lib-table>
				<lib-table
				v-bind="{...args, colConfig:args.colConfig2}"
				>
				</lib-table>
				<lib-table
					v-bind="{...args, colConfig:args.colConfig3}"
				>
				</lib-table>
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
