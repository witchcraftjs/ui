export default defineAppConfig({
	ui: {
		colors: {
			primary: "sky",
			neutral: "slate"
		},
		prose: {
			h1: {
				slots: {
					base: "font-brand"
				}
			},
			h2: {
				slots: {
					base: "font-brand"
				}
			},
			h3: {
				slots: {
					base: "font-brand"
				}
			},
			h4: {
				slots: {
					base: "font-brand"
				}
			}
		},
		pageHero: {
			slots: {
				title: "font-brand text-4xl sm:text-5xl"
			}
		},
		pageHeader: {
			slots: {
				title: "font-brand"
			}
		}
	},
	seo: {
		siteName: "@witchcraft/ui"
	},
	header: {
		title: "@witchcraft/ui",
		to: "/",
		logo: {
			alt: "@witchcraft/ui",
			light: "",
			dark: ""
		},
		search: true,
		colorMode: true,
		links: [{
			icon: "i-simple-icons-github",
			to: "https://github.com/witchcraftjs/ui",
			target: "_blank",
			"aria-label": "GitHub"
		}]
	},
	footer: {
		credits: `@witchcraft/ui • © ${new Date().getFullYear()}`,
		colorMode: false,
		links: [
			{
				icon: "i-simple-icons-github",
				to: "https://github.com/witchcraftjs/ui",
				target: "_blank",
				"aria-label": "Github"
			},
			{
				icon: "i-simple-icons-npm",
				to: "https://www.npmjs.com/package/@witchcraft/ui",
				target: "_blank",
				"aria-label": "npm"
			}
		]
	},
	toc: {
		title: "Table of Contents",
		bottom: {
			title: "Community",
			edit: "https://github.com/witchcraftjs/ui/edit/main/docs-site/content",
			links: []
		}
	}
})
