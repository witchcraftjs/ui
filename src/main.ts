import "./assets/style.css"

import { library } from "@fortawesome/fontawesome-svg-core"
import { far } from "@fortawesome/free-regular-svg-icons"
import { fas } from "@fortawesome/free-solid-svg-icons"
import { createApp } from "vue"

import App from "./App.vue"
import { VueComponentsPlugin } from "./main.lib.js"


library.add(fas, far)
createApp(App)
	.use(VueComponentsPlugin)
	// add $tw as a global variable for tailwind-merge
	.mount("#app")
