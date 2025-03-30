import { defineConfig } from "@alanscodelog/vite-config"
import vue from "@vitejs/plugin-vue"
import IconsResolver from "unplugin-icons/resolver"
import Icons from "unplugin-icons/vite"
import Components from "unplugin-vue-components/vite"

// workaround for esm/ts import issues
import { unpluginIconViteOptions } from "./src/runtime/build/unpluginIconViteOptions.js"

export default defineConfig({
	entryGlobs: [
		"src/**/*.ts",
		"src/**/*.vue",
		"!src/**/*.stories.*",
		"!src/nuxt/**/*",
		"!src/module.ts",
	],
	pluginOpts: {
		// just for ./src/nuxt/*
		externalizeDeps: { include: [
			"#imports",
		]},
		typesPlugin: { dtsGenerator: "vue-tsc" }
	},
}, {
	plugins: [
		vue() as any,
		Components({
			// don't auto-import our own components
			dirs: [],
			resolvers: [ IconsResolver()],
			dts: "./types/components.d.ts",
		}),
		Icons(unpluginIconViteOptions)
	],
	build: {
		emptyOutDir: false,
	},
},{
	server: {
		port: 3001,
	},
})
