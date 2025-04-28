import { vueConfig } from "@alanscodelog/eslint-config"
import { createConfigForNuxt } from "@nuxt/eslint-config/flat"

// Run `npx @eslint/config-inspector` to inspect the resolved config interactively
export default createConfigForNuxt({
	features: {
		tooling: false, // is overriding standalone?
		stylistic: false,
		standalone: false
	},
	dirs: {
		src: [
			"./playground",
		],
	},
})
	.append(
		...vueConfig,
		{
			files: ["**/*"],
			ignores: [".nuxt/"],
			// for auto imports
			rules: {
				"no-undef": "off",
			},
		},
		{
			files: [`**/*.stories.*`],
			rules: {
				"@typescript-eslint/explicit-function-return-type": "off"
			}
		},
		{
			files: [`**/*.vue`],
			rules: {
				"jsdoc/check-tag-names": ["warn", {
					definedTags: [
						"vue-ignore",
						"experimental"
					]
				}]
			}
		},
		
	)
