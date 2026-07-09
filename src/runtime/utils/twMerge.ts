import { extendTailwindMerge, validators } from "tailwind-merge"

const _twMergeExtend = {
	extend: {
		classGroups: {
			"focus-outline": [{
				"focus-outline": ["", "no-offset", "hidden"],
				"focus-outline-within": ["", "no-offset"]
			}],
			"text-overflow": ["truncate", "no-truncate"],

			// `mix-from` and `mix-to` are separate groups so they both be applied at the same time
			// `tint` and `shade` set both "from" and "to" internally so
			// `conflictingClassGroups` ensures that using either correctly overrides mix-to/from

			"mix-from": [{ "mix-from": [validators.isAny] }],
			"mix-to": [{ "mix-to": [validators.isAny] }],
			"mix-standalone": [{
				tint: [validators.isAny],
				shade: [validators.isAny]
			}],
			"bg-image": [
				"bg-squares-gradient",
				"bg-bars-gradient",
				"bg-transparency-squares"
			],
			// even if there aren't two utils that conflict they should still be added
			// so tailwind-merge knows to let the last one of the same type win
			// e.g. square-light-white and square-light-neutral-100 conflict
			"square-light": [{ "square-light": [validators.isAny] }],
			"square-dark": [{ "square-dark": [validators.isAny] }],
			"square-size": [{ "square-size": [validators.isAny] }],
			"bars-angle": [{ "bars-angle": [validators.isAny] }],
			"bars-fg": [{ "bars-fg": [validators.isAny] }],
			"bars-bg": [{ "bars-bg": [validators.isAny] }],
			"bars-w": [{ "bars-w": [validators.isAny] }],
			"styled-scrollbar-w": [{ "styled-scrollbar-w": [validators.isAny] }],
			"styled-scrollbar-border": [{ "styled-scrollbar-border-w": [validators.isAny] }],
			"styled-scrollbar-color": [{ "styled-scrollbar": [validators.isAny] }],
			"styled-scrollbar-bg": [{ "styled-scrollbar-bg": [validators.isAny] }],
			"styled-resizer-w": [{ "styled-resizer-w": [validators.isAny] }],
			"styled-resizer-color": [{ "styled-resizer-color": [validators.isAny] }]
		},
		conflictingClassGroups: {
			"mix-standalone": ["mix-from", "mix-to"] as const
		}
	}
} satisfies Parameters<typeof extendTailwindMerge>[0]

export const twMerge = extendTailwindMerge<
	| "focus-outline"
	| "text-overflow"
	| "mix-from"
	| "mix-to"
	| "mix-standalone"
	| "bg-image"
	| "square-light"
	| "square-dark"
	| "square-size"
	| "bars-angle"
	| "bars-fg"
	| "bars-bg"
	| "bars-w"
	| "styled-scrollbar-w"
	| "styled-scrollbar-border"
	| "styled-scrollbar-color"
	| "styled-scrollbar-bg"
	| "styled-resizer-w"
	| "styled-resizer-color"
>(_twMergeExtend)

export const twMergeExtend = _twMergeExtend
