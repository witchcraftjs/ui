import { extendTailwindMerge } from "tailwind-merge"


export const twMerge = extendTailwindMerge({
	classGroups: {
		"focus-outline": [{ "focus-outline": ["", "no-offset", "none"]}],
	},
})
