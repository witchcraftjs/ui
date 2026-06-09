# Auth UI Components Plan

## Goal

Move the login provider button rendering logic and the local user auth component into `@witchcraft/ui` as generic, decoupled components. `nuxt-auth` keeps its auth-specific types, provider styles, and composables. `pyramid` stops maintaining a custom auth component.

## What Exists Today

1. **`LoginProviderButtons.client.vue`** in `nuxt-auth` renders OAuth provider buttons. It mixes UI rendering (WButton, WIcon, dark mode styles) with auth logic (useAuth, runtime config, providerStyles).

2. **`AuthLocalUserProviderButtons.vue`** in `pyramid/layers/auth/components/` handles local user creation/selection. It depends on pyramid-specific `LocalWebUsersPresetManager`, `UiSearchSelect` (pyramid-specific), `isElectron`, `@regle/rules`, and `LocalWebUsersPresetManager`.

## Architecture

**Two new components in `@witchcraft/ui`:**

### `WLoginProviderButtons`
- Generic provider button renderer — accepts `providers` (string[]), `providerStyles` (Record<string, ProviderStyle>), and `onLogin(provider: string, options)` as props
- `ProviderStyle` type lives in ui: `{ name: string, logo: any, style: { bg: string, text: string, bgDark: string, textDark: string } }` — copied from nuxt-auth as-is for now, dark mode color resolution stays in the component. Restructuring this is deferred.
- Consumers (like `nuxt-auth`) pass their own provider styles and login handler
- The `#extra` slot passes `icon-class` and `class` to slot content (same as current)
- No dependency on `useAuth`, `useRuntimeConfig`, or any auth module

### `WLocalUserProvider`
- Genericized local user management component
- Callback-based API:
  - `users`: computed/ref of existing local users `{ id, username }[]`
  - `onCreateUser(username: string)`: creates a local user
  - `onSignIn(userId: string)`: signs in with a local user
  - `onRemoveUser(userId: string)`: removes a local user
  - `usernameValidation`: `{ schema: ZodSchema, rules: RegleRules }` — keeps @regle/rules
- Replaces `UiSearchSelect` with `WCombobox` (already in ui, same reka-ui Combobox)
- Platform-agnostic — no Electron-specific code; caller handles platform via callbacks
- No `LocalWebUsersPresetManager` dependency — caller manages storage
- Keeps `useNotificationHandler` from ui for confirmation dialogs
- `#extra` slot on parent `WLoginProviderButtons` — this component is designed to be slotted into it via the `providerButtonsSlotProps` pattern

**After moving:**
- `nuxt-auth`'s `LoginProviderButtons.client.vue` is rewritten to use `WLoginProviderButtons` internally, passing its own `providerStyles`, `enabledProviders` from runtime config, and `useAuth().login` as the handler. Same component name, same API — just the rendering is delegated to ui.
- `pyramid` replaces `AuthLocalUserProviderButtons.vue` with `WLocalUserProvider` wrapped in a thin adapter that passes pyramid-specific callbacks.

## Implementation Steps

1. **Create `WLoginProviderButtons`** in `@witchcraft/ui/src/runtime/components/WLoginProviderButtons/`
   - Extract the template + dark mode logic from nuxt-auth's `LoginProviderButtons.client.vue`
   - Props: `providers: string[]`, `providerStyles: Record<string, ProviderStyle>`, `onLogin: (provider: string, options: object) => void`, `loginOptions?: object`
   - Define `ProviderStyle` type in ui types
   - Add `.md` doc, `.stories.ts`

2. **Create `WLocalUserProvider`** in `@witchcraft/ui/src/runtime/components/WLocalUserProvider/`
   - Genericize `AuthLocalUserProviderButtons.vue`
   - Replace `UiSearchSelect` with `WCombobox`
   - Keep `@regle/rules` (peer dep, same as pyramid uses it)
   - Replace Electron branches with callback-based behavior
   - Add `.md` doc, `.stories.ts`

3. **Rewrite `nuxt-auth`'s `LoginProviderButtons.client.vue`**
   - Import `WLoginProviderButtons` from ui
   - Pass `config.enabledProviders`, `providerStyles` (merged with base), and `useAuth().login`
   - Same external API — no breaking change for consumers
   - No thin wrapper component needed, just rewrite the existing one

4. **Update `pyramid`**
   - Replace `AuthLocalUserProviderButtons.vue` with `WLocalUserProvider` + thin adapter
   - Pass pyramid-specific callbacks (`LocalWebUsersPresetManager`, `isElectron` logic)

## Files to Create (in @witchcraft/ui)

- `src/runtime/components/WLoginProviderButtons/WLoginProviderButtons.vue`
- `src/runtime/components/WLoginProviderButtons/WLoginProviderButtons.md`
- `src/runtime/components/WLoginProviderButtons/WLoginProviderButtons.stories.ts`
- `src/runtime/components/WLocalUserProvider/WLocalUserProvider.vue`
- `src/runtime/components/WLocalUserProvider/WLocalUserProvider.md`
- `src/runtime/components/WLocalUserProvider/WLocalUserProvider.stories.ts`
- `src/runtime/types/providerStyle.ts` (or add to existing types index)

## Files to Modify

- `@witchcraft/nuxt-auth/src/runtime/components/LoginProviderButtons.client.vue` — rewrite to use WLoginProviderButtons
- `@witchcraft/nuxt-auth/src/runtime/types.ts` — remove `ProviderStyle`, `FullProviderStyles`, `providerStylesInjectionKey` (moved to ui)
- `pyramid/layers/auth/components/AuthLocalUserProviderButtons.vue` — replace with WLocalUserProvider adapter
- `@witchcraft/ui/src/runtime/components/index.ts` — export new components
- `@witchcraft/ui/src/runtime/composables/index.ts` — if new composables needed

## Risks / Tradeoffs

- `@regle/rules` as a peer dependency of ui means consumers of `WLocalUserProvider` must install it. Pyramid already does. If another consumer doesn't, they'll get a runtime error. Acceptable since it's an optional component.
- `WCombobox` may not be a 1:1 replacement for `UiSearchSelect` — the pyramid component uses a button-triggered dropdown with custom trigger slot. `WCombobox` uses an input-triggered combobox. The local user selector needs to adapt to WCombobox's API (search-as-you-type vs button click).
- `ProviderStyle.logo` is a Vue component (icon from unplugin-icons). Consumers need icon resolution set up — this is already the case since `nuxt-auth` uses it.
