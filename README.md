### 🚧 WORK IN PROGRESS 🚧

Custom vue component library.

# [Storybook](https://alanscodelog.github.io/vue-components/storybook)

# Development

`src/main.ts` is a playground for testing things and will work with the `dev` script which will serve a vite server in dev mode.

`scr/main.lib.ts` is the actual library export which is used when vite builds in production mode.


## Usage with Vite

```ts
	css: {
		preprocessorOptions: {
			scss: {
				// import scss mixins into every scss file
				// note: requires exact (illegal) path to work
				// without it there are errors and i think we run into https://github.com/nuxt/vite/issues/71
				additionalData: `
					@import "node_modules/@alanscodelog/vue-components/src/assets/mixins.scss";
				`,
			},
		},
	},
```

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
	]
	vite: {
		//.. same options as above
		css: {
			preprocessorOptions: {
				scss: {
					// import scss mixins into every scss file
					// note: requires exact (illegal) path to work
					// without it there are errors and i think we run into https://github.com/nuxt/vite/issues/71
					additionalData: `
						@import "node_modules/@alanscodelog/vue-components/src/assets/mixins.scss";
					`,
				},
			},
		},
	}

```
