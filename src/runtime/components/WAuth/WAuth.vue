<template>
<div
	:class="twMerge(`
		auth
		flex
		flex-col
		items-stretch
		justify-center
		gap-2
	`, ($attrs as any)?.class)"
>
	<template
		v-for="provider in providers"
		:key="provider"
	>
		<WButton
			v-if="provider"
			type="button"
			:class="twMerge(`
				auth--button
				auth--button-${provider}
				text-l p-2 px-4 [&_.button--label]:gap-3
				`, providerStyles?.[provider]?.class
			)"
			:key="provider"
			@click="emit('login', provider)"
		>
			<WIcon
				v-if="providerStyles?.[provider]?.logo"
				class="text-xl"
			>
				<component
					:is="providerStyles?.[provider]?.logo"
				/>
			</WIcon>
			<div>
				{{ `${t("auth.sign-in-register")} ${providerStyles?.[provider]?.name ?? provider}` }}
			</div>
		</WButton>
	</template>
	<slot
		name="extra"
		icon-class="text-xl"
		class="auth--button auth--button-extra text-l p-2 px-4 [&_.button--label]:gap-3"
	/>
</div>
</template>

<script setup lang="ts">
import { useAttrs } from "vue"

import { useInjectedI18n } from "../../composables/useInjectedI18n.js"
import type { AuthProviderStyle, TailwindClassProp } from "../../types/index.js"
import { twMerge } from "../../utils/twMerge.js"
import WButton from "../WButton/WButton.vue"
import WIcon from "../WIcon/WIcon.vue"

const t = useInjectedI18n()
const $attrs = useAttrs()

defineOptions({
	name: "WAuth",
	inheritAttrs: false
})
const emit = defineEmits<{
	(e: "login", provider: string): void
}>()

withDefaults(defineProps<{
	/** List of provider names to render buttons for. */
	providers: string[]
	providerStyles?: Record<string, Partial<AuthProviderStyle>>
} & /** @vue-ignore */ TailwindClassProp>(), {
	providerStyles: () => ({})
})
</script>
