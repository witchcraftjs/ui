### 🚧 WORK IN PROGRESS 🚧
![Docs](https://github.com/alanscodelog/vue-components/workflows/Docs/badge.svg)
![Build](https://github.com/alanscodelog/vue-components/workflows/Build/badge.svg)
[![Release](https://github.com/alanscodelog/vue-components/workflows/Release/badge.svg)](https://www.npmjs.com/package/@alanscodelog/vue-components)

Custom vue component library.

# [Storybook](https://alanscodelog.github.io/vue-components/storybook)

# Development

`src/main.ts` is a playground for testing things and will work with the `dev` script which will serve a vite server in dev mode.

`scr/main.lib.ts` is the actual library export which is used when vite builds in production mode.


## Usage with Vite

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

<!-- TODO test -->
You should also be able to use tailwind directly instead of importing the styles.

The package provides a plugin `@alanscodelog/vue-components/tailwind/plugin.js` that can be used with tailwind. It should then be configured similar to the library's config.

```ts
import { createTailwindPlugin } from "metamorphosis/tailwind"
import {libraryPlugin} from "@alanscodelog/vue-components/tailwind/plugin.js"
import {themePluginOpts} from "@alanscodelog/vue-components/tailwind/themePluginOpts.js"
const config = {
	darkMode: "class",
	plugins: [
		// integration with my theme library
		// alternatively provide the colors warning/ok/danger/accent (neutral is also used, but that is already provided by tailwind)
		createTailwindPlugin(theme, themePluginOpts),
		libraryPlugin,
	],
} satisfies Config

export default config

```

You will need to import `@alanscodelog/vue-components/utilities.css` and optionally `@alanscodelog/vue-components/base.css` in your css file.

Utilities contains required utilities.

Base just contains some basic styles for vue's animations.


## Getting Globally Registered Component Types

To get global typings, in a global declaration file (e.g. global.d.ts) do:
```ts
import { GlobalComponentTypes } from "@alanscodelog/vue-components"
declare module "@vue/runtime-core" {
	export interface GlobalComponents extends GlobalComponentTypes { }
}
```
## Usage with Nuxt

Everything can just be done from the config. Nuxt will automatically import the component types.

```ts
	css: [
		// required to get the component styles working
		"@alanscodelog/vue-components/styles.css",
	],
	modules: [
		["@alanscodelog/vue-components/nuxt"],
	],
	vite: {
		vue: {
			script: {
				defineModel: true,
			},
		}
	}

```
