/* eslint-disable @typescript-eslint/naming-convention */
import type { Meta, StoryObj } from "@storybook/vue3"

import LibTable from "./LibTable.vue"

// todo
import * as components from "../index.js"

const meta: Meta<typeof LibTable> = {
	component: LibTable as any,
	title: "Components/Table"
}

export default meta
type Story = StoryObj<typeof LibTable> & { args: { slots?: string } }
export const Primary: Story = {
	render: args => ({
		components,
		setup: () => ({ args }),
		template: `
				<div class="overflow-x-scroll scrollbar-hidden">
					<lib-table
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
		colConfig: { prop1: { name: "Header 1" }, prop2: { name: "Header 2" } },
		itemKey: "prop1"
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
			[&:not(.resizable-cols-setup)]:block
			[&:not(.resizable-cols-setup)_thead]:block
			[&:not(.resizable-cols-setup)_thead_tr]:w-full
			[&:not(.resizable-cols-setup)_thead_tr]:flex
			[&:not(.resizable-cols-setup)_thead_tr]:flex-nowrap
			[&:not(.resizable-cols-setup)_thead_td:not(.override-initial)]:flex-1
		`,
		slots: `
			<template #header-prop3="colProps">
			<td
				:class="\`\${colProps.class} w-[min-content] whitespace-nowrap override-initial\`"
			>
				{{ colProps.config.name }}
			</td>
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

export const ThreeColSomeColsNotResizable: Story = {
	render: args => ({
		components,
		setup: () => ({ args }),
		template: `
			<lib-table
				v-bind="args"
			>
			</lib-table>
			<br>
			<lib-table
			v-bind="{...args, colConfig:args.colConfig2}"
			>
			</lib-table>
			<br>
			<lib-table
				v-bind="{...args, colConfig:args.colConfig3}"
			>
			</lib-table>
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
	render: args => ({
		components,
		setup: () => ({ args }),
		template: `
				<lib-table
					v-bind="args"
				>
				</lib-table>
				<br>
				<lib-table
				v-bind="{...args, colConfig:args.colConfig2}"
				>
			</lib-table>
			<br>
				<lib-table
					v-bind="{...args, colConfig:args.colConfig3}"
				>
				</lib-table>
		`
	}),
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
