### 🚧 WORK IN PROGRESS 🚧
[![Docs](https://github.com/alanscodelog/vue-components/workflows/Docs/badge.svg)](https://github.com/alanscodelog/vue-components/actions/workflows/docs.yml)
[![Build](https://github.com/alanscodelog/vue-components/actions/workflows/build.yml/badge.svg)](https://github.com/alanscodelog/vue-components/actions/workflows/build.yml)
[![Release](https://github.com/alanscodelog/vue-components/actions/workflows/release.yml/badge.svg)](https://github.com/alanscodelog/vue-components/actions/workflows/release.yml)
[![NPM Version (with latest tag)](https://img.shields.io/npm/v/%40alanscodelog%2Fvue-components/latest)](https://www.npmjs.com/package/@alanscodelog/vue-components/v/latest)
[![NPM Version (with beta tag)](https://img.shields.io/npm/v/%40alanscodelog%2Fvue-components/beta)](https://www.npmjs.com/package/@alanscodelog/vue-components/v/beta)

This is a vue component library that I've been slowly building for use in my personal projects. It's opinionated and batteries included, but also customizable where I've found it useful and needed.

- Parts can be easily styled without replacing them completely without having to pass complicated objects down. For example, the input component can take a `wrapper-class` attribute to style it's wrapper.
- Parts can be replaced if needed and components have slots to easily swap parts out.
- Simple components can be used minimally style if needed, though this is unfortunately not true styleless since the tailwind classes are still in the build output.
- Built with accessibility in mind.
- Built with theming in mind and uses a custom library [metamorphosis](https://github.com/alanscodelog/metamorphosis) to provide a custom set of tailwind variables for easier application theming (e.g. \*-fg, \*-bg, \*-accent). No regular tailwind colors are used except neutral.


# [Storybook](https://alanscodelog.github.io/vue-components/storybook)

# Usage with Nuxt

Everything can just be done from the config. Nuxt will automatically import the component types. The module also automatically registers it's tailwind config and provides the necessary colors to the tailwind theme viewer for use with `@nuxtjs/tailwindcss`, be sure to install it as a peer dependency.

You can also configure which directives the vue plugin auto-imports with the witchcraftComponents key (the lib will soon be renamed).

```ts
	modules: [
		[
			"@alanscodelog/vue-components/nuxt",
			"@nuxtjs/tailwindcss",
		],
	],
	witchcraftComponents: {
		// only register some directives globally
		directives: ["v..."]
	},
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
// if NOT using tailwind a global style import is required to get the component styles working
// proper import is currently broken, vite is not properly resolving css imports 
// import "../node_modules/@alanscodelog/vue-components/dist/style.css"

// import plugin
import { VueComponentsPlugin } from "@alanscodelog/vue-components"

import App from "./App.vue"
import { createApp } from "vue"

createApp(App)
	.use(VueComponentsPlugin) //use plugin

```
In the vite config, vue will require the experimental defineModel:

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

### Extra Classes

You will need to import `@alanscodelog/vue-components/utilities.css` and `@alanscodelog/vue-components/base.css` in your css file. 

```css
@import "@alanscodelog/vue-components/base.css";
@import "@alanscodelog/vue-components/utilities.css";
@tailwind base;
@tailwind components;
@tailwind utilities;
```

Utilities contains required utilities.

Base just contains animation keyframes and basic styles for vue animations. They are not "layered", i.e. they will get imported regardless of whether they are used since otherwise tailwind does not detect they are being used.


### Tailwind Configuration

You can use the exported config and merge it with your own if needed.

```ts
import { config } from "@alanscodelog/vue-components/tailwind/config.js"

export default  {
	...config,
	content: [
		...config.content,
		"./index.html",
		"./src/**/*.{vue,js,ts,jsx,tsx}",
		// be sure to add this or tailwind will not include the classes in the component library
		"./node_modules/@alanscodelog/vue-components/**/*.{vue,js,ts,jsx,tsx}",
	],
	plugins: [
		...config.plugins
	]
}

```

If you need to setup the config completely from scratch the package provides a plugin `@alanscodelog/vue-components/tailwind/plugin.js` that sets up a few utility classes\*. It also requires setting up the theming library. The options it uses are exported for easy re-use.

```ts
import { type Config } from "tailwindcss"
import { createTailwindPlugin } from "metamorphosis/tailwind"
// you can also use your own metamorphosis theme so long as the necessary colors are provided ( warning/ok/danger/accent, neutral is also used, but that is already provided by tailwind )
import { theme } from "@alanscodelog/vue-components/theme.js"
import {
	plugin as libraryPlugin,
	config as componentsConfig,
	themePluginOpts,
} from "@alanscodelog/vue-components/tailwind"

const config = {
	darkMode: "class",
	content: [/* ... */],
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

## Other

The library uses a customized twMerge instance, you can import it from `@alanscodelog/vue-components/helpers/twMerge.js` or import the options it extends  twMerge with.


## Getting Proper Types

While components should be correctly typed, the library internally extends vue's `AllowedComponentProps` and `HTMLAttributes` interface to allow data-* attributes and also some missing attributes (like `aria-description`).

To get these types, in a global declaration file (e.g. global.d.ts) do:

```ts
// apply library's extended attributes and props
/// <reference types="@alanscodelog/vue-components" />

```
You might also need to add the following:

```ts
// to make the component types globally available you can do:
import { GlobalComponentTypes } from "@alanscodelog/vue-components"
declare module "@vue/runtime-core" {
	export interface GlobalComponents extends GlobalComponentTypes { }
}

// to extend HTMLAttributes and AllowedComponentProps yourself you can do:
declare module "@vue/runtime-dom" {
	export interface HTMLAttributes {
		// ...
	}
}

declare module "@vue/runtime-core" {
	export interface AllowedComponentProps {
		// ...
	}
}
export {}
```

Note that using the strictTemplates compiler option causes weird issues with fallthrough props.

## Icons

This library uses unplugin-icons to provide icons. This means they should work out of the box. 

If you want to use unplugin-icons in a similar manner to it, you can configure it like so in the vite config:

You will also probably want to configure auto importing of the icon component. It's a wrapper that can be used around icons to make them take up a full line height so things like buttons don't shrink when they're just icons.
```ts
// vite.config.ts
import IconsResolver from "unplugin-icons/resolver"
import Icons from "unplugin-icons/vite"
import Components from "unplugin-vue-components/vite"
import { defineConfig } from "vite"

export default async ({ mode }: { mode: string }) => defineConfig({
	plugins: [
// ...
		Components({
			// don't auto-import our own components
			// (am usually not a fan of auto-importing)
			dirs: [], 
			resolvers: [
				IconsResolver(),
				// e.g. custom resolver to auto import only the icon component 
				(componentName) => {
					if (componentName.startsWith('icon'))
					return { name: componentName, from: '@alanscodelog/vue-components/components/Icon
				},
			],
		}),
		Icons({
			// makes this work like fontawesome
			scale: 0, // removes the scale
			// the icon class is just descriptive and does nothing
			// we cannot use tailwind classes here because we would have to 
			// tell it to include them manually (pain)
			defaultClass: "icon",
			// width is left up to the icon like in fontawesome
			// fontawesome has a `fixed-width` attribute that you can use that set's it
			// to simulate it you can just add the tailwind class `w-[1em]` to the icon 
			defaultStyle: "vertical-align: -0.125em; height: 1em; display: inline-block;",
		})
	],
	// ...
})

```

# General Usage

# Props

To make it easier to style parts of components or override behavior, some components can accept additional prefixed attributes, for example, you can pass `wrapper-class` to the input component to style it's wrapper.

I think this is nicer in general than having to pass an object with extra attributes. The only weird part, is because of how vue changes the case of props, for attributes like `innerHTML` you will need to pass `{prefix}-inner-h-t-m-l`, but all components have proper types to help this. Similarly events look like `{prefix}-on-click`.

# Slots

Usually it is possible to do most modifications through props, but slots to replace parts of components are available.

Most slots where possible are passed all properties needed to replace them except classes so you can do something like this, to for example replace the simple input component inside the input component.

```vue
<lib-input>
	<template #input="slotProps">
		<lib-simple-input
			:class="'completely custom styles'"
			v-bind="slotProps"
		></lib-simple-input>
	</template>
</lib-input>

```

# Development

`src/main.ts` is a playground for testing things and will work with the `dev` script which will serve a vite server in dev mode.

`scr/main.lib.ts` is the actual library export which is used when vite builds in production mode.

## Props

Due to issues with vue 3 removing $listeners and the fact that we can't inherit from an existing HTML attribute types to specify props for wrapper components (most of them), we have to declare props in a convoluted way to get proper types when we consume the componenets.

Here is an example of the needed code for props to work correctly:
```vue
<script lang="ts">
// this is done in a seperate script so that it actually compiles
// and we can have interface merging, a setup script cannot interface merge

import type { BaseInteractiveProps } from "../shared/props.js"

// if using useDivideAttrs, we need to do the below for each prefix
// a helper type WrapperProps is provided to do this
type WrapperTypes =  (WrapperProps<"wrapper", HTMLAttributes, {
	// overrides
	/** Tailwind classes. */
	class:string;
}>)

// real props vue can understand, they will show up under props.*
type RealProps =
// simple types are okay
& BaseInteractiveProps
& {
	// any ignored props that we need to use in the component template 
	// will need to be re-defined so vue can see them
	// in a way vue can see them if it's one of the problem properties
	id?: InputHTMLAttributes["id"]
}


interface Props
	extends
	// we need to ignore the complex InputHTMLAttributes type
	// otherwise vue compilation fails
	// if we ignore it, all it's properties are passed as fallback attrs
	// NOT to props as normal
	// we also need to omit properties or events that the component overrides with a different type
	/** @vue-ignore */
	Partial<Omit<InputHTMLAttributes,"class" | "onSubmit"> & {
		//	overrides for the components
		// usually, for example, class can only be a string (because of tailwind)
		// this is still part of the ignored type above 
		// it will be passed as an attr
		class?:string
	}>,
	/** @vue-ignore */
	Partial<WrapperTypes>,
	RealProps
{ }
</script>

<script lang="ts" setup>
// eslint-disable-next-line no-duplicate-imports
import { baseInteractivePropsDefaults } from "../shared/props.js"

const props = withDefaults(defineProps<Props>(), {
	id: "",
	...baseInteractivePropsDefaults
})
const $ = useDivideAttrs(["wrapper"] as const)
</script>
```

For prop types that don't error, I think we can just define them normally, but then it turns into a mess, some components will have their values in props, some in $attrs, this way. This is consistent and also more in line with what we expect.

Related Links:
- https://github.com/vuejs/rfcs/discussions/397
- https://github.com/vuejs/core/issues/8522
- https://github.com/vuejs/rfcs/pull/477
- https://github.com/vuejs/language-tools/issues/1232#issuecomment-1118176103
