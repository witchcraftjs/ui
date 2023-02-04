const path = require("path")


module.exports = {
	root: true,
	extends: [
		// https://github.com/AlansCodeLog/eslint-config
		"@alanscodelog/eslint-config/vue",
    "plugin:storybook/recommended"
	],
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
		project: "tsconfig.json",
		extraFileExtensions: ['.vue'], //fixes eslint not linting vue files
		// debugLevel: true,
	},
	rules: {
	},
	overrides: [
		{
			files: ["./*.{js,cjs,ts,vue}"],
			rules: {
				"@typescript-eslint/explicit-function-return-type": "off",
			}
		}
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
