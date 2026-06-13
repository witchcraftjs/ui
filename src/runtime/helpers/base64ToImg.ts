/**
 * Copies a Base64 string into an image element shell.
 *
 *  @deprecated
 * For Canvas drawing, use:
 * ```ts
 * const bitmap = await createImageBitmap(await (await fetch(base64)).blob());
 * ctx.drawImage(bitmap, 0, 0);
 * ```
 *
 * For measuring dimensions safely, use:
 * ```ts
 * const url = URL.createObjectURL(await (await fetch(base64)).blob());
 * const img = new Image();
 * img.onload = () => { console.log(img.width); URL.revokeObjectURL(url); };
 * img.src = url;
 * ```
 */
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
