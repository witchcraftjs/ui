import { clampNumber } from "@alanscodelog/utils/clampNumber"
import Color from "colorjs.io"

import type { HsvaColor, RgbaColor } from "../../../types/index.js"

export function safeConvertToRgba(val: string | HsvaColor, allowAlpha: boolean): RgbaColor | undefined {
	try {
		const color = typeof val === "string"
			? new Color(val)
			: new Color("hsv", [val.h, val.s, val.v], allowAlpha ? val.a : 1)
		const rgb = color.srgb
		if (!rgb || rgb[0] === undefined || rgb[1] === undefined || rgb[2] === undefined) return undefined
		return {
			r: clampNumber(rgb[0] / 1 * 255, 0, 255),
			g: clampNumber(rgb[1] / 1 * 255, 0, 255),
			b: clampNumber(rgb[2] / 1 * 255, 0, 255),
			a: clampNumber(allowAlpha ? color.alpha : 1, 0, 1),
		}
	} catch {
		return undefined
	}
}

