import "./assets/style.css"

import { createApp } from "vue"

import App from "./App.vue"
import { VueComponentsPlugin } from "./main.lib.js"


createApp(App)
	.use(VueComponentsPlugin)
	// add $tw as a global variable for tailwind-merge
	.mount("#app")
