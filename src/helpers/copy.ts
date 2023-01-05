/* eslint-disable no-console */
export const copy = (text: string): void => {
	if (navigator.clipboard) {
		navigator.clipboard.writeText(text).catch(err => {
			console.warn(`There was an error copying to the clipboard, please file a bug report.\n${err}`)
		})
	} else {
		console.warn("Could not copy to clipboard, your browser is not supported.")
	}
}
