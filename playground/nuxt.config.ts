export default defineNuxtConfig({
	devtools: { enabled: true },
	compatibilityDate: "2024-09-23",
	future: {
		compatibilityVersion: 4 as const
	},
	modules: [
		"../src/module"
		// or "@witchcraft/ui", // either work
	],
	witchcraftUi: {
	},
})
