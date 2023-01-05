import { defineNuxtModule } from "@nuxt/kit"
import { fileURLToPath } from "url"


export default defineNuxtModule({
	hooks: {
		"components:dirs"(dirs) {
			dirs.push({
				// @ts-ignore
				path: fileURLToPath(new URL("./src/components/", import.meta.url)),
				prefix: "",
			})
		},
	},
})
