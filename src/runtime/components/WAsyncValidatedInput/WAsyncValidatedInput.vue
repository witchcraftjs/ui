<template>
<div
	class="async-validated-input-wrapper w-full flex flex-col gap-2"
>
	<div
		class="
		async-validated-input--inner-wrapper
		relative
		flex
	"
	>
		<WSimpleInput
			:id="finalId"
			:aria-busy="status === 'loading'"
			:aria-describedby="`${finalId}-error`"
			:class="twMerge(`
				async-validated-input--simple-input
				w-0
				pr-[calc(1rem+var(--spacing)*2)]
			`, ($attrs as any)?.class)"
			:valid="inputValid"
			:aria-invalid="!inputValid"
			v-model="value"
			v-bind="{ ...$attrs, class: undefined }"
		/>
		<div
			class="
				async-validated-input--icons
				absolute
				top-0
				bottom-0
				pr-1
				right-0
			"
			aria-live="polite"
		>
			<WIcon
				class="
					async-validated-input--icon
					w-[1rem]
					pointer-events-none
					mt-px
				"
			>
				<slot
					v-if="status === 'loading'"
					name="username-icon-loading"
				>
					<IconSpinner class="animate-spin text-neutral-500"/>
					<span class="sr-only">{{ statusText }}</span>
				</slot>
				<slot
					v-else-if="status === 'valid'"
					name="username-icon-valid"
				>
					<IconCheck class="text-green-500 scale-110"/>
					<span class="sr-only">{{ statusText }}</span>
				</slot>
				<slot
					v-else-if="status === 'invalid'"
					name="username-icon-invalid"
				>
					<IconInvalid class="text-red-500"/>
					<span class="sr-only">{{ statusText }}</span>
				</slot>
			</WIcon>
		</div>
	</div>
	<slot
		v-if="errors && errors.length"
		name="error"
		v-bind="{ errors, id: `${finalId}-error` }"
	>
		<ul
			:id="`${finalId}-error`"
			role="alert"
			aria-live="assertive"
			class="
				async-validated-input--errors
				border
				border-red-500
				rounded-md
				p-2
				text-red-500
				bg-red-100
				dark:bg-red-950/50
				whitespace-pre-wrap
				break-all
				list-disc
				list-outside
				pl-6
			"
		>
			<li
				class="async-validated-input--error-text"
				v-for="err in errors"
				:key="err"
			>
				{{ err }}
			</li>
		</ul>
	</slot>
</div>
</template>

<script lang="ts" setup>
import { computed } from "vue"

import IconCheck from "~icons/lucide/check"
import IconSpinner from "~icons/lucide/loader-circle"
import IconInvalid from "~icons/lucide/x"

import { useFallbackId } from "../../composables/useFallbackId.js"
import { useInjectedI18n } from "../../composables/useInjectedI18n.js"
import { twMerge } from "../../utils/twMerge.js"
import WIcon from "../WIcon/WIcon.vue"
import WSimpleInput from "../WSimpleInput/WSimpleInput.vue"

const t = useInjectedI18n()
const props = withDefaults(defineProps<{
	id?: string
	errors: string[]
	status?: string
	statusText?: {
		loading: string
		valid: string
		invalid: string
	}
	canSubmit: boolean
	inputValid: boolean
}>(), {
	statusText: undefined
})
const statusText = computed(() => {
	if (props.statusText) {
		return props.statusText
	}
	return {
		loading: t("async-validated-input.checking"),
		valid: t("async-validated-input.valid"),
		invalid: t("async-validated-input.invalid")
	}
})

const finalId = useFallbackId(props)

const value = defineModel<string>({ required: true })
</script>
