export default defineNuxtConfig({
	modules: [
		"../src/module"
	],
	devtools: { enabled: true },
	future: {
		compatibilityVersion: 4 as const
	},
	compatibilityDate: "2024-09-23",
	vite: {
		build: {
			rollupOptions: {
				output: {
					// #awaiting https://github.com/nuxt/nuxt/issues/31326
					sanitizeFileName: true
				}
			}
		}
	},
	witchcraftUi: {
		// only needed for the package's playground
		// because we can't resolve the package name from tailwind
		_playgroundWorkaround: true
	}
})
