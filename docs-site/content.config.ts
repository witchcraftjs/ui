import { defineCollection, defineContentConfig, z } from "@nuxt/content"
import { fileURLToPath } from "node:url"

const srcDir = fileURLToPath(new URL("../src", import.meta.url))

export default defineContentConfig({
	collections: {
		landing: defineCollection({
			type: "page",
			source: "index.md"
		}),
		docs: defineCollection({
			type: "page",
			source: [
				{
					include: "**",
					exclude: ["index.md"]
				},
				{
					cwd: srcDir,
					include: "**/*.md"
				}
			],
			schema: z.object({
				links: z.array(z.object({
					label: z.string(),
					icon: z.string(),
					to: z.string(),
					target: z.string().optional()
				})).optional()
			})
		})
	}
})
