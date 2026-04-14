export function truncate(val: number, precision: number): string {
	const str = val.toFixed(precision)
	const float = Number.parseFloat(str) // removes trailing zeros
	return float.toString()
}
