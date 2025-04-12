export default defineNuxtConfig({
	devtools: { enabled: true },
	compatibilityDate: "2024-09-23",
	future: {
		compatibilityVersion: 4 as const
	},
	modules: [
		"../src/module"
		// "@witchcraft/ui/nuxt", // either work
	],
	witchcraftUi: {
	},
	vite: {
		build: {
			rollupOptions: {
				output: {
					// #awaiting https://github.com/nuxt/nuxt/issues/31326
					sanitizeFileName: true,
				},
			},
		},
	},
})
