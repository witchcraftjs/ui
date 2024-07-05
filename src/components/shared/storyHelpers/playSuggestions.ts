/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { expect, userEvent, within } from "@storybook/test"


export const playBasicSelect = async ({ canvasElement, args }: { canvasElement: HTMLElement, args: any }) => {
	const canvas = within(canvasElement)
	const input = canvas.getByLabelText(args.label ?? "", { selector: "input" })
	await userEvent.type(input, "A")
	await expect(canvas.queryByRole("option", { name: "A", selected: true })).toBeInTheDocument()
	await userEvent.type(input, "BCDE")
	// partial match
	await expect(canvas.queryByRole("option", { name: "ABCDEFGHIJKLMNOPQRSTUVWXYZ", selected: true })).toBeInTheDocument()
	await userEvent.keyboard("{Enter}")
	// should be closed after enter
	await expect(canvas.queryByRole("listbox")).toBeNull()
	await userEvent.keyboard("{Backspace}")
	await expect(canvas.queryByRole("option",{ selected: true })).toBeInTheDocument()
	await userEvent.clear(input)
	await userEvent.type(input, "unmatched")
	await expect(canvas.queryAllByRole("option", { selected: true })).toEqual([])
	await userEvent.clear(input)
	// first match should be selected if input is empty
	await expect(await canvas.findByRole("option", { name: "A", selected: true })).toBeInTheDocument()
	await userEvent.keyboard("{Enter}")
	await userEvent.clear(input)
	await userEvent.keyboard("{Escape}")
	await expect(canvas.queryByRole("listbox")).toBeNull()
	if (args.restrictToSuggestions) {
		await expect(canvas.getByTestId("model-value")).toHaveTextContent("A")
	} else {
		await expect(canvas.getByTestId("model-value")).toHaveTextContent("")
	}
}

export const playBasicKeyboardSelect = async ({ canvasElement, args }: { canvasElement: HTMLElement , args: any }) => {
	const canvas = within(canvasElement)
	const input = canvas.getByLabelText(args.label ?? "", { selector: "input" })
	await userEvent.clear(input)
	await userEvent.type(input, "A")
	await expect(canvas.queryByRole("option", { name: "A", selected: true })).toBeInTheDocument()
	await userEvent.keyboard("{ArrowDown}")
	await expect(canvas.queryByRole("option", { name: "AB", selected: true })).toBeInTheDocument()
	await userEvent.keyboard("{ArrowUp}")
	await expect(canvas.queryByRole("option", { name: "A", selected: true })).toBeInTheDocument()

	// loops to last item
	await userEvent.keyboard("{ArrowUp}")
	await expect(canvas.queryByRole("option", { name: "ABCDEFGHIJKLMNOPQRSTUVWXYZ", selected: true })).toBeInTheDocument()

	// loops back to the first item
	await userEvent.keyboard("{ArrowDown}")
	await expect(canvas.queryByRole("option", { name: "A", selected: true })).toBeInTheDocument()

	// goes to last
	await userEvent.keyboard("{PageDown}")
	await expect(canvas.queryByRole("option", { name: "ABCDEFGHIJKLMNOPQRSTUVWXYZ", selected: true })).toBeInTheDocument()
	// goes to first
	await userEvent.keyboard("{PageUp}")
	await expect(canvas.queryByRole("option", { name: "A", selected: true })).toBeInTheDocument()
	
	const testOpen = async (key: string) => {
		await userEvent.keyboard("{Enter}")
		await expect(canvas.queryByRole("listbox")).toBeNull()
		await userEvent.keyboard(`{${key}}`)
		await expect(canvas.queryByRole("listbox")).toBeInTheDocument()
	}
	await testOpen("ArrowDown")
	await testOpen("ArrowUp")
	await testOpen("PageDown")
	await testOpen("PageUp")
}
export const playBasicClickSelect = async ({ canvasElement, args }: { canvasElement: HTMLElement, args: any }) => {
	const canvas = within(canvasElement)
	const input = canvas.getByLabelText(args.label ?? "", { selector: "input" })
	await userEvent.clear(input)
	await userEvent.type(input, "A")
	await userEvent.click(canvas.getByRole("option", { name: "AB" }))
	await expect(canvas.getByTestId("model-value")).toHaveTextContent("AB")
	await expect(canvas.queryByRole("listbox")).toBeNull()
}

