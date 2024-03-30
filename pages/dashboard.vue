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
const route = useRoute()
const router = useRouter()

if (process.client) {
  router.push({
    path: route.path,
    query: {}
  })
}

const logout = async () => {
  const response = await $fetch('/api/auth')

  setTimeout(() => {
    popupStore.isPopupShown = false
    popupStore.popupMessage = ''
  }, popupStore.durationOfPopupShowing)

  if (response) {
    popupStore.popupMessage = 'Success: You logged out successfully'
    navigateTo('/')
  } else {
    popupStore.popupMessage =
      'Error: Ooops, something went wrong. Try again later.'
  }
}

onMounted(() => {
  if (process.client && 'authenticated' in route.query) {
    const popupStore = usePopupStore()
    popupStore.showPopup(
      `Error: Only ${route.query.authenticated === 'true' ? 'unauthenticated' : 'authenticated'} users can reach the requested page`
    )
  }
})
</script>
