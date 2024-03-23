<template>
  <div>
    <p>Dashboard</p>
    <button @click="logout">Log Out</button>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: ['navigate']
})

useDark()
const popupStore = usePopupStore()

const logout = async () => {
  const response = await $fetch('/api/auth')

  if (response) {
    popupStore.popupMessage = 'Success: You logged out successfully'
  } else {
    popupStore.popupMessage =
      'Error: Ooops, something went wrong. Try again later.'
  }

  popupStore.isPopupShown = true

  setTimeout(() => {
    popupStore.isPopupShown = false
  }, popupStore.durationOfPopupShowing)

  if (response) navigateTo('/')
}
</script>
