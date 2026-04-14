import { expect, userEvent, waitFor, within } from "@storybook/test"

export const playBasic = async ({ canvasElement }: { canvasElement: HTMLElement, args: any }) => {
	const canvas = within(canvasElement)
	const input = canvas.getByRole("combobox") // More robust than LabelText
	await userEvent.clear(input)

	await userEvent.type(input, "A")
	await expect(canvas.getByTestId("model-value")).toHaveTextContent("A")

	await userEvent.clear(input)
	await userEvent.type(input, "[Esc]")
	await expect(canvas.getByTestId("search-term")).toHaveTextContent("")

	await expect(canvas.getByTestId("model-value")).toHaveTextContent("A")
}
export const playBasicKeyboardSelect = async ({ canvasElement }: { canvasElement: HTMLElement, args: any }) => {
	const canvas = within(canvasElement)
	const input = canvas.getByRole("combobox")

	await userEvent.clear(input)
	await userEvent.type(input, "A")

	await expect(canvas.getByRole("listbox")).toBeInTheDocument()

	await userEvent.keyboard("{ArrowDown}")
	const options = canvas.getAllByRole("option")

	await expect(options[1]).toHaveAttribute("data-highlighted")

	await userEvent.keyboard("{Enter}")
	// it's the 0th element because of the filter
	await expect(canvas.getByTestId("model-value")).toHaveTextContent(options[0]!.textContent?.trim() ?? "")
}
export const playBasicClickSelect = async ({ canvasElement }: { canvasElement: HTMLElement, args: any }) => {
	const canvas = within(canvasElement)
	const input = canvas.getByRole("combobox")
	await userEvent.clear(input)

	await userEvent.click(input)

	const option = canvas.getByRole("option", { name: "AB" })
	await userEvent.click(option)

	await expect(canvas.getByTestId("model-value")).toHaveTextContent("AB")

	await waitFor(() => {
		expect(canvas.queryByRole("listbox")).not.toBeInTheDocument()
	})
}
export const playValidation = async ({ canvasElement }: { canvasElement: HTMLElement }) => {
	const canvas = within(canvasElement)
	const input = canvas.getByRole("combobox")

	await userEvent.clear(input)
	await userEvent.type(input, "Invalid")

	await userEvent.click(input)

	const body = within(document.body)
	await waitFor(() => {
		expect(body.getByRole("alert")).toBeInTheDocument()
	})
}

export const playAllowNewValues = async ({ canvasElement }: { canvasElement: HTMLElement }) => {
	const canvas = within(canvasElement)
	const input = canvas.getByRole("combobox")
	await userEvent.clear(input)
	const newValue = "New Custom Value"

	await userEvent.type(input, newValue)

	const body = within(document.body)
	await waitFor(() => {
		expect(body.getByText(/Press Enter to Add Value/i)).toBeInTheDocument()
	})

	await userEvent.keyboard("{Enter}")

	await expect(canvas.getByTestId("model-value")).toHaveTextContent(newValue)

	await userEvent.clear(input)
	await userEvent.type(input, newValue)
	expect(body.queryByText(/Press Enter to Add Value/i)).not.toBeInTheDocument()

	await userEvent.clear(input)
	await userEvent.type(input, "New")
	await waitFor(() => {
		expect(body.getByRole("option", { name: newValue })).toBeInTheDocument()
	})
}
