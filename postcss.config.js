import autoprefixer from "autoprefixer"
import postCssComment from "postcss-comment"
import postCssImport from "postcss-import"

import tailwindConfig from "./tailwind.config.js"

import tailwind from "tailwindcss"
import nesting from "tailwindcss/nesting"


export default {
	parser: postCssComment,
	plugins: [
		postCssImport,
		nesting,
		tailwind(tailwindConfig),
		autoprefixer,
	],
}
