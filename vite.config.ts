import { run } from "@alanscodelog/utils/node"
import vue from "@vitejs/plugin-vue"
import glob from "fast-glob"
import fs from "fs"
import path from "path"
import IconsResolver from "unplugin-icons/resolver"
import Icons from "unplugin-icons/vite"
import Components from "unplugin-vue-components/vite"
import { defineConfig,type PluginOption } from "vite"
// import Previewer from 'vite-plugin-vue-component-preview';
import { externalizeDeps } from "vite-plugin-externalize-deps"

// @ts-expect-error .
import postcss from "./postcss.config.js"
import { unpluginIconViteOptions } from "./src/build/unpluginIconViteOptions.js"


const folders = fs.readdirSync("src", { withFileTypes: true })
	.filter(file => file.isDirectory() && !["types", "types.ts", "bin"].includes(file.name))
	.map(file => file.name)

const fileEntries = glob.sync(path.resolve(__dirname, `src/{${folders.join((","))}}/*.{ts, vue}`))
	.filter(filepath => !filepath.endsWith(".stories.ts"))

const typesPlugin = (): PluginOption => ({
	name: "typesPlugin",
	// eslint-disable-next-line no-console
	writeBundle: async () => run(`npm run build:types`).promise.catch(e => { console.log(e); process.exit(1) }).then(() => undefined),
})


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
		// runs build:types script which takes care of generating types
		// note aliases and baseUrl imports should not be used, they have all been removed
		typesPlugin(),
		Components({
			dirs: ["src/components/Icon"], // don't auto-import our own components except icon
			resolvers: [
				IconsResolver({
				}),
			],
		}),
		Icons(unpluginIconViteOptions)
	],
	build: {
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
				preserveModulesRoot: "src",
				preserveModules: true,
			},
		},
		minify: false,
		...(mode === "production" ? {
		} : {
			sourcemap: "inline",
		}),
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
		fs: {
			allow: [...(process.env.CODE_PROJECTS ?? [])!],
		},
		watch: {
			// for pnpm
			followSymlinks: true,
			// watch changes in linked repos
			ignored: ["!**/node_modules/@alanscodelog/**"],
		},
	},
})
