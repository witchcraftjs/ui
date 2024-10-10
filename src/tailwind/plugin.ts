// @ts-expect-error .
import flatten from "tailwindcss/lib/util/flattenColorPalette.js"
import { default as tailwindPlugin } from "tailwindcss/plugin.js"

export const plugin: ReturnType<typeof tailwindPlugin> = tailwindPlugin(({
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
	addVariant("outlined", [`:merge(.group).outlined &:focus-visible`, `:merge(.group).outlined-visible &:focus-visible`])
	addVariant("outlined-focus", [`:merge(.group).outlined &:focus`])
	addVariant("outlined-within", [`:merge(.group).outlined &:focus-within`])
	addVariant("dark-outlined", [
		`:merge(.group).dark.outlined &:focus-visible`,
		`:merge(.group).dark.outlined-visible &:focus-visible`,
	])
	addVariant("dark-outlined-focus", [`:merge(.group).dark.outlined &:focus`])
	addVariant("dark-outlined-within", [`:merge(.group).dark.outlined &:focus-within`])
	addUtilities({
		".scrollbar-hidden": {
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
		"no-touch-action": {
			"touch-action": "none",
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
	/**
	 * Created diagonal lines such as for loading bars.
	 * Note that the width must be a percent value.
	 *
	 * Size can be controlled with background-size.
	 * bg-bars-gradient
	 * bars-fg-bg
	 * bars-bg-accent-500
	 * bars-w-[50%]
	 * bars-angle-45
	 */
	addUtilities({
		".bg-bars-gradient": {
			"background-color": "var(--bars-bg-color, 50%)",
			"--bars-bg-width": "calc(100% - var(--bars-fg-width, 50%))",
			"--bars-1-pos": "calc(var(--bars-bg-width, 50%)/2)",
			"--bars-2-pos": "calc(var(--bars-bg-width, 50%)/2 + var(--bars-fg-width, 50%)/2)",
			"--bars-3-pos": "calc(var(--bars-bg-width, 50%) + var(--bars-fg-width, 50%)/2)",
			// 4 bars per "square" must be created to get proper tiling
			"background-image":
				`repeating-linear-gradient(
				var(--bars-angle),
				var(--bars-bg-color),
				var(--bars-bg-color) var(--bars-1-pos),
				var(--bars-fg-color) var(--bars-1-pos),
				var(--bars-fg-color) var(--bars-2-pos),
				var(--bars-bg-color) var(--bars-2-pos),
				var(--bars-bg-color) var(--bars-3-pos),
				var(--bars-fg-color) var(--bars-3-pos),
				var(--bars-fg-color)
				)`,
		},
	})
	matchUtilities({
		"bars-angle": angle => ({
			"--bars-angle": angle,
		}),
	}, { values: { 45: "45deg", 90: "90deg", 180: "180deg" } })
	for (const type of ["bg", "fg"]) {
		matchUtilities({
			[`bars-${type}`]: color => ({
				[`--bars-${type}-color`]: color.replace("<alpha-value>", "1"),
			}),
		}, { values: flatten.default(theme("colors")) })
	}
	matchUtilities({
		[`bars-w`]: value => ({
			[`--bars-fg-width`]: value,
		}),
	})
	// addComponents({
	// 	"focus-outline": {
	// 		"@apply outlined:outline-none outlined:ring-2 outlined:ring-accent-500 outlined:ring-offset-2 outlined:ring-offset-bg dark-outlined:ring-offset-red-500": {},
	// 	},
	// })
})
