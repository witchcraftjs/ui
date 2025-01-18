import { defineBuildConfig } from "unbuild"

export default defineBuildConfig({
	entries: [
		{
			builder: "mkdist",
			input: "./src/runtime/**/",
			outDir: "./dist/runtime/**/",
			ext: "js",
		},
	]
})
