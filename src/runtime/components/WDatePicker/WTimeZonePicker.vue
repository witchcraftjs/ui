<script setup lang="ts">
import { getLocalTimeZone } from "@internationalized/date"

import { getTimeZoneList } from "../../helpers/getTimeZoneList.js"

const timeZone = defineModel<string>({ default: getLocalTimeZone() })
const label = defineModel<string>("label", { default: "Time Zone" })
</script>

<template>
<WCombobox
	:restrict-to-suggestions="true"
	:suggestions="getTimeZoneList()"
	:ignore-filter="true"
	class="w-full"
	type="text"
	:placeholder="label"
	:aria-label="label"
	v-model="timeZone"
/>
</template>
