import { library } from "@fortawesome/fontawesome-svg-core"
import { far } from "@fortawesome/free-regular-svg-icons"
import { fas } from "@fortawesome/free-solid-svg-icons"
import { createApp } from "vue"

import App from "./App.vue"
import { MyLibPlugin } from "./main.lib.js"


library.add(fas, far)
createApp(App)
	.use(MyLibPlugin)
	.mount("#app")

