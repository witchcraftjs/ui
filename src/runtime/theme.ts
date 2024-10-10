import { ControlVar, Units } from "metamorphosis"
import { baseTheme } from "metamorphosis/BaseTheme.js"
import type { Theme } from "metamorphosis/Theme.js"


export const theme = baseTheme as Theme
const recorderColor = new ControlVar(Units.str, "99% 99% 99%")
theme.add({ "color-recorder": recorderColor })
