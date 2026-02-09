<template>
<!-- todo aria errors -->
<div
	:class="twMerge(`
		file-input
		justify-center
		border-2
		border-dashed
		border-accent-500/80
		focus-outline-within
		transition-[border-color,box-shadow]
		ease-out
		hover:bg-accent-500/10
		outlined-focus-within
	`,
		compact && `rounded-sm`,
		!compact && `
			flex
			w-full
			flex-col
			items-stretch
			gap-2
			rounded-xl
			p-2
		`,
		errors.length > 0 && errorFlashing && `border-danger-400`,
		isHovered && `bg-accent-500/10`,
		($.wrapperAttrs as any).class
	)"
	v-bind="{ ...$.wrapperAttrs, class: undefined }"
	@drop="onDrop"
	@dragover.prevent="isHovered = true"
	@dragleave="isHovered = false"
>
	<div
		:class="twMerge(`
			file-input--wrapper
			relative
			justify-center
			@container
		`,
			compact && `flex gap-2`,
			!compact && `
				file-input
				flex
				flex-col
				items-center
			`
		)"
	>
		<label
			:for="id ?? fallbackId"
			:class="twMerge(`
				file-input--label
				pointer-events-none
				flex
				gap-1
				items-center
				justify-center
				whitespace-nowrap
				max-w-full
			`)"
		>
			<slot
				v-if="compact || multiple || files.length === 0"
				name="icon"
			>
				<icon><i-fa6-solid-arrow-up-from-bracket/></icon>
			</slot>
			<slot name="label">
				<div class="text-ellipsis overflow-hidden shrink-1 hidden @min-[15ch]:block">
					{{
						(compact
							? multiple
								? t("file-input.compact-choose-file-plural")
								: t("file-input.compact-choose-file")
							: multiple
								? t("file-input.non-compact-choose-file-plural")
								: t("file-input.non-compact-choose-file")
						)
					}}
				</div>
			</slot>
			<div
				v-if="compact && multiple"
				class="file-input--label-count"
			>
				{{ ` (${files.length})` }}
			</div>
			<div
				v-if="compact && !multiple && files.length > 0"
				class="file-input--label-name text-ellipsis overflow-hidden shrink-9999 hidden @3xs:block"
			>
				{{ ` (${files[0]?.file.name})` }}
			</div>
			<div
				v-if="compact && !multiple && files.length > 0"
				class="file-input--label-name text-ellipsis overflow-hidden shrink-9999 @3xs:hidden"
			>
				{{ ` (...)` }}
			</div>
		</label>
		<label
			v-if="!compact && formats?.length > 0"
			class="file-input--formats-label flex-col items-center text-sm max-w-full hidden @min-[15ch]:flex"
		>
			<slot name="formats"><div class="text-ellipsis overflow-hidden max-w-full">{{ t("file-input.accepted-formats") }}:</div> </slot>
			<div class="file-input--formats-list overflow-hidden text-ellipsis max-w-full">
				{{ extensions.join(", ") }}
			</div>
		</label>
		<input
			:id="id ?? fallbackId"
			:class="twMerge(`
				file-input--input
				absolute
				inset-[calc(var(--spacing)*-2)]
				cursor-pointer
				z-0
				text-[0]
				opacity-0
			`,
				($.inputAttrs as any)?.class
			)"
			type="file"
			:accept="formats.join(', ')"
			:multiple="multiple"
			ref="el"
			v-bind="{ ...$.inputAttrs, class: undefined }"
			@input="(inputFile as any)"
			@click="($event.target! as any).value = null"
		>
		<!--  click event allows event to fire even if the user picks the same file -->
	</div>
	<div
		v-if="!compact && files.length > 0"
		:class="twMerge(`file-input--previews
			flex items-stretch justify-center gap-4 flex-wrap
			`,
			multiple && `
				w-full
			`,
			($.previewsAttrs as any)?.class
		)"
	>
		<div
			class="
				file-input--preview-wrapper
				z-1
				relative
				flex
				min-w-0
				max-w-[150px]
				flex-initial
				flex-col
				items-center
				gap-1
				p-1
				rounded-sm
				border
				border-neutral-300
				dark:border-neutral-800
				shadow-md
				shadow-neutral-800/30
				bg-neutral-100
				dark:bg-neutral-900
				[&:hover_.file-input--remove-button]:opacity-100
			"
			v-for="entry of files"
			:key="entry.file.name"
		>
			<div class="flex flex-initial basis-full justify-start items-center max-w-full gap-2 px-1">
				<lib-button
					:border="false"
					class="file-input--remove-button rounded-full p-0"
					:aria-label="`Remove file ${entry.file.name}`"
					@click="removeFile(entry)"
				>
					<icon><i-fa6-solid-xmark/></icon>
				</lib-button>
				<div
					class="file-input--preview-filename min-w-0 flex-1 basis-0 truncate break-all rounded-sm text-sm"
					:title="entry.file.name"
				>
					{{ entry.file.name }}
				</div>
			</div>

			<div class="file-input--preview flex flex-initial basis-full justify-center">
				<div
					v-if="entry.isImg"
					class="file-input--preview-image
					bg-transparency-squares flex
					h-[80px]   flex-wrap items-center
					justify-center
				"
				>
					<img
						class="max-h-full w-auto"
						:src="getSrc(entry.file)"
					>
				</div>
				<div
					v-if="!entry.isImg"
					class="file-input--preview-no-image
					flex h-[80px]
					flex-1 basis-full flex-wrap items-center justify-center
					"
				>
					<icon><i-fa6-regular-file class="text-4xl opacity-50"/></icon>
				</div>
			</div>
		</div>
	</div>
</div>
</template>

<script setup lang="ts">
import { computed, type HTMLAttributes, type InputHTMLAttributes, ref, shallowReactive, watch } from "vue"

import IFa6RegularFile from "~icons/fa6-regular/file"
import IFa6SolidArrowUpFromBracket from "~icons/fa6-solid/arrow-up-from-bracket"
import IFa6SolidXmark from "~icons/fa6-solid/xmark"

import { useDivideAttrs } from "../../composables/useDivideAttrs.js"
import { useInjectedI18n } from "../../composables/useInjectedI18n.js"
import type { FileInputError } from "../../types/index.js"
import { twMerge } from "../../utils/twMerge.js"
import Icon from "../Icon/Icon.vue"
import LibButton from "../LibButton/LibButton.vue"
import { getFallbackId, type LinkableByIdProps, type TailwindClassProp, type WrapperProps } from "../shared/props.js"

const t = useInjectedI18n()
const el = ref<null | HTMLInputElement>(null)
type Entry = { file: File, isImg: boolean }

const files = shallowReactive<(Entry)[]>([])
const errors = shallowReactive<(FileInputError)[]>([])
const errorFlashing = ref(false)
const isHovered = ref(false)


function clearFiles() {
	el.value!.value = ""
	files.splice(0, files.length)
}

watch(files, () => {
	emits("input", files.map(entry => entry.file), clearFiles)
})
watch(errors, () => {
	if (errors.length > 0) {
		errorFlashing.value = true
		setTimeout(() => {
			errorFlashing.value = false
		}, 500)
		emits("errors", [...errors])
		errors.splice(0, errors.length)
	}
})

defineOptions({
	name: "LibFileInput",
	inheritAttrs: false
})
const $ = useDivideAttrs(["wrapper", "input", "previews"] as const)

const emits = defineEmits<{
	(e: "input", val: File[], clearFiles: () => void): void
	(e: "errors", val: FileInputError[]): void
}>()

const fallbackId = getFallbackId()
const props = withDefaults(defineProps<Props>(), {
	multiple: false,
	formats: () => ["image/*", ".jpeg", ".jpg", ".png"],
	compact: false
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

function onDrop(e: DragEvent) {
	if ("dataTransfer" in e && e.dataTransfer && e.dataTransfer.files && e.dataTransfer.files.length > 0) {
		el.value!.files = e.dataTransfer.files
		e.preventDefault()
		isHovered.value = false
		return updateFiles(el.value!.files)
	}
	return undefined
}
async function inputFile(e: InputEvent): Promise<undefined | boolean> {
	e.preventDefault()
	if (el.value!.files) {
		return updateFiles(el.value!.files)
	}
	return undefined
}

function updateFiles(filesList: FileList): boolean | undefined {
	const errs = []
	for (const file of filesList) {
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
	return undefined
}

defineExpose({
	clearFiles
})
</script>

<script lang="ts">
export default { name: "LibFileInput" }

type WrapperTypes
	= & WrapperProps<
		"input",
		// https://github.com/vuejs/core/pull/14237
		Omit<InputHTMLAttributes, "autocomplete">
	>
	& WrapperProps<"wrapper", HTMLAttributes>
	& WrapperProps<"previews", HTMLAttributes>

type RealProps
	= & LinkableByIdProps
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
	Partial<Omit<
		InputHTMLAttributes,
		"class" | "multiple" | "formats" | "compact"
		// https://github.com/vuejs/core/pull/14237
		| "autocomplete"
	> & TailwindClassProp>,
	/** @vue-ignore */
	Partial<WrapperTypes>,
	RealProps { }
</script>
