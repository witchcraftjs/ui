### 🚧 WORK IN PROGRESS 🚧
![Docs](https://github.com/alanscodelog/vue-components/workflows/Docs/badge.svg)
![Build](https://github.com/alanscodelog/vue-components/workflows/Build/badge.svg)
[![Release](https://github.com/alanscodelog/vue-components/workflows/Release/badge.svg)](https://www.npmjs.com/package/@alanscodelog/vue-components)

Custom vue component library.

# [Storybook](https://alanscodelog.github.io/vue-components/storybook)

# Usage with Nuxt

Everything can just be done from the config. Nuxt will automatically import the component types. The module also automatically registers it's tailwind config and provides the necessary colors to the tailwind theme viewer for use with `@nuxtjs/tailwindcss`, be sure to install it as a peer dependency.

```ts
	modules: [
		[
			"@alanscodelog/vue-components/nuxt",
			"@nuxtjs/tailwindcss",
		],
	],
	vite: {
		vue: {
			script: {
				defineModel: true,
			},
		}
	}

```

# Usage with Vite

In `main.ts` or where vue is mounted:

```ts
// import global styles required to get the component styles working
// import "@alanscodelog/vue-components/style.css" // currently broken due to same issue as above
import "../node_modules/@alanscodelog/vue-components/dist/style.css"

// import plugin
import { MyLibPlugin } from "@alanscodelog/vue-components"

import App from "./App.vue"
import { createApp } from "vue"

// add fontawesome icons
import { library } from "@fortawesome/fontawesome-svg-core"
import { far } from "@fortawesome/free-regular-svg-icons"
import { fas } from "@fortawesome/free-solid-svg-icons"


library.add(fas, far) // add needed icons, or all for dev
createApp(App)
	.use(MyLibPlugin) //use plugin

```
In the vite config, vue will require the experimental useModel:

```
	plugins: [
		vue({
			script: {
				defineModel: true,
			},
		}),
	],
```
## Setting up Tailwind

You should also be able to use tailwind directly instead of importing the styles.

You can use the exported config and merge it with your own if needed.

```ts
import componentsconfig from "@alanscodelog/vue-components/tailwind.config.ts"
import { theme } from "./lib/general/theme.js"

export default {
	...componentsConfig,
	// ... your config
	plugins: [
		// ...your plugins
		...componentsConfig.plugins
	]
}

```

If you need to setup the config completely from scratch the package provides a plugin `@alanscodelog/vue-components/tailwind/plugin.js` that sets up a few utility classes\*. It also requires setting up the theming library. The options it uses are exported for easy re-use.

```ts
import { createTailwindPlugin } from "metamorphosis/tailwind"
// you can also use your own metamorphosis theme so long as the necessary colors are provided ( warning/ok/danger/accent, neutral is also used, but that is already provided by tailwind )
import { theme } from "@alanscodelog/vue-components/theme.js"
import { libraryPlugin } from "@alanscodelog/vue-components/tailwind/plugin.js"
import { themePluginOpts } from "@alanscodelog/vue-components/tailwind/themePluginOpts.js"
import componentsconfig from "@alanscodelog/vue-components/tailwind.config.ts"

const config = {
	darkMode: "class",
	plugins: [
		// integration with my theme library
		createTailwindPlugin(theme, themePluginOpts),
		libraryPlugin,
		// .... your plugins
	],
	// ... your opts
} satisfies Config

export default config

```

\* Note that it overrides the h-screen utility to use dvh units by default, with vh as a fallback.

You will need to import `@alanscodelog/vue-components/utilities.css` and `@alanscodelog/vue-components/base.css` in your css file. 

```css
@import "@alanscodelog/vue-components/base.css";
@import "@alanscodelog/vue-components/utilities.css";
@tailwind base;
@tailwind components;
@tailwind utilities;
```

Utilities contains required utilities.

Base just contains animation keyframes and basic styles for vue animations. They are not "layered", i.e. they will get imported regardless of whether they are used since otherwise tailwind does not to detect they are being used.


## Getting Globally Registered Component Types

To get global typings, in a global declaration file (e.g. global.d.ts) do:
```ts
import { GlobalComponentTypes } from "@alanscodelog/vue-components"
declare module "@vue/runtime-core" {
	export interface GlobalComponents extends GlobalComponentTypes { }
}
```


# Development

`src/main.ts` is a playground for testing things and will work with the `dev` script which will serve a vite server in dev mode.

`scr/main.lib.ts` is the actual library export which is used when vite builds in production mode.
