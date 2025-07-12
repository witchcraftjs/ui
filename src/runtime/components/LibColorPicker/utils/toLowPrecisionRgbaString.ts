import { truncate } from "./truncate.js"

import type { RgbaColor } from "../../../main.lib.js"

export function toLowPrecisionRgbaString(rgba: RgbaColor, withAlpha: boolean, precision: number): string {
	const r = truncate(rgba.r, precision)
	const g = truncate(rgba.g, precision)
	const b = truncate(rgba.b, precision)
	const a = rgba.a !== undefined
		? truncate(rgba.a, precision)
		: undefined
	return withAlpha ? `rgba(${r}, ${g}, ${b}, ${a})` : `rgb(${r}, ${g}, ${b})`
}
