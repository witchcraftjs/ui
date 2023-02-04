/* eslint-disable @typescript-eslint/parameter-properties */
import { keys } from "@alanscodelog/utils"
import { computed, type Ref, ref, watch } from "vue"

import { setGlobalCssVars } from "./globalCssVars.js"


export type CssUnit = "cm" | "mm" | "in" | "px" | "pt" | "pc" | "rem" | "em" | "s" | ""

export type ThemePreciseColor = {
	red: number
	green: number
	blue: number
	alpha: number
}

export type ThemeColor =
	| `rgb(${number},${number},${number})`
	| `rgba(${number},${number},${number})`
	| string
	| ThemePreciseColor


export type ThemePreciseUnit = { unit: string, amount: number }

export type ThemeUnit =
	`${number}${CssUnit}`
	| ThemePreciseUnit

export type Theme = Record<string, any>
// borderColor: ThemeColor
// borderWidth: ThemeUnit
// borderRadius: ThemeUnit
// background: ThemeColor
// }
// & Record<`padding${`XS` | `S` | `M` | `L` | `XL`}`, ThemeUnit>

export class Color {
	constructor(
		public red: number = 1,
		public green: number = 1,
		public blue: number = 1,
		public alpha: number = 1,
	) {
	}
}

export class Unit {
	constructor(
		public amount: number,
		public unit: CssUnit) { }
}

// type ColorGroups =
// | "Gray"
// | "Blue"
// | "Red"
// | "Green"
// | "Cyan"
// | "Orange"
// | "Purple"
// | "Yellow"
// | "Pink"

// type ColorKeys = `c${ColorGroups}${"10" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9"}`


export const defaultTheme = {
	cRed1: "hsl(5, 120%, 98%)",
	cRed2: "hsl(3.5, 104%, 88%)",
	cRed3: "hsl(2.5, 88%, 78%)",
	cRed4: "hsl(1.5, 72%, 68%)",
	cRed5: "hsl(0.5, 71%, 59%)",
	cRed6: "hsl(-0.5, 70%, 50%)",
	cRed7: "hsl(-1.5, 69%, 41%)",
	cRed8: "hsl(-2.5, 70%, 30%)",
	cRed9: "hsl(-3, 71%, 19%)",
	cRed10: "hsl(-3.5, 72%, 8%)",
	cPink1: "hsl(344, 120%, 98%)",
	cPink2: "hsl(342.5, 104%, 88%)",
	cPink3: "hsl(341.5, 88%, 78%)",
	cPink4: "hsl(340.5, 72%, 68%)",
	cPink5: "hsl(339.5, 71%, 59%)",
	cPink6: "hsl(338.5, 70%, 50%)",
	cPink7: "hsl(337.5, 69%, 41%)",
	cPink8: "hsl(336.5, 70%, 30%)",
	cPink9: "hsl(336, 71%, 19%)",
	cPink10: "hsl(335.5, 72%, 8%)",
	cPurple1: "hsl(277, 120%, 98%)",
	cPurple2: "hsl(275.5, 104%, 88%)",
	cPurple3: "hsl(274.5, 88%, 78%)",
	cPurple4: "hsl(273.5, 72%, 68%)",
	cPurple5: "hsl(272.5, 71%, 59%)",
	cPurple6: "hsl(271.5, 70%, 50%)",
	cPurple7: "hsl(270.5, 69%, 41%)",
	cPurple8: "hsl(269.5, 70%, 30%)",
	cPurple9: "hsl(269, 71%, 19%)",
	cPurple10: "hsl(268.5, 72%, 8%)",
	cBlue1: "hsl(216, 120%, 98%)",
	cBlue2: "hsl(214.5, 104%, 88%)",
	cBlue3: "hsl(213.5, 88%, 78%)",
	cBlue4: "hsl(212.5, 72%, 68%)",
	cBlue5: "hsl(211.5, 71%, 59%)",
	cBlue6: "hsl(210.5, 70%, 50%)",
	cBlue7: "hsl(209.5, 69%, 41%)",
	cBlue8: "hsl(208.5, 70%, 30%)",
	cBlue9: "hsl(208, 71%, 19%)",
	cBlue10: "hsl(207.5, 72%, 8%)",
	cCyan1: "hsl(193, 120%, 98%)",
	cCyan2: "hsl(191.5, 104%, 88%)",
	cCyan3: "hsl(190.5, 88%, 78%)",
	cCyan4: "hsl(189.5, 72%, 68%)",
	cCyan5: "hsl(188.5, 71%, 59%)",
	cCyan6: "hsl(187.5, 70%, 50%)",
	cCyan7: "hsl(186.5, 69%, 41%)",
	cCyan8: "hsl(185.5, 70%, 30%)",
	cCyan9: "hsl(185, 71%, 19%)",
	cCyan10: "hsl(184.5, 72%, 8%)",
	cGreen1: "hsl(105, 120%, 98%)",
	cGreen2: "hsl(103.5, 104%, 88%)",
	cGreen3: "hsl(102.5, 88%, 78%)",
	cGreen4: "hsl(101.5, 72%, 68%)",
	cGreen5: "hsl(100.5, 71%, 59%)",
	cGreen6: "hsl(99.5, 70%, 50%)",
	cGreen7: "hsl(98.5, 69%, 41%)",
	cGreen8: "hsl(97.5, 70%, 30%)",
	cGreen9: "hsl(97, 71%, 19%)",
	cGreen10: "hsl(96.5, 72%, 8%)",
	cYellow1: "hsl(44, 120%, 98%)",
	cYellow2: "hsl(42.5, 104%, 88%)",
	cYellow3: "hsl(41.5, 88%, 78%)",
	cYellow4: "hsl(40.5, 72%, 68%)",
	cYellow5: "hsl(39.5, 71%, 59%)",
	cYellow6: "hsl(38.5, 70%, 50%)",
	cYellow7: "hsl(37.5, 69%, 41%)",
	cYellow8: "hsl(36.5, 70%, 30%)",
	cYellow9: "hsl(36, 71%, 19%)",
	cYellow10: "hsl(35.5, 72%, 8%)",
	cOrange1: "hsl(29, 120%, 98%)",
	cOrange2: "hsl(27.5, 104%, 88%)",
	cOrange3: "hsl(26.5, 88%, 78%)",
	cOrange4: "hsl(25.5, 72%, 68%)",
	cOrange5: "hsl(24.5, 71%, 59%)",
	cOrange6: "hsl(23.5, 70%, 50%)",
	cOrange7: "hsl(22.5, 69%, 41%)",
	cOrange8: "hsl(21.5, 70%, 30%)",
	cOrange9: "hsl(21, 71%, 19%)",
	cOrange10: "hsl(20.5, 72%, 8%)",
	cGray1: "hsl(4, 0%, 98%)",
	cGray2: "hsl(2.5, 0%, 88%)",
	cGray3: "hsl(1.5, 0%, 78%)",
	cGray4: "hsl(0.5, 0%, 68%)",
	cGray5: "hsl(-0.5, 0%, 59%)",
	cGray6: "hsl(-1.5, 0%, 50%)",
	cGray7: "hsl(-2.5, 0%, 41%)",
	cGray8: "hsl(-3.5, 0%, 30%)",
	cGray9: "hsl(-4, 0%, 19%)",
	cGray10: "hsl(-4.5, 0%, 8%)",
	opacity0: new Color(0, 0, 0, 0),
	opacity5: new Color(0, 0, 0, 0.5),
	// bg: new Color(10, 10, 10, 1),
	bg: new Color(253, 253, 253, 1),
	bgNormal: "var(--cGray1)",
	bgFocused: "var(--cBlue2)",
	bgHover: "var(--cBlue1)",
	bgDisabled: "var(--cGray1)",
	bgTableRow: "var(--cGray1)",
	textNormal: "var(--cGray8)",
	textSecondary: "var(--cGray6)",
	textFocused: "var(--cBlue6)",
	textDisabled: "var(--cGray5)",
	textPlaceholder: "var(--cGray5)",
	textPlaceholderFocused: "var(--cGray3)",
	textActive: "var(--cGray6)",
	textHover: "var(--cBlue6)",
	textLink: "var(--cBlue7)",
	textLinkFocused: "var(--cBlue5)",
	textLinkVisited: "var(--cPurple6)",
	textShadowWidth: new Unit(1, "px"),
	textShadowHover: "var(--cGray3)",
	borderFocused: "var(--cBlue5)",
	borderSoftFocused: "var(--cBlue3)",
	borderNormal: "var(--cGray4)",
	borderDark: "var(--cGray8)",
	borderNormalSoft: "var(--cGray3)",
	borderDisabled: "var(--cGray3)",
	borderActive: "var(--cGray3)",
	borderHover: "var(--cGray3)",
	borderWidth: new Unit(1, "px"),
	borderWidthDark: new Unit(2, "px"),
	borderRadius: new Unit(5, "px"),
	shadowWidth: new Unit(2, "px"),
	shadowRegular: "var(--cGray3)",
	shadowActive: "var(--cGray4)",
	shadowHover: "var(--cGray5)",
	shadowFocused: "var(--cBlue2)",
	paddingXXS: new Unit(2, "px"),
	paddingXS: new Unit(0.2, "rem"),
	paddingS: new Unit(0.3, "rem"),
	paddingM: new Unit(0.5, "rem"),
	paddingL: new Unit(1.0, "rem"),
	paddingXL: new Unit(1.5, "rem"),
	anim: new Unit(0.2, "s"),
	fontSizeSmall: new Unit(0.8, "rem"),
	fontSizeNormal: new Unit(1, "rem"),
	fontSizeLarge: new Unit(1.5, "rem"),
	fontLineHeight: new Unit(1.2, ""),
	fontFamily: "Arial, Helvetica, sans-serif",
	tableGripSize: new Unit(4, "px"),
	recording: "var(--cRed7)",
	error: "var(--cRed7)",
	errorSoft: "var(--cRed2)",
	// fontFamily: "Nunito Sans, Arial, Helvetica, sans-serif",
}

const transformedDefaultTheme = Object.fromEntries(keys(defaultTheme).map(key => [key, transformThemeValue(defaultTheme[key])]))


function processColor(c: Color): string {
	return `rgba(${c.red},${c.green},${c.blue},${c.alpha})`
}
function processUnit(u: Unit): `${number}${string}` {
	return `${u.amount}${u.unit}`
}

function transformThemeValue(value: Unit | Color | string): string {
	return value instanceof Unit
			? processUnit(value)
			: value instanceof Color
			? processColor(value)
			: value as any
}
// eslint-disable-next-line @typescript-eslint/no-shadow
function transformTheme(theme: Partial<Theme>): Record<keyof Theme, any> {
	return Object.fromEntries(keys(theme).map(key => [key, transformThemeValue(theme[key])]))
}
/**
 * Function that parses and provides reactive *as named* css variables for the theme's variables using vue's {@link useCssVars}.
 *
 * By *as named*, I mean they are not hashed like vue normally hashes them and therefore available globally within the component this was called.
 *
 * Should be called once in your most top level component (i.e. `App`). Note that if no root div is given, the variables are attached to each individual child element (not ideal).
 *
 * Note this does not validate the values in the given theme. It's recommended to use {@link themeColor} and {@link themeUnit} for quickly generating precise theme objects.
 *
 */
export function useThemeVars(
	// eslint-disable-next-line @typescript-eslint/no-shadow
	theme: Theme,
): void {
	watch(theme, () => {
		setGlobalCssVars(Object.fromEntries(Object.keys(theme.value).map(key => [key, (theme.value)[key]])))
	})
	setGlobalCssVars(Object.fromEntries(Object.keys(theme.value).map(key => [key, (theme.value)[key]])))
}


export function theme(themeOverrides: Ref<Partial<Theme>> = ref({})): {
	mergedTheme: Ref<Record<keyof Theme, string>>
	themeOverrides: Ref<Record<keyof Theme, ThemeUnit | ThemeColor | string>>
} {
	const mergedTheme = computed(() => ({
		...transformedDefaultTheme,
		...transformTheme(themeOverrides.value),
	}))
	useThemeVars(mergedTheme)

	return { themeOverrides, mergedTheme }
}

