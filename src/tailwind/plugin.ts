/* eslint-disable @typescript-eslint/naming-convention */
// @ts-expect-error .
import flatten from "tailwindcss/lib/util/flattenColorPalette.js"
import tailwindPlugin from "tailwindcss/plugin.js"


export const plugin = tailwindPlugin(({
	addVariant,
	addUtilities,
	matchUtilities,
	theme,
}) => {
	addUtilities(
		Object.fromEntries(
			[".", ".min-", ".max-"]
				.map(prefix => (
					[`${prefix}h-screen`, { [`${prefix.slice(1)}height`]: ["100vh /* fallback */", "100dvh"]}]
				)
				)
		)
	)
	addVariant("outlined", [`:merge(.group).outlined &:focus`, `&:focus-visible`])
	addVariant("outlined-within", [`:merge(.group).outlined &:focus-within`])
	addUtilities({
		".scrollbar-hide": {
			"-ms-overflow-style": "none", /* IE and Edge */
			"scrollbar-width": "none", /* Firefox */
			"&::-webkit-scrollbar": { display: "none" }, /* Safari and Chrome */
		},
	})
	addUtilities({
		".content-vertical-holder": {
			"--tw-content": "'\\200b'",
			content: "var(--tw-content)",
		},
	})
	addUtilities({
		".bg-squares-gradient": {
			"--doubleSquareSize": "calc(2*var(--squareSize))",
			"background-color": "var(--lightSquare)",
			"background-position": "0 0, var(--squareSize) var(--squareSize)",
			"background-size": "var(--doubleSquareSize) var(--doubleSquareSize)",
			"background-image":
				"repeating-linear-gradient(45deg, var(--darkSquare) 25%, transparent 25%, transparent 75%, var(--darkSquare) 75%, var(--darkSquare)), " +
				"repeating-linear-gradient(45deg, var(--darkSquare) 25%, var(--lightSquare) 25%, var(--lightSquare) 75%, var(--darkSquare) 75%, var(--darkSquare))",
		},
	})
	matchUtilities({
		"square-light": value => ({
			"--lightSquare": value.replace("<alpha-value>", "1"),
		}),
		"square-dark": value => ({
			"--darkSquare": value.replace("<alpha-value>", "1"),
		}),
	}, {
		values: flatten.default(theme("colors")),
	})
	matchUtilities({
		"square-size": value => ({
			"--squareSize": value,
		}),
	}, {
		values: theme("spacing"),
	})

	addUtilities({
		"no-touch-action": {
			"touch-action": "none",
		},
	})
})
