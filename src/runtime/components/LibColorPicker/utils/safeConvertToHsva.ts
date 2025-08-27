import { clampNumber } from "@alanscodelog/utils/clampNumber"
import Color from "colorjs.io"

import type { HsvaColor, RgbaColor } from "../../../types/index.js"

export function safeConvertToHsva(val: string | RgbaColor, allowAlpha: boolean): HsvaColor | undefined {
	try {
		const color = typeof val === "string"
			? new Color(val)
			: new Color("srgb", [val.r / 255, val.g / 255, val.b / 255], allowAlpha ? val.a : 1)
		const hsv = color.hsv
		if (!hsv || hsv[1] === undefined || hsv[2] === undefined) return undefined
		const final = {
			h: clampNumber(hsv[0] ?? 0, 0, Number.MAX_SAFE_INTEGER),
			s: clampNumber(hsv[1], 0, 100),
			v: clampNumber(hsv[2], 0, 100),
			a: clampNumber(allowAlpha ? color.alpha : 1, 0, 1),
		}
		return final
	} catch {
		return undefined
	}
}

