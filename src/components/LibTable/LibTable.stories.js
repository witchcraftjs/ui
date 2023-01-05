import "../../assets/global.scss"

import { library } from "@fortawesome/fontawesome-svg-core"
import { far } from "@fortawesome/free-regular-svg-icons"
import { fas } from "@fortawesome/free-solid-svg-icons"

import { theme } from "../../helpers"
import TestWrapper from "../../TestWrapper.vue"

import { LibButton, LibInput, LibTable } from ".."


library.add(fas, far)

export default {
	title: "Example/Table",
	component: LibTable,
	argTypes: {
	},
}


const Template = args => ({
	components: { TestWrapper, LibTable, LibInput, LibButton },
	backgrounds: { disable: true },
	setup() {
		theme()
		return {
			args: {
				outline: true,
				...args,
			},
		}
	},
	template: `
		<test-wrapper :outline="args.outline">
			<lib-table v-bind="args">
				<thead>
					<tr>
						<th><div>Header 1</div></th>
						<th><div>Header 2</div></th>
						<th><div>Header 3</div></th>
					</tr>
				</thead>
				<tr>
					<td><div>One</div></td>
					<td><div>Two</div></td>
					<td><div>Three</div></td>
				</tr>
				<tr>
					<td><div>Four</div></td>
					<td><div>Five</div></td>
					<td><div>Six</div></td>
				</tr>
			</lib-table>
		</test-wrapper>
	`,
})
const TemplateEmpty = args => ({
	...Template(args),
	template: `
		<test-wrapper :outline="args.outline">
			<lib-table v-bind="args">
				<thead>
					<th><div>Header 1</div></th>
					<th><div>Header 2</div></th>
					<th><div>Header 3</div></th>
				</thead>
			</lib-table>
		</test-wrapper>
	`,
})
const TemplateRows = args => ({
	...Template(args),
	template: `
		<test-wrapper :outline="args.outline">
			<lib-table v-bind="args">
				<tr>
					<th><div>One</div></th>
					<th><div>Two</div></th>
					<th><div>Three</div></th>
				</tr>
				<tr>
					<th><div>Four</div></th>
					<th><div>Five</div></th>
					<th><div>Six</div></th>
				</tr>
			</lib-table>
		</test-wrapper>
	`,
})
const TemplateMixedResizable = args => ({
	...Template(args),
	template: `
		<test-wrapper :outline="args.outline">
			<lib-table v-bind="args">
				<tr>
					<th class="no-resize"><div>One No Resize</div></th>
					<th><div>Two</div></th>
					<th><div>Three</div></th>
				</tr>
			</lib-table>
			<lib-table v-bind="args">
				<tr>
					<th><div>One</div></th>
					<th class="no-resize"><div>Two No Resize</div></th>
					<th><div>Three</div></th>
				</tr>
			</lib-table>
			<lib-table v-bind="args">
				<tr>
					<th><div>One</div></th>
					<th><div>Two</div></th>
					<th class="no-resize"><div>Three No Resize</div></th>
				</tr>
			</lib-table>
			<lib-table v-bind="args">
				<tr>
					<th class="no-resize"><div>One No Resize</div></th>
					<th><div>Two</div></th>
					<th class="no-resize"><div>Three No Resize</div></th>
					<th><div>Four</div></th>
				</tr>
			</lib-table>
			<lib-table v-bind="args">
				<tr>
					<th><div>Two</div></th>
					<th class="no-resize"><div>Two No Resize</div></th>
					<th class="no-resize"><div>Three No Resize</div></th>
					<th><div>Four</div></th>
				</tr>
			</lib-table>
			<lib-table v-bind="args">
				<tr>
					<th class="no-resize"><div>One No Resize</div></th>
					<th><div>Two</div></th>
					<th><div>Three</div></th>
					<th class="no-resize"><div>Four No Resize</div></th>
				</tr>
			</lib-table>
		</test-wrapper>
	`,
})


export const Primary = Template.bind({})
export const AlternateRows = Template.bind({})
AlternateRows.args = {
	rows: "even",
}
export const RoundedBorders = Template.bind({})
RoundedBorders.args = {
	border: "rounded",
	rows: "even",
}
export const RoundedOnlyHeader = TemplateEmpty.bind({})
RoundedOnlyHeader.args = {
	border: "rounded",
}
export const RoundedOnlyRows = TemplateRows.bind({})
RoundedOnlyRows.args = {
	border: "rounded",
}

export const NoBorders = Template.bind({})
NoBorders.args = {
	border: "none",
	rows: "even",
}

export const NoBordersOnlyHeader = TemplateEmpty.bind({})
NoBordersOnlyHeader.args = {
	border: "none",
}
export const NoBordersOnlyRows = TemplateRows.bind({})
NoBordersOnlyRows.args = {
	border: "none",
	rows: "even",
}


export const FitWidthFalse = Template.bind({})
FitWidthFalse.args = {
	resizable: { fitWidth: false },
}
export const NonResizableColumns = TemplateMixedResizable.bind({})
NonResizableColumns.args = {
	resizable: { fitWidth: false },
}
export const NonResizableColumnsFitWidth = TemplateMixedResizable.bind({})
NonResizableColumnsFitWidth.args = {
	resizable: { fitWidth: true },
}

