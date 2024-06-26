import { extendTailwindMerge } from "tailwind-merge"

export const twMergeExtend = {
	extend: {
		classGroups: {
			"focus-outline": [{ "focus-outline": ["", "no-offset", "none"]}],
		},
	}
} satisfies Parameters<typeof extendTailwindMerge>[0]

export const twMerge = extendTailwindMerge<"focus-outline">(twMergeExtend)
