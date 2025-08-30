export default defineNuxtConfig({
	devtools: { enabled: true },
	compatibilityDate: "2024-09-23",
	future: {
		compatibilityVersion: 4 as const
	},
	modules: [
		"../src/module"
		// the below also works, just remember to run the update-dep script and uncomment ../src/module above before attempting to use the file: linked module
		// "@witchcraft/ui/nuxt"
	],
	witchcraftUi: {
		// only needed for the package's playground
		// because we can't resolve the package name from tailwind
		_playgroundWorkaround: true,
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
