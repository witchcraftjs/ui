import type { ComputedRef, StyleValue } from "vue"
import { computed } from "vue"

import type { PopupConstrainToProps } from "../types/index.js"
/**
 * Mostly internal, create the computed style with maxWidth/Height based on the constrain*To props.
 *
 * @internal
 */
export function usePopupConstrainToStyle(rekaName: string, props: PopupConstrainToProps, attrsStyle?: StyleValue[]): ComputedRef<StyleValue[]> {
	const contentStyle = computed(() => ([{
		maxWidth: props.constrainWidthTo === "trigger"
			? `var(--reka-${rekaName}-trigger-width)`
			: props.constrainWidthTo === "available"
				? `var(--reka-${rekaName}-content-available-width)`
				: typeof props.constrainWidthTo === "number"
					? `${props.constrainWidthTo}px`
					: props.constrainWidthTo ?? undefined,
		maxHeight: props.constrainHeightTo === "trigger"
			? `var(--reka-${rekaName}-trigger-height)`
			: props.constrainHeightTo === "available"
				? `var(--reka-${rekaName}-content-available-height)`
				: typeof props.constrainHeightTo === "number"
					? `${props.constrainHeightTo}px`
					: props.constrainHeightTo ?? undefined
	}, ...(attrsStyle ?? [])] satisfies StyleValue[]))
	return contentStyle
}

