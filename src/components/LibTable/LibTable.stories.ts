/* eslint-disable @typescript-eslint/naming-convention */
import type { Meta, StoryObj } from "@storybook/vue3"

import LibTable from "./LibTable.vue"

import * as components from "../index.js"


const meta: Meta<typeof LibTable> = {
	// @ts-expect-error ???
	component: LibTable,
}

export default meta
type Story = StoryObj<typeof LibTable>
export const Primary: Story = {
	render: args => ({
		components,
		setup: () => ({ args }),
		template: `
			<test-wrapper :outline="args.outline">
				<div class="overflow-x-scroll scrollbar-hide">
					<lib-table
						v-bind="args"
					>
					</lib-table>
				</div>
			</test-wrapper>
		`,
	}),
	args: {
		cols: ["prop1", "prop2", "prop3"],
		values: [
			{ prop1: "Item1 Prop 1", prop2: "Item1 Prop 2", prop3: "Item1 Prop 3" },
			{ prop1: "Item2 Prop 1", prop2: "Item2 Prop 2", prop3: "Item2 Prop 3" },
			{ prop1: "Item3 Prop 1", prop2: "Item3 Prop 2", prop3: "Item3 Prop 3" },
		],
		colInfo: { prop1: { name: "Header 1" }, prop2: { name: "Header 2" } },
	},
}

export const NoCellBorders: Story = {
	...Primary,
	args: {
		...Primary.args,
		cellBorder: false,
	},
}
export const NoBorders: Story = {
	...Primary,
	args: {
		...Primary.args,
		border: false,
	},
}
export const NoCellBordersNoBorders: Story = {
	...Primary,
	args: {
		...Primary.args,
		cellBorder: false,
		border: false,
	},
}

export const SquareBorders: Story = {
	...Primary,
	args: {
		...Primary.args,
		rounded: false,
	},
}
export const NoHeader: Story = {
	...Primary,
	args: {
		...Primary.args,
		header: false,
	},
}
export const NoHeaderNoBorders: Story = {
	...Primary,
	args: {
		...Primary.args,
		header: false,
		border: false,
	},
}
export const NoHeaderNoCellBorders: Story = {
	...Primary,
	args: {
		...Primary.args,
		header: false,
		cellBorder: false,
	},
}
export const FitWidthFalse: Story = {
	...Primary,
	args: {
		...Primary.args,
		resizable: {
			fitWidth: false,
		},
	},
}

export const ThreeColSomeColsNotResizable: Story = {
	render: args => ({
		components,
		setup: () => ({ args }),
		template: `
			<test-wrapper :outline="args.outline">
				<lib-table
					v-bind="args"
				>
				</lib-table>
				<br>
				<lib-table
				v-bind="{...args, colInfo:args.colInfo2}"
				>
			</lib-table>
			<br>
				<lib-table
					v-bind="{...args, colInfo:args.colInfo3}"
				>
				</lib-table>
			</test-wrapper>
		`,
	}),
	args: {
		cols: ["prop1", "prop2", "prop3"],
		values: [
			{ prop1: "Prop 1", prop2: "Prop 2", prop3: "Prop 3" },
		],
		colInfo: { prop1: { name: "No Resize", resizable: false } },
		colInfo2: { prop2: { name: "No Resize", resizable: false } },
		colInfo3: { prop3: { name: "No Resize", resizable: false } },
	} as any,
}
export const FourColSomeColsNotResizable: Story = {
	render: args => ({
		components,
		setup: () => ({ args }),
		template: `
			<test-wrapper :outline="args.outline">
				<lib-table
					v-bind="args"
				>
				</lib-table>
				<br>
				<lib-table
				v-bind="{...args, colInfo:args.colInfo2}"
				>
			</lib-table>
			<br>
				<lib-table
					v-bind="{...args, colInfo:args.colInfo3}"
				>
				</lib-table>
			</test-wrapper>
		`,
	}),
	args: {
		cols: ["prop1", "prop2", "prop3", "prop4"],
		values: [
			{ prop1: "Prop 1", prop2: "Prop 2", prop3: "Prop 3", prop4: "Prop 4" },
		],
		colInfo: { prop1: { name: "No Resize", resizable: false }, prop3: { name: "No Resize", resizable: false } },
		colInfo2: { prop2: { name: "No Resize", resizable: false }, prop3: { name: "No Resize", resizable: false } },
		colInfo3: { prop1: { name: "No Resize", resizable: false }, prop4: { name: "No Resize", resizable: false } },
	} as any,
}

