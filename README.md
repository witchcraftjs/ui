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
@import "@witchcraft/ui/animations.css";
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
@import "@witchcraft/ui/animations.css";
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

Props and attribute typing used to have a lot of issues with vue. It's improved a bit. A typical component looks like this:

```vue
<template>
<div
	:class="twMerge(`
		our-classes
	`, ($attrs as any).class)"
	v-bind="{ ...$attrs, class: undefined }"
>
	...
</div>
</template>
<script lang="ts">
import type { BaseInteractiveProps } from "../../types/index.js"

// only if it makes sense, otherwise prefer a prop (___Attrs for attributes, ___Props if it wraps reka-ui props)
// we do this regardless of whether we pass to the root or not (since we never allow non-tailwind classes)
const $attrs = useAttrs()
const props = withDefaults(defineProps<
	& BaseInteractiveProps
	& {
		// if we need an id for hydration or some internal aria connection
		id?: string
		// if we allow setting a label via text
		label?: string
		// note we omitted it above, will be available via props.disabled
		disabled?: boolean
		// if we just need to pass "attributes" to the root
		inputAttrs?: Omit<InputHTMLAttributes, "class"> & TailwindClassProp
		// if we need to pass, to for example, a reka-ui Content component
		contentProps?: PopoverContentProps & EmitsToProps<DialogContentEmits> & Omit<HTMLAttributes, "class"> & TailwindClassProp
	}
	// the parts under the ignore type the $attrs and are NOT available on props.*
	// they must be accessed via $attrs and are not reactive
	// if we need to change the type or need access to the prop via props.* we can omit it here
	& /** @vue-ignore */ Omit<InputHTMLAttributes, "class" | "disabled">
	& /** @vue-ignore */ TailwindClassProp
>(), {
	label: "",
	// the defaults for BaseInteractiveProps that are not false by default, and no, they can't be spread
	// see https://github.com/nuxt/module-builder/issues/649
	border: true
})
// uses useId if id is not set so we have an id if we need it for hydration
const finalId = useFallbackId(props)
const modelValue = defineModel<string>({ required: false, default: "" })
// use for inputs or elements where it's highly likely the user can start setting a value before hydration
usePreHydrationValue(finalId, modelValue)

</script>
<script lang="ts">
/**
 * If the component requires general docs, they should be written here over the export default.
 */
export default {
	name: "WComponentName"
	// https://v3.vuejs.org/guide/typescript-support.html#annotating-props
}
</script>```

Related Links:
- https://github.com/vuejs/rfcs/discussions/397
- https://github.com/vuejs/core/issues/8522
- https://github.com/vuejs/rfcs/pull/477
- https://github.com/vuejs/language-tools/issues/1232#issuecomment-1118176103
