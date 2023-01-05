import { run } from "@alanscodelog/utils/node"
import { babel } from "@rollup/plugin-babel"
import vue from "@vitejs/plugin-vue"
import glob from "fast-glob"
import fs from "fs"
import { builtinModules } from "module"
// import Previewer from 'vite-plugin-vue-component-preview';
import path from "path"
import { defineConfig, PluginOption } from "vite"

import packageJson from "./package.json"


const typesPlugin = (): PluginOption => ({
	name: "typesPlugin",
	// eslint-disable-next-line no-console
	writeBundle: async () => run("npm run build:types").catch(e => console.log(e)).then(() => undefined),
})
const folders = fs.readdirSync("src", { withFileTypes: true })
	.filter(file => file.isDirectory() || ["types"].includes(file.name))
	.map(file => file.name)
const fileEntries = glob.sync(path.resolve(__dirname, `src/{${folders.join((","))}}/*.{ts, vue}`))

// return
// https://vitejs.dev/config/
export default ({ mode }: { mode: string }) => defineConfig({
	plugins: [
		babel({
			babelHelpers: "runtime",
			extensions: [".js", ".mjs", "ts"],
			presets: [
				["@babel/preset-env", {
					modules: false,
					useBuiltIns: false, // we do not want polyfills, only transforms of any modern syntax
					debug: true,
				}],
			],
			plugins: ["@babel/plugin-transform-runtime"],
		}),
		typesPlugin(),
		// @ts-expect-error ???
		vue(),
	],
	build: {
		emptyOutDir: true,
		outDir: "dist",
		lib: {
			entry: [
				"src/assets/global.scss",
				"src/main.lib.ts",
				...fileEntries,
			],
			formats: ["es", "cjs"],
			fileName: (format, entryName) => {
				const suffix = format === "es" ? "js" : "cjs"
				return `${entryName}.${suffix}`
			},
		},
		rollupOptions: {
			external: [...builtinModules, ...Object.keys((packageJson as any).dependencies ?? {}), ...Object.keys((packageJson as any).peerDependencies ?? {}), /@babel\/runtime/],
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
		preprocessorOptions: {
			scss: {
				additionalData: `
					@import "src/assets/mixins.scss";
				`,
			},
		},
	},
	resolve: {
		alias: {
			// aliases not currently being used because nuxt cannot handler them when importing directly from components :(
		},
	},
	optimizeDeps: {
		include: [
			// "@alanscodelog/utils",
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
