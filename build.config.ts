import { globSync as glob } from "fast-glob"
// eslint-disable-next-line import/no-extraneous-dependencies
import { defineBuildConfig } from "unbuild"

const components = glob(["./src/runtime/components/*/**"], { onlyDirectories: true }).map(_ => _.slice("./src/".length))
export default defineBuildConfig({
	entries: [
		"src/module.ts",
		{
			builder: "mkdist",
			input: "./src/runtime/",
			outDir: "./dist/runtime/",
			ext: "js",
		},
		{
			builder: "mkdist",
			input: "./src/runtime/components/",
			outDir: "./dist/runtime/components/",
			ext: "js",
		},
		...components.map(folder => ({
			builder: "mkdist" as const,
			input: `./src/${folder}`,
			outDir: `./dist/${folder}`,
			ext: "js",
			format: "esm",
		}))

	]
})
