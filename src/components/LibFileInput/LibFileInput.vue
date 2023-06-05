<template>
	<div class="file-input
			relative flex w-full flex-col items-center
			justify-center
			gap-2
			rounded-xl
			border-2
			border-dashed
			border-accent-500/80
			p-2
		"
		@input="(inputFile as any)"
	>
		<div class="input-wrapper
			flex flex-col items-center justify-center gap-2
		"
		>
			<div v-if="multiple || files.length === 0" class="no-files">
				<fa icon="solid arrow-up-from-bracket"/>
			</div>
			<label :for="id" class="pointer-events-none flex flex-col items-center whitespace-nowrap">
				<slot name="label">Drag & Drop File{{ multiple ? 's' :'' }}</slot>
			</label>
			<label class="flex flex-col items-center text-sm">
				<slot name="formats">Accepted Formats: </slot>
				<div class="">
					{{ formats.join(", ") }}
				</div>
			</label>
			<input
				:id="id"
				class="
					absolute
					inset-0
					z-0
					cursor-pointer
					opacity-0
				"
				type="file"
				:accept="formats.join(', ')"
				:multiple="multiple"
				ref="el"
				@input="(inputFile as any)"
			>
		</div>
		<div v-if="files.length > 0"
			:class="twMerge(`previews
			flex items-stretch justify-center gap-2 flex-wrap
			`,
				multiple && `
				w-full
			`)"
		>
			<div class="preview
				z-1
				relative
				flex-initial
				flex-col
				items-center
				justify-center
				gap-2
				rounded
				border border-neutral-400 px-2 shadow-sm shadow-neutral-800/20
			"
				v-for="entry of files"
				:key="entry.file.name"
			>
				<lib-button class="p-0"
					:border="false"
					:aria-label="`Remove file ${entry.file.name}`"
					@click="removeFile(entry)"
				>
					<fa icon="solid times"/>
				</lib-button>
				<div v-if="entry.isImg"
					class="image
					bg-transparency-squares flex h-[80px] flex-wrap items-center
					justify-center
				"
				>
					<img class="max-h-full w-auto" :src="getSrc(entry.file)">
				</div>
				<div v-if="!entry.isImg"
					class="no-image
						flex h-[80px] flex-wrap items-center justify-center
					"
				>
					<fa icon="regular file" class="text-4xl opacity-50"/>
				</div>
				<div class="filename rounded p-1 text-sm">{{ entry.file.name }}</div>
			</div>
		</div>
	</div>
</template>
<script lang="ts">
 
export default { name: "lib-file-input" }
</script>
<script setup  lang="ts">
/* eslint-disable @typescript-eslint/no-unused-vars */
import { computed, getCurrentInstance, onBeforeUnmount, onMounted, type PropType, reactive, type Ref, ref, watch } from "vue"

import { twMerge } from "../../helpers/twMerge.js"
import Fa from "../fa/Fa.vue"
import LibButton from "../LibButton/LibButton.vue"
import { linkableByIdProps } from "../shared/props.js"


const el = ref<null | HTMLInputElement>(null)
type Entry = { file: File, isImg: boolean }
const files = ref<(Entry)[]>([])

watch(files, () => {
	emits("input", files.value.map(entry => entry.file))
})

 
const emits = defineEmits<{
	(e: "input", val: File[]): void
}>()
/* eslint-enable @typescript-eslint/prefer-function-type */

const props = defineProps({
	...linkableByIdProps(),
	// ...baseInteractiveProps,
	// modelValue: { type: Array as PropType<Entry[]>, required: false },
	multiple: { type: Boolean as PropType<boolean>, required: false, default: false },
	formats: { type: Array as PropType<string[]>, required: false, default: () => [".jpeg", ".png", ".jpg", ".stl"]},
})

const getSrc = (file: File) => {
	const src = URL.createObjectURL(file)
	return src
}

const removeFile = (entry: Entry) => {
	const index = files.value.indexOf(entry)
	files.value.splice(index, 1)
}
const inputFile = async (e: InputEvent): Promise<void> => {
	e.preventDefault()
	const res = []
	if (el.value!.files) {
		for (const file of el.value!.files) {
			const isImg = file.type.startsWith("image")
			res.push({ file, isImg })
		}
	}
	files.value = res
}

</script>

