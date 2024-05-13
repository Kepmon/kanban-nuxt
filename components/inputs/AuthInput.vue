<template>
  <div class="grid gap-2 relative">
    <label class="text-xs" :for="name">{{ label }}</label>
    <Field
      @blur="checkForInputError"
      :id="name"
      :type="type"
      :name="name"
      class="input mb-[var(--space-for-error-msg)]"
      :class="{
        'border-red-400': isInputError,
        'border-blue-40 focus-visible:border-purple-400': !isInputError
      }"
      :validateOnInput="true"
    />
    <ErrorMessage
      :name="name"
      class="absolute -bottom-[var(--space-for-error-msg)] font-normal text-xs text-red-400"
    />
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  label: string
  name: string
  type: HTMLInputElement['type']
}>()

const name = toRef(props, 'name')
const isInputError = ref(false)
</script>
