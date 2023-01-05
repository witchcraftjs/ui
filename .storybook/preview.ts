export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  layout: "fullscreen",
  backgrounds: {
    default: 'light theme',
    values: [
      {
        name: 'light theme',
        value: '#fdfdfd',
      },
      {
        name: 'dark theme',
        value: '#00000',
      },
    ],
  },
}
