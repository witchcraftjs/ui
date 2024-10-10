import { pushIfNotIn } from "@alanscodelog/utils/pushIfNotIn.js"


export const addValue = <T>(value: T, values: T[], preventDuplicateValues: boolean): T[] => {
	if (preventDuplicateValues) {
		return pushIfNotIn(values, [value])
	}
	values.push(value)
	return values
}
