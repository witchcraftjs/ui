export function getTimeZoneList(): string[] {
	return Intl.supportedValuesOf("timeZone")
}
