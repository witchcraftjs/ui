import { type ComponentResolver } from "unplugin-vue-components"

const prefixless = ["Icon", "Aria"]
// eslint-disable-next-line @typescript-eslint/naming-convention
export const WitchcraftUiResolver = (
	{
		prefix = "W",
		filter = () => true,
	}: {
		prefix?: string
		filter?: (name: string) => boolean
	} = {}
): ComponentResolver => (
	componentName: string,
): { from: string } | undefined => {
	if (componentName.startsWith(prefix)) {
		const n = componentName.slice(1)
		const filename = prefixless.includes(n) ? n : `Lib${n}`
		if (!filter(n)) {
			return undefined
		}
		return {
			from: `@witchcraft/ui/components/${filename}`
		}
	}
	return undefined
}
