
export default {
  "stories": [
    "../src/**/*.stories.mdx",
    "../src/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials"
  // "@storybook/addon-a11y"
  ],

  "framework": "@storybook/vue3-vite",
  core: {
    builder: "@storybook/builder-vite"
  },
  docsPage: {
    docs: "automatic"
  },
  async viteFinal(config, { configType }) {
    // remove babel plugin used in build
    const index = config.plugins.findIndex(plugin => plugin.name=== "babel")
    config.plugins.splice(index, 1)
    return config;
  },
};
