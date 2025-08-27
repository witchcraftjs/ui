### 🚧 WORK IN PROGRESS 🚧
[![Docs](https://github.com/witchcraftjs/ui/workflows/Docs/badge.svg)](https://github.com/witchcraftjs/ui/actions/workflows/docs.yml)
[![Release](https://github.com/witchcraftjs/ui/actions/workflows/release.yml/badge.svg)](https://github.com/witchcraftjs/ui/actions/workflows/release.yml)
[![NPM Version (with latest tag)](https://img.shields.io/npm/v/%40witchcraft%2Fui/latest)](https://www.npmjs.com/package/@witchcraft/ui/v/latest)

Opinionated, batteries included, vue/nuxt component library + some related utils.

- Built with accessibility in mind.
- Themable via [metamorphosis](https://github.com/alanscodelog/metamorphosis) which allows providing a custom set of tailwind variables for easier application theming (e.g. \*-fg, \*-bg, \*-accent). No regular tailwind colors are used except neutral.
- Easily tweak parts of a component via props without having to pass complicate objects. For example, the input component can take a `wrapper-class` attribute to style it's wrapper.
- Simple components have an `unstyle` option to use them minimally styled if needed\* 

This is unfortunately not true styleless since the tailwind classes are still in the build output.

# [Storybook](https://witchcraftjs.github.io/ui/storybook)

# Usage with Nuxt

Modules, composables, and directives should work out of the box without auto imports. The module also installs the `reka-ui/nuxt` module.

## Tailwind (V4)

The module automatically sets up tailwind v4 and generates a custom `witchcraft-ui.css` file with the proper imports, just add it in your tailwind css file.

It does not install "@nuxtjs/tailwindcss" for now since it's not compatible with v4. See [#919](https://github.com/nuxt-modules/tailwindcss/issues/919).

```css [~/assets/css/tailwind.css]
@import "@tailwindcss" source("../../../app");
@import "../../../.nuxt/witchcraft-ui.css";

// without Nuxt:
@import "@witchcraft/ui/utils.css";
@import "@witchcraft/ui/base.css";
// source used components
@source "@witchcraft/ui/components";

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
<lib-simple-input-deprecated>
	<template #input="slotProps">
		<lib-simple-input
			:class="'completely custom styles'"
			v-bind="slotProps"
		></lib-simple-input>
	</template>
</lib-simple-input>

```

# Other

## Standalone Usage

```ts
import { defineConfig } from "vite"

import { WitchcraftUiResolver } from "@witchcraft/ui/build/WitchcraftUiResolver"
import IconsResolver from "unplugin-icons/resolver"
import Icons from "unplugin-icons/vite"
import Components from "unplugin-vue-components/vite"
import { unpluginIconViteOptions } from "@witchcraft/ui/build/unpluginIconViteOptions"

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
})
```

See [@witchcraft/editor/vite.config.dev.ts].

### Setting up Tailwind

#### Extra Classes

```css
@import "@witchcraft/ui/utils.css";
@import "@witchcraft/ui/base.css";
@source "/path/to/node_modules/@witchcraft/ui/src/runtime/components";
```
Base just contains animation keyframes, basic styles for vue animations, and some basic global styles. They will get imported regardless of whether they are used since otherwise tailwind does not detect they are being used.

#### tailwind-merge

The library provides a customized twMerge instance (`@witchcraft-ui/utils/twMere.js`). You will need to use it or import the options it extends and customize your twMerge instance.

### Icons

This library uses unplugin-icons to provide icons. It installs as a dependency to have all icons available `@iconify/json` since it uses various icons.


### Getting Proper Types

While components should be correctly typed, the library internally extends vue's interfaces to allow data-* attributes and also some missing aria attributes (like `aria-description`).

You might need to customize these by adding the following in a global d.ts.

```ts
// to make the component types globally available you can do:
import { GlobalComponentTypes } from "@witchcraft/ui"
declare module "@vue/runtime-core" {
	interface GlobalComponents extends GlobalComponentTypes { }
}

// to add more attributes yourself you can do:
declare module "vue" {
	interface HTMLAttributes {
		// ...
	}
	interface AriaAttributes {
		// ...
	}
	interface ComponentCustomProps {
		// ...
	}
}
export {}
```

Note that using the strictTemplates compiler option can cause weird issues with fallthrough props.


# Development

## Props

Due to issues with vue 3 removing $listeners and the fact that we can't inherit from an existing HTML attribute types to specify props for wrapper components (most of them), we have to declare props in a convoluted way to get proper types when we consume the components.

Here is an example of the needed code for props to work correctly:
```vue
<script lang="ts">
// this is done in a seperate script so that it actually compiles
// and we can have interface merging, a setup script cannot interface merge

import type { BaseInteractiveProps } from "../shared/props.js"

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
		// this will be passed as an attr
		class?:string
	}>,
	/** @vue-ignore */
	RealProps
{ }
</script>

<script lang="ts" setup>
const props = withDefaults(defineProps<Props>(), {
	id: "",
	unstyle: false, disabled:false, readonly:false, border:true,
})
const $attrs = useAttrs()
</script>
```

For prop types that don't error, I think we can just define them normally, but then it turns into a mess, some components will have their values in props, some in $attrs, this way. This is consistent and also more in line with what we expect.

Related Links:
- https://github.com/vuejs/rfcs/discussions/397
- https://github.com/vuejs/core/issues/8522
- https://github.com/vuejs/rfcs/pull/477
- https://github.com/vuejs/language-tools/issues/1232#issuecomment-1118176103
