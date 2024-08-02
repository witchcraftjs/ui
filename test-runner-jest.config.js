const { getJestConfig } = require("@storybook/test-runner")

const testRunnerConfig = getJestConfig()

/**
 * @type {import('@jest/types').Config.InitialOptions}
 */
module.exports = {
	...testRunnerConfig,
	testEnvironmentOptions: {
		...testRunnerConfig.textEnvironmentOptions,
		"jest-playwright": {
			...testRunnerConfig.testEnvironmentOptions["jest-playwright"],
			browsers:
				// for local dev on nixos
				process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH
					? [
						{
							displayName: "Chromium",
							name: "chromium",
							launchOptions: {
								executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH,
							},
						}
					]
					: testRunnerConfig.testEnvironmentOptions["jest-playwright"].browsers,
		}
	}
}
