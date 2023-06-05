export const addValue = <T>(value: T, values: T[], preventDuplicateValues: boolean): T[] => {
	if (!(preventDuplicateValues && values?.includes(value))) {
		return [...values, value]
	}
	return values
}
