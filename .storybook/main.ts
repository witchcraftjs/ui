import type { StorybookConfig } from "@storybook/vue3-vite";

const config: StorybookConfig = {
	stories: [
    {
      // 👇 Sets the directory containing your stories
      directory: '../src/',
      // 👇 Storybook will load all files that match this glob
      files: '**/*.stories.*',
      // 👇 Used when generating automatic titles for your stories
      titlePrefix: 'MyComponents',
    },
  ],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@chromatic-com/storybook",
    "@storybook/addon-interactions",
  ],
 features: {
    interactionsDebugger: true,
  },
  framework: {
    name: "@storybook/vue3-vite",
    options: {},
  },

  docs: {}
};
export default config;
