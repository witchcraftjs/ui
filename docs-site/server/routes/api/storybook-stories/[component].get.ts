import { jsonSafeParse } from "@alanscodelog/utils/jsonSafeParse"
import { readFile } from "node:fs/promises"
import { dirname, join } from "node:path"
import { fileURLToPath } from "node:url"


// eslint-disable-next-line @typescript-eslint/naming-convention
const __dirname = dirname(fileURLToPath(import.meta.url))
const indexPath = join(__dirname, "../../../../../../docs-storybook/index.json")

export default eventHandler(async event => {
	const component = (getRouterParams(event).component ?? "").replace(/\.json$/, "")
	if (!component) {
		return sendError(event, createError({ statusCode: 400, statusMessage: "Missing component parameter" }))
	}
	let data: { entries: Record<string, StoryEntry> } | undefined = undefined
	if (import.meta.dev) {
		data = await fetch(`http://127.0.0.1:6006/index.json`).then(r => r.json())
			.catch(e => {
				// eslint-disable-next-line no-console
				console.log("Failed to fetch storybook index", e)
				return undefined
			})
	}

	if (!import.meta.dev || !data) {
		const content = await readFile(indexPath, "utf8").catch(e => {
			// eslint-disable-next-line no-console
			console.log("Failed to read storybook index", e)
			return undefined
		})
		if (typeof content !== "string") return sendError(event, createError({ statusCode: 500, statusMessage: "Could not find storybook index, did you build storybook?" }))

		const res =	jsonSafeParse<{ entries: Record<string, StoryEntry> }>(content)
		if (res.isError) {
			return sendError(event, createError({ statusCode: 500, statusMessage: "Failed to parse storybook index", cause: res.error }))
		}
		data = res.value
	}


	const stories = Object.values(data.entries)
		.filter(s => s && s.type === "story" && s.id && s.id.startsWith(`${component}--`))
		.map(s => ({ id: s.id, name: s.name, title: s.title }))
		.sort((a, b) => a.name.localeCompare(b.name))

	return { stories, component }
})

interface StoryEntry {
	id: string
	name: string
	title: string
	type: string
}
