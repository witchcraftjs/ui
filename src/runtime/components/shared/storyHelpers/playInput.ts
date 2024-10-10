/* eslint-disable @typescript-eslint/explicit-function-return-type */
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
	const input = canvas.getByLabelText(args.label ?? "", { selector: "input" })
	await userEvent.type(input, "A")
	await expect(canvas.getByTestId("model-value")).toHaveTextContent("A")
	await userEvent.keyboard("{Enter}")
	await expect(canvas.getByTestId("values").textContent)
		.toBe([...initialValues, "A"].join(", "))
	// expect input to get cleared
	await expect(canvas.getByTestId("model-value")).toBeEmptyDOMElement()

	await userEvent.type(input, "B")
	await expect(canvas.getByTestId("model-value")).toHaveTextContent("B")
	await userEvent.keyboard("{Enter}")
	await expect(canvas.getByTestId("values").textContent)
		.toBe([ ...initialValues, "A", "B" ].join(", "))
	// empty input does nothing
	await userEvent.clear(input)
	await userEvent.keyboard("{Enter}")
	await expect(canvas.getByTestId("values").textContent)
		.toBe([ ...initialValues, "A", "B" ].join(", "))
}
