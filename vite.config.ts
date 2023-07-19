import { escapeRegex } from "@alanscodelog/utils"
import vue from "@vitejs/plugin-vue"
import glob from "fast-glob"
import fs from "fs"
import { builtinModules } from "module"
// import Previewer from 'vite-plugin-vue-component-preview';
import path from "path"
import { defineConfig } from "vite"
import dts from "vite-plugin-dts"

import packageJson from "./package.json"
// @ts-expect-error .
import postcss from "./postcss.config.js"


const folders = fs.readdirSync("src", { withFileTypes: true })
	.filter(file => file.isDirectory() && !["types", "types.ts", "bin"].includes(file.name))
	.map(file => file.name)

const fileEntries = glob.sync(path.resolve(__dirname, `src/{${folders.join((","))}}/*.{ts, vue}`))
	.filter(filepath => !filepath.endsWith(".stories.ts"))

// It is not enought to list the packages since we will not get matches when importing files inside the package. This converts the external dependencies to a regex to properly match all imports from a package.
// We can be sure none escape by checking in the build output that there are no dist/node_modules files, this is done by a pre-push git hook.
const external = [
	...builtinModules,
	...Object.keys((packageJson as any).dependencies ?? {}),
	...Object.keys((packageJson as any).peerDependencies ?? {}),
	"@babel/runtime",
].map(pkg => new RegExp(`^${escapeRegex(pkg)}($|\\/)`))

// return
// https://vitejs.dev/config/
export default async ({ mode }: { mode: string }) => defineConfig({
	plugins: [
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
			external,

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
