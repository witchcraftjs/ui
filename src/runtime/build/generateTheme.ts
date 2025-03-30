import { themeAsTailwindCss } from "metamorphosis/tailwind.js"
import fs from "node:fs"
import { resolve } from "path"

import { themeConvertionOpts } from "../tailwind/themeConvertionOpts.js"
import { theme } from "../theme.js"
const css = themeAsTailwindCss(theme, themeConvertionOpts)
import url from "url"
// eslint-disable-next-line @typescript-eslint/naming-convention
const __dirname = url.fileURLToPath(new URL(".", import.meta.url))
const filepath = resolve(__dirname, "../assets/theme.css")

const content = `/* Auto-generated, see gen:theme script. */\n${css}`
fs.writeFile(filepath, content, err => {
	if (err) throw err
})
