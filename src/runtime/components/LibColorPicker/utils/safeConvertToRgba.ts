import { clampNumber } from "@alanscodelog/utils/clampNumber.js"
import Color from "colorjs.io"

import type { HsvaColor, RgbaColor } from "../../../types/index.js"

export function safeConvertToRgba(val: string | HsvaColor, allowAlpha: boolean): RgbaColor | undefined {
	try {
		const color = typeof val === "string"
			? new Color(val)
			: new Color("hsv", [val.h, val.s, val.v], allowAlpha ? val.a : 1)
		const rgb = color.srgb
		return {
			r: clampNumber(rgb[0] / 1 * 255, 0, 255),
			g: clampNumber(rgb[1] / 1 * 255, 0, 255),
			b: clampNumber(rgb[2] / 1 * 255, 0, 255),
			a: clampNumber(allowAlpha ? color.alpha : 1, 0, 1),
		}
	} catch (_err) {
		return undefined
	}
}

