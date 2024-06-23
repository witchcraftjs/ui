<template>
<!-- todo aria errors -->
<div :class="twMerge(
		`file-input
		justify-center
		border-2
		border-dashed
		border-accent-500/80
		focus-outline-within
		transition-[border-color,box-shadow]
		ease-out`,
		compact && `rounded`,
		!compact && `flex w-full flex-col items-center gap-2 rounded-xl  p-2 `,
		errors.length > 0 && errorFlashing && `border-red-400`,
		( $.wrapperAttrs as any ).class
	)"
	v-bind="{...$.wrapperAttrs, class:undefined}"
>
	<div :class="twMerge(
		`relative justify-center`,
		compact && `flex gap-2`,
		!compact && `input-wrapper
		flex flex-col items-center
		`
	)"
	>
		<label
			:for="id ?? fallbackId"
			:class="twMerge(
				`pointer-events-none flex gap-1 items-center whitespace-nowrap`
			)"
		>
			<slot v-if="compact || multiple || files.length === 0" name="icon">
				<icon><i-fa6-solid-arrow-up-from-bracket/></icon>
			</slot>
			<slot name="label">
				{{
					(compact ? 'Choose File' : 'Drag & Drop File') +
						(multiple ? 's' :'')
				}}
			</slot>
			<span v-if="compact && multiple">{{ ` (${files.length})` }}</span>
		</label>
		<label v-if="!compact && formats?.length > 0" class="flex flex-col items-center text-sm">
			<slot name="formats">Accepted Formats: </slot>
			<div class="">
				{{ extensions.join(", ") }}
			</div>
		</label>
		<input
			:id="id ?? fallbackId"
			:class="twMerge(
				`absolute inset-0
				z-0
				cursor-pointer
				text-[0]
				opacity-0
				`,
				($.inputAttrs as any)?.class
			)"
			type="file"
			:accept="formats.join(', ')"
			:multiple="multiple"
			ref="el"
			v-bind="{...$.inputAttrs, class:undefined}"
			@input="(inputFile as any)"
			@click="($event.target! as any).value = null"
		>
		<!--  click event allows event to fire even if the user picks the same file -->
	</div>
	<div v-if="!compact && files.length > 0"
		:class="twMerge(`previews
			flex items-stretch justify-center gap-2 flex-wrap
			`,
			multiple && `
				w-full
			`,
			($.previewsAttrs as any)?.class
		)"
	>
		<div class="flex-1"/>
		<div class="preview
				z-1
				relative
				flex
				min-w-0
				max-w-[150px]
				flex-initial
				flex-wrap
				items-center
				gap-2 rounded border border-neutral-400
				shadow-sm
				shadow-neutral-800/20
			"
			v-for="entry of files"
			:key="entry.file.name"
		>
			<div class="flex flex-initial basis-full justify-start">
				<lib-button
					:border="false"
					:aria-label="`Remove file ${entry.file.name}`"
					@click="removeFile(entry)"
				>
					<icon><i-fa6-solid-xmark/></icon>
				</lib-button>
			</div>

			<div class="flex flex-initial basis-full justify-center">
				<div v-if="entry.isImg"
					class="image
					bg-transparency-squares flex
					h-[80px]   flex-wrap items-center
					justify-center
				"
				>
					<img class="max-h-full w-auto" :src="getSrc(entry.file)">
				</div>
				<div v-if="!entry.isImg"
					class="no-image
					flex h-[80px]
					flex-1 basis-full flex-wrap items-center justify-center
					"
				>
					<icon><i-fa6-regular-file class="text-4xl opacity-50"/></icon>
				</div>
			</div>
			<div class="filename min-w-0 flex-1 basis-0 truncate break-all rounded p-1 text-sm" :title="entry.file.name">{{ entry.file.name }}</div>
		</div>

		<div class="flex-1"/>
	</div>
</div>
</template>
<script setup lang="ts">
import { computed, type HTMLAttributes, type InputHTMLAttributes,ref, shallowReactive, watch,withDefaults } from "vue"

import { useDivideAttrs } from "../../composables/useDivideAttrs.js"
import { twMerge } from "../../helpers/twMerge.js"
import { type FileInputError } from "../../types.js"
import LibButton from "../LibButton/LibButton.vue"
import { getFallbackId,type LinkableByIdProps, type TailwindClassProp, type WrapperProps } from "../shared/props.js"


const el = ref<null | HTMLInputElement>(null)
type Entry = { file: File, isImg: boolean }

const files = shallowReactive<(Entry)[]>([])
const errors = shallowReactive<(FileInputError)[]>([])
const errorFlashing = ref(false)

watch(files, () => {
	emits("input", files.map(entry => entry.file))
})
watch(errors, () => {
	if (errors.length > 0) {
		errorFlashing.value = true
		setTimeout(() => {
			errorFlashing.value = false
		}, 500)
		emits("errors", errors)
	}
})

defineOptions({
	name: "lib-file-input",
	inheritAttrs: false,
})
const $ = useDivideAttrs(["wrapper", "input", "previews"] as const)
 
const emits = defineEmits<{
	(e: "input", val: File[]): void
	(e: "errors", val: FileInputError[]): void
}>()

const fallbackId = getFallbackId()
// eslint-disable-next-line no-use-before-define
const props = withDefaults(defineProps<Props>(), {
	multiple: false,
	formats: () => ["image/*", ".jpeg", ".jpg", ".png"],
	compact: false,
})

const mimeTypes = computed(() => props.formats?.filter(_ => !_.startsWith(".")) ?? [])
const extensions = computed(() => props.formats?.filter(_ => _.startsWith(".")) ?? [])

const getSrc = (file: File) => {
	const src = URL.createObjectURL(file)
	return src
}

const removeFile = (entry: Entry) => {
	const index = files.indexOf(entry)
	files.splice(index, 1)
}
const extensionsList = computed(() => extensions.value.join(", "))
const inputFile = async (e: InputEvent): Promise<void | boolean> => {
	e.preventDefault()
	if (el.value!.files) {
		const errs = []
		for (const file of el.value!.files) {
			const isImg = file.type.startsWith("image")

			const byPassValidation = props.formats.length === 0
			const isValidMimeType = mimeTypes.value.find(_ => _.endsWith("/*") ? file.type.startsWith(_.slice(0, -2)) : _ === file.type) !== undefined
			const isValidExtension = extensions.value.find(_ => file.name.endsWith(_)) !== undefined
			if (!byPassValidation && (!isValidMimeType || !isValidExtension)) {
				const extension = file.name.match(/.*(\..*)/)?.[1] ?? "Unknown"
				const type = file.type === "" ? "" : ` (${file.type})`
				const message = `File type ${extension}${type} is not allowed. Allowed file types are: ${extensionsList.value}.`
				const err = new Error(message) as FileInputError
				err.file = file
				err.isValidExtension = isValidExtension
				err.isValidMimeType = isValidMimeType
				errs.push(err)
				continue
			}
			if (errs.length > 0) continue
			if (!files.find(_ => _.file === file)) {
				if ((props.multiple || files.length < 1)
				) {
					files.push({ file, isImg })
				} else {
					files.splice(0, files.length, { file, isImg })
				}
			}
		}
		if (errs.length > 0) {
			errors.splice(0, errors.length, ...errs)
			return false
		} else if (errors.length > 0) {
			errors.splice(0, errors.length)
		}
	}
}

</script>
<script lang="ts">
export default { name: "lib-file-input" }

type WrapperTypes =
	& WrapperProps<"input", InputHTMLAttributes >
	& WrapperProps<"wrapper", HTMLAttributes >
	& WrapperProps<"previews",HTMLAttributes >

type RealProps =
& LinkableByIdProps
& {
	multiple?: boolean
	/**
	 * A list of extensions or mime types to add to the input's accept. Basic validations are done so that files match an extension and mimeType, but note that a file could still be lying, all files should be validated server side.
	 *
	 * Pass an empty array to allow any filetype.
	 */
	formats?: string[]
	compact?: boolean
}

interface Props
	extends
	/** @vue-ignore */
	Partial<Omit<InputHTMLAttributes,"class" | "multiple" | "formats" | "compact"> & TailwindClassProp>,
	/** @vue-ignore */
	Partial<WrapperTypes>,
	RealProps { }
</script>

