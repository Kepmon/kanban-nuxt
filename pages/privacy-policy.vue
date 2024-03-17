<template>
  <div>
    <nuxt-link :to="link.path" class="link"> Go To {{ link.text }} </nuxt-link>
    <privacy-policy-content class="mt-16" />
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from '../stores/user'

useDark()
const userStore = useUserStore()

const link = computed(() => {
  return userStore.userID
    ? {
        path: '/dashboard',
        text: 'Dashboard'
      }
    : {
        path: '/',
        text: 'Login Page'
      }
})
</script>

<style lang="postcss">
.link {
  @apply block px-6 py-3 mx-auto w-max rounded-b-3xl;
  @apply bg-white dark:bg-gray-700 outline outline-transparent;
  @apply bg-purple-400 hover:bg-purple-600 focus-visible:bg-purple-600;
  @apply transition-colors duration-300;
}
</style>
