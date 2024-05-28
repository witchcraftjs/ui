import { extendTailwindMerge } from "tailwind-merge"


export const twMerge = extendTailwindMerge<"focus-outline">({
	extend: {
		classGroups: {
			"focus-outline": [{ "focus-outline": ["", "no-offset", "none"]}],
		},
	}
})
