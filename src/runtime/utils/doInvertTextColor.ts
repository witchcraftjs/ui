import Color from "colorjs.io"
/**
 * Returns whether the text should be inverted (to white) based on the given color.
 */
export function doInvertTextColor(color: string) {
	const c = new Color(color).to("hsv")
	const v = c.hsv[2]
	const a = c.alpha
	const doInvert = !!(v! < 50 || (a === undefined || a < 0.5))
	return doInvert
}
