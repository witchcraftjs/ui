// for storybook only, this can be deleted when storybook supports tailwind v4 via vite
// #awaiting https://github.com/tailwindlabs/tailwindcss/discussions/16451
/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    "@tailwindcss/postcss": {},
  },
}

export default config
