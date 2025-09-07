// todo move to utils
export const readFile = async <TType extends "DataUrl" | "ArrayBuffer" | "BinaryString" | "text" = "DataUrl">(
	file?: File | Blob,
	type: TType = "DataUrl" as TType
):
Promise<
	TType extends "ArrayBuffer"
		? ArrayBuffer
		: string
> => new Promise((resolve, reject) => {
	const reader = new FileReader()
	reader.addEventListener("load", () => {
		resolve(reader.result as any)
	}, false)
	reader.addEventListener("error", () => {
		reject(new Error(reader.result as any))
	}, false)
	if (type === "DataUrl") reader.readAsDataURL(file as Blob)
	if (type === "ArrayBuffer") reader.readAsArrayBuffer(file as Blob)
	if (type === "BinaryString") reader.readAsBinaryString(file as Blob)
	if (type === "text") reader.readAsText(file as Blob)
})
