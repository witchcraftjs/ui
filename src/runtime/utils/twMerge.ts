import { extendTailwindMerge } from "tailwind-merge"

const _twMergeExtend = {
	extend: {
		classGroups: {
			"focus-outline": [{ "focus-outline": ["", "no-offset", "none"]}],
		},
	}
} satisfies Parameters<typeof extendTailwindMerge>[0]

export const twMerge = extendTailwindMerge<"focus-outline">(_twMergeExtend)

export const twMergeExtend = _twMergeExtend
