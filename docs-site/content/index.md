---
seo:
  title: "@witchcraft/ui"
  description: "Opinionated, batteries-included Vue/Nuxt component library built on Reka UI with Tailwind CSS."
---

::u-page-hero{class="dark:bg-gradient-to-b from-neutral-900 to-neutral-950"}
---
orientation: horizontal
---
#top
:hero-background

#title
@witchcraft/ui 🪄

#description
Opinionated, batteries-included, [Vue](https://vuejs.org){.text-highlighted.hover:underline}/[Nuxt](https://nuxt.com/){.text-highlighted.hover:underline} component library built on [Reka UI](https://reka-ui.com/){.text-highlighted.hover:underline} with [Tailwind CSS](https://tailwindcss.com/){.text-highlighted.hover:underline}. Accessibility-first, themable via [metamorphosis](https://github.com/alanscodelog/metamorphosis){.text-highlighted.hover:underline}.

#links
  :::u-button
  ---
  to: /getting-started
  size: xl
  trailing-icon: i-lucide-arrow-right
  ---
  Get started
  :::

  :::u-button
  ---
  icon: i-simple-icons-github
  color: neutral
  variant: outline
  size: xl
  to: https://github.com/witchcraftjs/ui
  target: _blank
  ---
  GitHub
  :::

#default
  :::prose-pre
  ---
  code: |
    export default defineNuxtConfig({
      modules: ['@witchcraft/ui']
    })
  filename: nuxt.config.ts
  ---

  ```ts [nuxt.config.ts]
  export default defineNuxtConfig({
    modules: ['@witchcraft/ui']
  })
  ```
  :::
::

::u-page-section{class="dark:bg-neutral-950"}
#title
Features

#features
  :::u-page-feature
  ---
  icon: i-lucide-shield-check
  ---
  #title
  Accessibility First

  #description
  Proper ARIA attributes, keyboard navigation, and screen reader support built in from the ground up.
  :::

  :::u-page-feature
  ---
  icon: i-lucide-palette
  ---
  #title
  Themable via Metamorphosis

  #description
  Metamorphosis provides a way to customize the theme at runtime.
  :::

  :::u-page-feature
  ---
  icon: i-lucide-minimize
  ---
  #title
  Unstyle Option

  #description
  Simple components have an unstyle option for minimal styling when you need it.
  :::
::

