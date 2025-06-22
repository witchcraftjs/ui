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
			files: [`**/*.stories.*`],
			rules: {
				"@typescript-eslint/explicit-function-return-type": "off"
			}
		},
	)
	.overrideRules({
		"@typescript-eslint/switch-exhaustiveness-check": ["warn", {
			considerDefaultExhaustiveForUnions: true
		}],
		"jsdoc/check-tag-names": ["warn", {
			definedTags: [
				"vue-ignore",
				"experimental"
			]
		}]
	})
