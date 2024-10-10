### 🚧 WORK IN PROGRESS 🚧
[![Docs](https://github.com/witchcraft/ui/workflows/Docs/badge.svg)](https://github.com/witchcraft/ui/actions/workflows/docs.yml)
[![Build](https://github.com/witchcraft/ui/actions/workflows/build.yml/badge.svg)](https://github.com/witchcraft/ui/actions/workflows/build.yml)
[![Release](https://github.com/witchcraft/ui/actions/workflows/release.yml/badge.svg)](https://github.com/witchcraft/ui/actions/workflows/release.yml)
[![NPM Version (with latest tag)](https://img.shields.io/npm/v/%40alanscodelog%2Fvue-components/latest)](https://www.npmjs.com/package/@witchcraft/ui/v/latest)
[![NPM Version (with beta tag)](https://img.shields.io/npm/v/%40alanscodelog%2Fvue-components/beta)](https://www.npmjs.com/package/@witchcraft/ui/v/beta)

Opinionated, batteries included, vue component library + some related utils.

- Built with accessibility in mind.
- Themable via [metamorphosis](https://github.com/alanscodelog/metamorphosis) which allows providing a custom set of tailwind variables for easier application theming (e.g. \*-fg, \*-bg, \*-accent). No regular tailwind colors are used except neutral.
- Easily tweak parts of a component via props without having to pass complicate objects. For example, the input component can take a `wrapper-class` attribute to style it's wrapper.
- Simple components have an `unstyle` option to use them minimally styled if needed\* 

This is unfortunately not true styleless since the tailwind classes are still in the build output.

# [Storybook](https://alanscodelog.github.io/vue-components/storybook)

# Usage with Nuxt

Modules, composables, and directives should work out of the box without auto imports. 

## Tailwind 

The module automatically installs `@nuxtjs/tailwindcss` and registers it's tailwind config and provides the necessary custom colors to the tailwind theme viewer.


Optionally add the base css to your styles (see more below):
```css [~/assets/css/tailwind.css]
@import "@witchcraft/ui/base.css"; 
@tailwind base;
@tailwind components;
@tailwind utilities;
```

## Icons

The module also installs the `unplugin-icons/nuxt` module and configures it with a custom config styles icons a bit better. This can be disabled with the `includeUnpluginIconsPlugins` option.

## Other

There are some additional helpers that are not auto imported. These can be imported from `#witchcraft-ui-helpers`.

Anything else that might be needed can be imported from `#witchcraft-ui`.

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

# Other

## Standalone Usage

```ts
import { defineConfig } from "vite"

// this is so we can have an esm postcss config (since the library's tailwind config is also esm)
import postcss from "./postcss.config.mjs"

import { WitchcraftUiResolver } from "@witchcraft/ui/build/WitchcraftUiResolver.js"
import IconsResolver from "unplugin-icons/resolver"
import Icons from "unplugin-icons/vite"
import Components from "unplugin-vue-components/vite"
import { unpluginIconViteOptions } from "@witchcraft/ui/build/unpluginIconViteOptions.js"

export default defineConfig({
	plugins: [
		vue() as any,
		Components({
			resolvers: [
				// required
				IconsResolver(),
				// to enable auto-imports
				// not-required
				WitchcraftUiResolver({
					// optionally change the prefix
					prefix: "W",
					filter: (name) => name !== "...",
				}),
			],
			dts: "./types/components.d.ts",
		}),
		// style the icons correctly
		Icons(unpluginIconViteOptions)
	],
	css: { postcss },
})
```

See [@witchcraft/editor/vite.config.dev.ts] and it's postcss config for a full example.

### Setting up Tailwind

#### Extra Classes

Optionally import `@witchcraft/ui/base.css` in your css file. 

```css
@import "@witchcraft/ui/base.css";
@tailwind base;
@tailwind components;
@tailwind utilities;
```

Base just contains animation keyframes and basic styles for vue animations. They are not "layered", i.e. they will get imported regardless of whether they are used since otherwise tailwind does not detect they are being used.


#### Tailwind Configuration

You can use the exported config and merge it with your own if needed.

```ts
// tailwind.config.js
import { config } from "@witchcraft/ui/tailwind/config.js"

export default  {
	...config,
	content: [
		...config.content,
		"./index.html",
		"./src/**/*.{vue,js,ts,jsx,tsx}",
		// be sure to add this or tailwind will not include the classes in the component library
		"./node_modules/@witchcraft/ui/**/*.{vue,js,ts,jsx,tsx}",
	],
	plugins: [
		...config.plugins
	]
}

```

If you need to setup the config completely from scratch the package provides a plugin `@witchcraft/ui/tailwind/plugin.js` that sets up a few utility classes\*. It also requires setting up the theming library. The options it uses are exported for easy re-use.

```ts
import { type Config } from "tailwindcss"
import { createTailwindPlugin } from "metamorphosis/tailwind.js"
// you can also use your own metamorphosis theme so long as the necessary colors are provided ( warning/ok/danger/accent, neutral is also used, but that is already provided by tailwind )
import { theme } from "@witchcraft/ui/theme.js"
import {
	plugin as libraryPlugin,
	config as componentsConfig,
	themePluginOpts,
} from "@witchcraft/ui/tailwind"

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

#### tailwind-merge

The library provides a customized twMerge instance (`@witchcraft-ui/utils/twMere.js`). You will need to use it or import the options it extends and customize your twMerge instance.

### Icons

This library uses unplugin-icons to provide icons. It installs as a dependency to have all icons available `@iconify/json` since it uses various icons.


### Getting Proper Types

While components should be correctly typed, the library internally extends vue's `AllowedComponentProps` and `HTMLAttributes` interface to allow data-* attributes and also some missing attributes (like `aria-description`).

You might need to customize these by adding the following in a global d.ts.

```ts
// to make the component types globally available you can do:
import { GlobalComponentTypes } from "@witchcraft/ui"
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


# Development

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
