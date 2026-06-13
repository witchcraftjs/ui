This repository is a collection of vue components and related utilities, composables, etc. It is mainly used as a nuxt module.

Majority of code is in `src/runtime`.


## Creating Components

Compnent should go in `src/runtime/components/WSomeComponent/WSomeComponent.vue` and be exported in `src/runtime/components/index.ts`

If creating multiple components, ask whether to create individual folders for each or to place them in one folder (since the rest are internal).

For example, multiple components might look like this:

```
src/runtime/components/WSomeComponent/WSomeComponent.vue // imports SomeSubComponent
src/runtime/components/WSomeComponent/WSomeSubComponent.vue // internal component not exported
src/runtime/components/WSomeComponent/WSomeComponent.stories.ts // use one story unless told otherwise
src/runtime/components/WSomeComponent/WSomeComponent.md
```

### Style

Here's the skeleton checkbox uses as an example as it's a particularly good one. I have omitted classes for clarity.

```vue [src/runtime/components/WCheckbox/WCheckbox.vue]
<template>
<div
	:class="twMerge(`
		checkbox--wrapper
		...
	`,
		(disabled || readonly) && `
			...
		`,
		wrapperAttrs?.class
	)"
	v-bind="{ ...wrapperAttrs, class: undefined }"
	ref="el"
>
	<slot name="left"/>
	<label
		:class="twMerge(`
			checkbox--label
			...
		`,
			labelAttrs?.class
		)"
		v-bind="{ ...labelAttrs, class: undefined }"
	>
		<CheckboxRoot
			:id="finalId"
			:disabled="disabled || readonly"
			:class="!unstyle && twMerge(`
				checkbox
					...
			`,
				($attrs as any)?.class // must be EXACTLY like this
			)"
			v-bind="{ ...$attrs, class: undefined }"

			v-model="modelValue"
		>
			<CheckboxIndicator class="">
				<WIcon class=""><i-lucide-check/></WIcon>
			</CheckboxIndicator>
		</CheckboxRoot>

		<slot/> {{ label }}
	</label>
</div>
</template>

<script setup lang="ts">
import { CheckboxIndicator, CheckboxRoot } from "reka-ui"
import type { HTMLAttributes, InputHTMLAttributes } from "vue"
import { useAttrs } from "vue"

import ILucideCheck from "~icons/lucide/check"

import { useFallbackId } from "../../composables/useFallbackId.js"
import { usePreHydrationValue } from "../../composables/usePreHydrationValue.js"
import type { BaseInteractiveProps, TailwindClassProp } from "../../types/index.js"
import { twMerge } from "../../utils/twMerge.js"
import WIcon from "../WIcon/WIcon.vue"

const $attrs = useAttrs()

defineOptions({
	// all components are W prefixed
	name: "WCheckbox",
	inheritAttrs: false
})

const props = withDefaults(defineProps<
	// the base props are disabled, readonly, border, and unstyle
	// omit props we can't handle (e.g. border if component is complex or not bordered, unstyle if element is too complex)
	& BaseInteractiveProps
	& {
		id?: string
		label?: string
		labelAttrs?: Omit<HTMLAttributes, "class"> & TailwindClassProp
		wrapperAttrs?: Omit<HTMLAttributes, "class"> & TailwindClassProp
	}
	// the vue ignore allows fallthrough props to be typed without vue trying to handle them, must be written like this, inline
	& /** @vue-ignore */ Omit<
		InputHTMLAttributes,
		// omit classes we handle, always omit class, we only allow string tailwind classes
		"class" | "readonly" | "disabled" | "onSumbit"
		// must always be excluded from input attributes, leave the next line's comment in the file
		// https://github.com/vuejs/core/pull/14237 and https://github.com/vuejs/core/issues/10514
		|"autocomplete"
	>
	& /** @vue-ignore */ TailwindClassProp
>(), {
	border: true
})

// always set a type, name and whether prop is required otherwise set a default value
const modelValue = defineModel<boolean>("modelValue", { default: false })
// for simple elements that take input, use usePreHydrationValue so users can start inputting before hydration happens
const finalId = useFallbackId(props)
usePreHydrationValue(finalId, modelValue)
</script>
```

## Documenting Components

Docs are wired up so you can write a markdown file beside the component file. It should look like this, nothing else, it auto-docs props, etc.

Note the casing of the title and path, very important one is PascalCase and the other is kebab-case.
```md [src/runtime/components/WSomeComponent/WSomeComponent.md]
---
title: 'WSomeComponent'
path: '/components/w-some-component'
---

::storybook-embed
::

::component-docs 
::
```

## Stories

Stories go in `src/runtime/components/SomeComponent/SomeComponent.stories.ts`
### Required Pattern

Every Storybook story must follow this structure:
```ts
/* eslint-disable @typescript-eslint/naming-convention */
import type { Meta, StoryObj } from "@storybook/vue3"

// do not import the component UNLESS it's a private internal component
import * as components from "../index.js"

// if user requested extra args, add them here
type ExtraTestArgs = {
	_slots?: string // if component has slots
	_myTestArg?: string
}

// otherwise do this
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
type ExtraTestArgs = { }

const meta: Meta<typeof components.MyComponent> = {
	component: components.MyComponent,
	title: "Components/MyComponent",
	args: {
		// component props here
		...{ _myTestArg: "default" } satisfies ExtraTestArgs as any
	}
}

export default meta

type Story = StoryObj<typeof MyComponent> & { args?: ExtraTestArgs }

export const Primary: Story = {
	render: _args => {
		const args = _args as any as ExtraTestArgs
		return {
			components, // makes all components available in the template
			setup: () => {
				// allows refs to actually be reactive while still taking in story values
				const modelValue = ref(args.modelValue)
				return { args, modelValue }
			},
			template: `
				<MyComponent v-bind="args" v-model="modelValue">
					${args._slots} // if component has slots
				</MyComponent>
			`
		}
	}
}

export const Disabled = {
	// use the Primary template unless asked otherwise
	...Primary,
	args: {
		disabled: true
	}
}

export const WithSlots = {
	...Primary,
	args: {
		_slots: `
			default slot content
			<template #extra>
				<div>specific "extra" slot content</div>
			</template>
		`
	}
}
```

### Rules (with rationale)

1. **File header**: Start with `/* eslint-disable @typescript-eslint/naming-convention */` — story args use camelCase props that conflict with the naming convention rule.

2. **Double import**: Import both the specific component (`import MyComponent from "./MyComponent.vue"`) AND the barrel (`import * as components from "../index.js"`). The component import is for `meta.component`; the barrel import registers all components in the render function so templates can use any project component (WButton, WCheckbox, etc.) without individual imports.

3. **v-model binding**:
   - Use a `ref` wrapper (`const modelValue = ref(args.modelValue)` + `v-model="modelValue"`) when the component internally mutates its model value (WCombobox, WSlider, WDatePicker, WRecorder). This creates a reactive copy that stays in sync with the component's internal state.
   - Use direct `args.modelValue` (`v-model="args.modelValue"`) for simple components that emit `update:modelValue` and you want Storybook controls to stay in sync (WCheckbox, WSimpleInput).

4. **Components registration**: Pass `components` (the barrel import) in the render return. Add specific additions with spread: `components: { ...components, IconName }`. This is usually not needed for any of the built-in components, only icons for examples.

5. **No `.value` in templates**: Refs are auto-unwrapped in Vue templates — never use `.value`.

6. **Play functions**: For interactive tests, create and import from `./storyPlays.js`. Play functions receive the rendered args and DOM context.

7. **reactive() for nested mutations**: When templates need to mutate nested args properties (`args.resizable.enabled = !args.resizable.enabled`), wrap in `reactive({ ...args, ...overrides })`. Plain spread copies are not deeply reactive.

8. **JSDoc on stories**: Use `/** ... */` comments above export statements to describe what the story demonstrates.
