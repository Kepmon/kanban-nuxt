<template>
  <div class="grid gap-2 relative">
    <label class="text-xs" :for="name">{{ label }}</label>

    <Field
      v-on="
        name === 'password'
          ? { input: (e: InputEvent) => updatePassword(e) }
          : {}
      "
      :id="name"
      :type="type"
      :name="name"
      class="input mb-[var(--space-for-error-msg)]"
      :class="{
        'border-red-400': errorMessage,
        'border-blue-40 focus-visible:border-purple-400': !errorMessage
      }"
    />
    <ErrorMessage
      :name="name"
      class="absolute -bottom-[var(--space-for-error-msg)] font-normal text-xs text-red-400"
    />
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from '~/stores/user'

const props = defineProps<{
  label: string
  name: string
  type: HTMLInputElement['type']
}>()

const userStore = useUserStore()
const name = toRef(props, 'name')
const { errorMessage } = useField(name)

const updatePassword = (e: InputEvent) => {
  userStore.passwordToDeleteAccount = (e.target as HTMLInputElement).value
}
</script>
