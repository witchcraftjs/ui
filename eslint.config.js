import { allFileTypes, tsEslintConfig, vueConfig } from "@alanscodelog/eslint-config"
export default tsEslintConfig(
	// https://github.com/AlansCodeLog/eslint-config
	...vueConfig,
	{
		files: [`**/*.{${allFileTypes.join(",")}}`],
		languageOptions: {
			parserOptions: {
				// was causing issues, went back to old usage of separate eslint config
				// eslint-disable-next-line camelcase
				EXPERIMENTAL_useProjectService: false,
				project: "./tsconfig.eslint.json",
				tsconfigRootDir: import.meta.dirname,
			},
		},
		ignores: [
			// ...
		],
	},
	{
		files: [`**/*.stories.*`],
		rules: {
			"@typescript-eslint/explicit-function-return-type": "off"
		}
	}
	// RULE LINKS
	// Eslint: https://eslint.org/docs/rules/
	// Typescript: https://typescript-eslint.io/rules/
	// Vue: https://eslint.vuejs.org/rules/
)
