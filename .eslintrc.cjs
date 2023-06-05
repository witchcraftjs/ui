module.exports = {
	root: true,
	extends: [
		// https://github.com/AlansCodeLog/eslint-config
		"@alanscodelog/eslint-config/vue",
		"plugin:storybook/recommended",
		"plugin:tailwindcss/recommended"
	],
	settings: {
		tailwindcss: {
			// classRegex: "^(data|type|outlined)(.*)?$",
		}
	},
	// for vscode, so it doesn't try to lint files in here when we open them
	ignorePatterns: [
		"coverage",
		"dist",
		"docs",
		"**/*.scss",
		"**/*.html"
	],
	parser: "vue-eslint-parser",
	parserOptions: {
		parser: "@typescript-eslint/parser",
		project: "tsconfig.eslint.json",
		extraFileExtensions: ['.vue'], //fixes eslint not linting vue files
		// debugLevel: true,
	},
	rules: {
		"@typescript-eslint/unified-signatures": "off",
		"jsdoc/newline-after-description": "off",
		"tailwindcss/no-custom-classname": "off",
		"@typescript-eslint/explicit-function-return-type": "off",
		"import/no-namespace": "off",
		"no-restricted-imports":"off"
	},
	overrides: [
		// Eslint: https://eslint.org/docs/rules/
		// Typescript: https://typescript-eslint.io/rules/
		// Vue: https://eslint.vuejs.org/rules/
		// {
		// 	files: ["**/*.js", "**/*.ts", "**/*.vue"],
		// 	rules: {
		// 	},
		// },
	],
}
