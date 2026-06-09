/* eslint-disable @typescript-eslint/naming-convention */
import { delay } from "@alanscodelog/utils/delay"
import type { Meta, StoryObj } from "@storybook/vue3"

import GithubLogo from "~icons/logos/github-icon"
import GoogleLogo from "~icons/logos/google-icon"

import type { AuthLocalUser, AuthProviderStyle } from "../../types/index.js"
import * as components from "../index.js"

type ExtraTestArgs = {
	_localUsersSlotProps?: any
}


const providerStyles: Record<string, Partial<AuthProviderStyle>> = {
	github: {
		name: "Github",
		logo: GithubLogo

	},
	google: {
		name: "Google",
		logo: GoogleLogo

	}
}
const meta: Meta<typeof components.WAuth> = {
	component: components.WAuth,
	title: "Components/Auth",
	args: {
		providers: ["github", "google"],
		providerStyles,
		onLogin: provider => {
			// eslint-disable-next-line no-console
			console.log("Login:", provider)
		}
	}
}


const sampleUsers: AuthLocalUser[] = [
	{ id: "1", username: "alice", isLocal: true },
	{ id: "2", username: "bob", isLocal: true },
	{ id: "3", username: "charlie", isLocal: true },
	{ id: "4", username: "daniel", isLocal: false }
]

function onCreateUser(username: string) {
	// eslint-disable-next-line no-console
	console.log("Create user:", username)
}

function onLoginUser(userId: string) {
	// eslint-disable-next-line no-console
	console.log("Sign in:", userId)
}

function onRemoveUser(userId: string) {
	// eslint-disable-next-line no-console
	console.log("Remove user:", userId)
}
export default meta
type Story = StoryObj<typeof components.WAuth> & { args?: ExtraTestArgs }

export const Primary: Story = {
	render: _args => {
		const args = _args as any as NonNullable<Story["args"]>
		return {
			components: components as any,
			setup: () => ({ args }),
			template: `
				<div class="w-[300px]">
					<WAuth v-bind="args" @login="args.onLogin" />
				</div>
			`
		}
	}
}

export const WithLocalUsers: Story = {
	render: _args => {
		const args = _args as any as NonNullable<Story["args"]>
		return {
			components: components as any,
			setup: () => ({ args }),
			template: `
				<div class="w-[300px]">
					<WAuth v-bind="{...args}">
						<template #extra="slotProps">
							<WAuthLocalUsers 
								v-bind="{providerButtonsSlotProps: slotProps, ...args._localUsersSlotProps}" 
								:provider-buttons-slot-props="slotProps" 
							/>
							</template>
					</WAuth>
				</div>
			`
		}
	},
	args: {
		_localUsersSlotProps: {
			users: sampleUsers,
			onCreate: onCreateUser,
			onLogin: onLoginUser,
			onRemove: onRemoveUser
		}
	}
}
