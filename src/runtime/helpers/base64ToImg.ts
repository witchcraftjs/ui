export const base64ToImg = async (imageSrc: string): Promise<HTMLImageElement> => {
	const img = new Image()

	const loaded = new Promise(resolve => {
		img.addEventListener("load", () => {
			resolve(img)
		})
	}) as any as Promise<HTMLImageElement>

	img.src = imageSrc // must be set after
	await loaded
	return img
}
