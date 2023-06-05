export const removeValue = <T>(val: T, values: T[]): T[] => {
	const copy = [...values]
	copy.splice(copy.indexOf(val), 1)
	return copy
}
