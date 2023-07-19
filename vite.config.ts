import vue from "@vitejs/plugin-vue"
import glob from "fast-glob"
import fs from "fs"
// import Previewer from 'vite-plugin-vue-component-preview';
import path from "path"
import { defineConfig } from "vite"
import dts from "vite-plugin-dts"
import { externalizeDeps } from "vite-plugin-externalize-deps"

// @ts-expect-error .
import postcss from "./postcss.config.js"


const folders = fs.readdirSync("src", { withFileTypes: true })
	.filter(file => file.isDirectory() && !["types", "types.ts", "bin"].includes(file.name))
	.map(file => file.name)

const fileEntries = glob.sync(path.resolve(__dirname, `src/{${folders.join((","))}}/*.{ts, vue}`))
	.filter(filepath => !filepath.endsWith(".stories.ts"))


// https://vitejs.dev/config/
export default async ({ mode }: { mode: string }) => defineConfig({
	plugins: [
		// it isn't enough to just pass the deps list to rollup.external since it will not exclude subpath exports
		externalizeDeps(),
		vue({
			script: {
				defineModel: true,
			},
		}),
		dts({
			entryRoot: "src",
			tsconfigPath: "tsconfig.types.json",
		}),
	],
	build: {
		emptyOutDir: true,
		outDir: "dist",
		lib: {
			entry: [
				"src/main.lib.ts",
				"src/theme.ts",
				"src/types.ts",
				"src/globalResizeObserver.ts",
				...fileEntries,
			],
			formats: ["es"],
		},
		rollupOptions: {
			output: {
				preserveModules: true,
				preserveModulesRoot: "src",
			},
		},
		...(mode === "production" ? {
			minify: false,
		} : {
			minify: false,
			sourcemap: "inline",
		}),
		minify: false,
	},
	css: {
		postcss,
	},
	resolve: {
		alias: {
			// aliases not currently being used because nuxt cannot handler them when importing directly from components :(
		},
	},
	optimizeDeps: {
		include: [
		],
	},
	server: {
		port: 3001,
		watch: {
			// watch changes in linked repos
			ignored: ["!**/node_modules/@alanscodelog/**"],
		},
	},
})
