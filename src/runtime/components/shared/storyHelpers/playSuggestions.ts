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

	if (args.values !== undefined) {
		await expect(canvas.getByTestId("model-value").textContent).toBe("")
		// await expect(canvas.getByTestId("model-value")).toHaveTextContent("")
		await expect(canvas.queryByRole("listbox")).not.toBeNull()
	} else {
		await expect(canvas.getByTestId("model-value")).toHaveTextContent("ABCDEFGHIJKLMNOPQRSTUVWXYZ")
		// await expect(canvas.getByTestId("model-value").textContent).toBe("ABCDEFGHIJKLMNOPQRSTUVWXYZ")
		// should be closed after enter
		await expect(canvas.queryByRole("listbox")).toBeNull()
	}
	await userEvent.keyboard("{Backspace}")
	await expect(canvas.queryByRole("option",{ selected: true })).toBeInTheDocument()
	await userEvent.clear(input)
	await userEvent.type(input, "unmatched")
	if (!args.suggestionsFilter) {
		await expect(canvas.queryAllByRole("option", { selected: true })).toEqual([])
	}
	await userEvent.clear(input)

	// first match should be selected if input is empty
	await expect(await canvas.findByRole("option", { name: "A", selected: true })).toBeInTheDocument()
	if (args.restrictToSuggestions && args.values === undefined) {
		// should still equal last selected
		await expect(canvas.getByTestId("model-value").textContent).toBe("ABCDEFGHIJKLMNOPQRSTUVWXYZ")
	}

	await userEvent.keyboard("{Enter}")
	if (args.values === undefined) {
		await expect(canvas.getByTestId("model-value").textContent).toBe("A")
	}
	await userEvent.clear(input)
	await userEvent.keyboard("AB{Escape}")
	await expect(canvas.queryByRole("listbox")).toBeNull()
	if (args.values === undefined) {
		if (args.restrictToSuggestions) {
			await expect(canvas.getByTestId("model-value").textContent).toBe("A")
		}
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
		await userEvent.keyboard("{Escape}")
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
	if (args.values === undefined) {
		await expect(canvas.getByTestId("model-value").textContent).toBe("AB")
		await expect(canvas.queryByRole("listbox")).toBeNull()
	} else {
		await expect(canvas.getByTestId("values")).toHaveTextContent(/AB$/)
	}
}

