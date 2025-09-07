import { expect, userEvent, within } from "@storybook/test"

// eslint-disable-next-line @typescript-eslint/naming-convention
export const playBasicVModel = async ({ canvasElement, args }: { canvasElement: HTMLElement, args: any }) => {
	const canvas = within(canvasElement)
	const input = canvas.getByLabelText(args.label ?? "", { selector: "input" })
	await userEvent.type(input, "A")
	await expect(canvas.getByTestId("model-value").textContent).toBe("A")
	await userEvent.clear(input)
	await expect(canvas.getByTestId("model-value").textContent).toBe("")
}
export const playMultipleValues = async ({ canvasElement, args }: { canvasElement: HTMLElement, args: any }) => {
	const initialValues = [...(args.values ?? [])]
	const canvas = within(canvasElement)
	// no multiple values
	const input = canvas.getByLabelText(args.label ?? "", { selector: "input" })
	await userEvent.type(input, "A")
	await expect(canvas.getByTestId("model-value")).toHaveTextContent("A")
	await userEvent.keyboard("{Enter}")
	await expect(canvas.getByTestId("values").textContent)
		.toBe([...initialValues].join(", "))
	// expect input to get cleared
	await expect(canvas.getByTestId("model-value")).toBeEmptyDOMElement()

	await userEvent.type(input, "D")
	await expect(canvas.getByTestId("model-value")).toHaveTextContent("D")
	await userEvent.keyboard("{Enter}")
	await expect(canvas.getByTestId("values").textContent)
		.toBe([...initialValues, "D"].join(", "))
	// empty input does nothing
	await userEvent.clear(input)
	await userEvent.keyboard("{Enter}")
	await expect(canvas.getByTestId("values").textContent)
		.toBe([...initialValues, "D"].join(", "))
}
