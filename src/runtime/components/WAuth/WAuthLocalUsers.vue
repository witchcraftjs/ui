<template>
<div
	:class="twMerge(
		`
			auth-local-users--container
			extra-always-show
			flex
			flex-col
			gap-2
			items-stretch
		`,
		($attrs as any)?.class
	)"
>
	<WButton
		:class="twMerge(
			`
			auth-local-users--create
		`,
			providerButtonsSlotProps?.class
		)"
		@click="onWantToCreateLocalUser"
	>
		<WIcon
			v-if="!showCreateLocalUser"
			:class="providerButtonsSlotProps?.iconClass"
		>
			<i-mdi-local/>
		</WIcon>
		<div :class="twMerge('flex-1 pr-4 text-left', showCreateLocalUser && 'text-center pr-0')">
			{{ !showCreateLocalUser ? "Create Local User" : "Cancel" }}
		</div>
	</WButton>

	<div
		v-if="showCreateLocalUser"
		class="
		auth-local-users--container
		flex
		flex-col
		gap-2
		w-full
		extra-always-show
	"
	>
		<label

			class="
			auth-local-users--label
			flex
			flex-col
			gap-1
			py-2
		"
		>
			<span class="text-sm">{{ t('auth.local.username') }}</span>
			<WSimpleInput
				:id="finalId"
				class="auth-local-users--input"
				:aria-describedby="`${finalId}-errors`"
				:aria-invalid="!valid && username.length > 0"
				:valid="valid || username.length === 0"
				v-model="username"
			/>
		</label>
		<slot
			v-if="errors.length > 0 && debouncedUsername !== ''"
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
					:key="err.message"
				>
					{{ err.message }}
				</li>
			</ul>
		</slot>
		<WButton
			type="button"
			:class="(providerButtonsSlotProps?.class ?? '') + '  [&_label]:pr-[calc(var(--text-xl)+var(--spacing)*2)] '"
			:disabled="errors.length > 0"
			:label="t('auth.local.create-and-switch')"
			:aria-label="t('auth.local.create-and-switch')"
			@click="createLocalUser"
		>
			<template #icon>
				<WIcon :class="providerButtonsSlotProps?.iconClass">
					<i-ph-user-plus-duotone/>
				</WIcon>
			</template>
		</WButton>
	</div>
	<div
		v-if="existingLocalUsers.length > 0 && !showCreateLocalUser"
		class="flex flex-col gap-2 w-full"
	>
		<label
			class="flex flex-col gap-1 items-stretch"
			for="selectLocalUser"
		>
			<span class="text-sm">{{ t('auth.local.select-user') }}</span>

			<div class="flex gap-2 items-center w-full">
				<WCombobox
					:suggestions="existingLocalUsers"
					:class="`
					flex-1
					[&_button]:p-2
					[&_label]:text-left
					[&_label]:px-2
					[&_label]:gap-4
				`"
					:content-props="{ class: `[&_.combobox--suggestion]:justify-start` }"
					:display-entry="(u:AuthLocalUser) => u.username"
					:ignore-filter="true"
					:restrict-to-suggestions="true"
					v-model="selectedUser"
				>
					<template #suggestion-icon>
						<WIcon :class="providerButtonsSlotProps?.iconClass">
							<i-ph-user-duotone/>
						</WIcon>
					</template>
				</WCombobox>
				<WButton
					:disabled="!selectedUser"
					:class="` rounded-full after:rounded-full aspect-square h-full w-auto p-2`"
					:aria-label="t('auth.local.aria.sign-in')"
					@click="login"
				>
					<WIcon :class="providerButtonsSlotProps?.iconClass">
						<i-ic-round-login/>
					</WIcon>
				</WButton>
				<WButton
					:disabled="!selectedUser"
					:border="false"
					:class="`h-full w-auto p-1`"
					:aria-label="`Remove Selected Local User`"
					type="button"
					@click="remove"
				>
					<WIcon :class="providerButtonsSlotProps?.iconClass">
						<i-radix-icons-trash/>
					</WIcon>
				</WButton>
			</div>
		</label>
		<div
			v-if="loadingMessage"
			class="flex justify-center items-center"
		>
			{{ loadingMessage }}
		</div>
		{{ t("auth.local.username-taken") }}
	</div>
</div>
</template>

<script setup lang="ts">
import { unreachable } from "@alanscodelog/utils/unreachable"
import type { StandardSchemaV1 } from "@standard-schema/spec"
import { computedAsync, watchDebounced } from "@vueuse/core"
import { computed, nextTick, ref, watch } from "vue"
import { z } from "zod"

import { useFallbackId } from "../../composables/useFallbackId.js"
import { useInjectedI18n } from "../../composables/useInjectedI18n.js"
import { useNotificationHandler } from "../../composables/useNotificationHandler.js"
import type { AuthLocalUser } from "../../types/index.js"
import { twMerge } from "../../utils/twMerge.js"
import WButton from "../WButton/WButton.vue"
import WCombobox from "../WCombobox/WCombobox.vue"
import WIcon from "../WIcon/WIcon.vue"
import WSimpleInput from "../WSimpleInput/WSimpleInput.vue"

defineOptions({
	name: "WAuthLocalUsers",
	inheritAttrs: false
})


const emit = defineEmits<{
	(e: "create", username: string): void | Promise<void>
	(e: "login", user: AuthLocalUser): void | Promise<void>
	(e: "remove", user: AuthLocalUser): void | Promise<void>
	(e: "hide"): void
}>()


const props = withDefaults(
	defineProps<{
		id?: string
		/** List of existing local users. */
		users: AuthLocalUser[]
		/** Optional slot props forwarded from Auth component (which passes some classes). */
		providerButtonsSlotProps?: {
			class: string
			iconClass: string
		}
		/**
		 * Optional confirmation before showing the create form.
		 * Return `false` to cancel.
		 */
		onBeforeCreate?: () => boolean | Promise<boolean>
		/**
		 * Username validation schema.
		 *
		 * @default is the zod schema from @witchcraft/zod-auth (minLength 3, maxLength 32, regex /^[\w.]+$/)
		 */
		usernameSchema?: StandardSchemaV1<string>
	}>(),
	{
		onBeforeCreate: () => true,
		providerButtonsSlotProps: () => ({ class: "", iconClass: "" }),
		usernameSchema: () => {
			// copied from nuxt-auth so we don't have to weirdly depend on it
			// keep in sync
			return z.string()
				.min(3)
				.max(32)
				.regex(/^[\w.]+$/, "Username can only contain letters, numbers, underscores, and periods.")
		}
	}
)


const finalId = useFallbackId(props)
const username = defineModel<string>("username", { required: false, default: "" })
const debouncedUsername = ref("")
watchDebounced(username, val => {
	debouncedUsername.value = val
}, { debounce: 700 })
const showCreateLocalUser = ref(false)
const selectedUser = ref<AuthLocalUser | undefined>()

/** Exposed only so you can reset it if the login fails. */
const loadingMessage = defineModel<string>("loadingMessage", { required: false, default: "" })


const existingUsernames = computed(() => {
	return Object.values(props.users).map(u => u.username).find(v => v === username.value)
})
const existingLocalUsers = computed(() => {
	return Object.values(props.users).filter(u => u.isLocal)
})
const validation = computedAsync<StandardSchemaV1.Result<string> | Record<string, never>>(
	async () => {
		return await props.usernameSchema["~standard"].validate(debouncedUsername.value)
	},
	{}
)

const t = useInjectedI18n()
const errors = computed(() => {
	return [
		...("issues" in validation.value && validation.value.issues ? validation.value.issues : []),
		...(existingUsernames.value ? [{ path: "", message: t("auth.local.username-taken") }] : [])
	]
})

const valid = computed(() => {
	return debouncedUsername.value === "" || errors.value.length === 0
})

const hideNonLocalUserProviders = defineModel<boolean>("hideNonLocalUserProviders", { required: false, default: false })

watch(showCreateLocalUser, () => {
	hideNonLocalUserProviders.value = showCreateLocalUser.value
})

async function onWantToCreateLocalUser() {
	if (showCreateLocalUser.value) {
		showCreateLocalUser.value = false
		return
	}
	if (props.onBeforeCreate) {
		const proceed = await props.onBeforeCreate()
		if (!proceed) return
	}
	showCreateLocalUser.value = true
	nextTick(() => {
		const usernameInputEl = document.getElementById("usernameInput")
		usernameInputEl?.scrollIntoView()
		usernameInputEl?.focus()
	})
}

async function createLocalUser() {
	if (errors.value.length > 0) return
	// we redo validation because it's async, there might be a small gap where user can create an invalid user if the validation happens to be async (not recommended)
	// error will eventually be shown
	const res = await props.usernameSchema["~standard"].validate(username.value)
	if ("issues" in res && res.issues && res.issues.length > 0) return
	emit("create", (res as StandardSchemaV1.SuccessResult<string>).value)
}
async function login() {
	const user = Object.values(props.users).find(u => u.id === selectedUser.value?.id)
	if (!user || !selectedUser.value) unreachable()
	loadingMessage.value = t("auth.local.switching-user")
	emit("login", { ...user })
}
async function remove() {
	const user = Object.values(props.users).find(u => u.id === selectedUser.value?.id)
	if (!user) unreachable()
	const res = await useNotificationHandler().notify({
		cancellable: true,
		requiresAction: true,
		title: t("auth.local.remove-notification.title"),
		message: t("auth.local.remove-notification.message"),
		default: t("cancel"),
		dangerous: [t("auth.local.remove-notification.button")],
		options: [t("auth.local.remove-notification.button"), t("cancel")]
	})
	loadingMessage.value = t("auth.local.removing-user")
	if (res === "Cancel") return
	emit("remove", { ...user })
}
</script>
