<script setup lang="ts">
import { getLocalTimeZone } from "@internationalized/date"

import { getTimeZoneList } from "../../helpers/getTimeZoneList.js"
import LibInput from "../LibInput/LibInput.vue"
const timeZone = defineModel<string>({ default: getLocalTimeZone() })
const label = defineModel<string>("label", { default: "Time Zone" })
</script>
<template>
<LibInput
	:restrict-to-suggestions="true"
	:suggestions="getTimeZoneList()"
	:suggestions-filter="(_, items) => items"
	class="w-full"
	type="text"
	v-model="timeZone"
>
	<template #label>
		<slot>
			<span class="text-sm">
				{{ label }}
			</span>
		</slot>
	</template>
</LibInput>
</template>

