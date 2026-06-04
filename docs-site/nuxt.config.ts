export default defineNuxtConfig({
	modules: [
		"@witchcraft/ui",
		"@nuxt/content",
		"@nuxt/ui",
		"@nuxt/image",
		"nuxt-og-image",
		"nuxt-llms",
		"nuxt-component-meta"
	],
	ssr: true,

	devtools: {
		enabled: true
	},

	css: ["~/assets/css/main.css"],
	site: {
		url: "https://witchcraftjs.github.io/ui",
		name: "@witchcraft/ui"
	},
	content: {
		build: {
			markdown: {
				toc: {
					searchDepth: 1
				}
			}
		},
		experimental: {
			sqliteConnector: "native"
		}
	},

	ui: {
		prose: true
	},

	experimental: {
		asyncContext: true
	},

	nitro: {
		prerender: {
			routes: ["/"],
			crawlLinks: true,
			autoSubfolderIndex: false
		}
	},
	typescript: {
		tsConfig: {
			compilerOptions: {
				// Skip type-checking of all declaration files (.d.ts)
				skipLibCheck: true
			}
		}
	},

	componentMeta: {
		// cache: true,
		transformers: [(component, code) => {
			// strip @vue-ignore intersections so inherited HTML attrs don't pollute props
			code = code.replace(/&\s+\/\*\*\s*@vue-ignore\s*\*\/\s*(?:\S.*)?$/gm, "")
			return { component, code }
		}],
		exclude: [
			"@nuxt/ui",
			"@nuxt/content",
			"@nuxt/icon",
			"@nuxt/image",
			"@nuxtjs/color-mode",
			"@nuxtjs/mcp-toolkit",
			"@nuxtjs/mdc",
			"@comark/vue",
			"nuxt/dist",
			"nuxt-og-image",
			"./app/components"
		]
	},

	icon: {
		provider: "iconify"
	},

	llms: {
		domain: "https://witchcraftjs.github.io/ui",
		title: "@witchcraft/ui",
		description: "Vue component library built on Reka UI with Tailwind CSS, themable via Metamorphosis.",
		full: {
			title: "Full Documentation",
			description: "Full documentation of the application"
		},
		contentRawMarkdown: {
			rewriteLLMSTxt: false
		}
	},


	ogImage: {
		zeroRuntime: true
	}
})
