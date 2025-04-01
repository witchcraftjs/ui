<template>
<WRoot :test-wrapper-mode="true" class="min-h-dvh" :is-client-side="isClientSide">
	<WButton>Hello</WButton>
	<WCheckbox/>
	<WCheckbox :model-value="true"/>
	<a href="">Link</a>
	<div class="test">Test</div>
	<div class="test2">Test</div>
	<div class="bg-transparency-squares">Test</div>
	<WColorPicker/>
</WRoot>
</template>

<script lang="ts" setup>
const isClientSide = import.meta.client

</script>
