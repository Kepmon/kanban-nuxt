export default defineNuxtRouteMiddleware(async (to, from) => {
  if (process.client && to.path === '/dashboard' && from.path !== to.path) {
    const popupStore = usePopupStore()
    popupStore.isPopupShown = true
    popupStore.shouldPopupBeFocused = true

    setTimeout(() => {
      popupStore.isPopupShown = false
      popupStore.shouldPopupBeFocused = false
    }, popupStore.durationOfPopupShowing)
  }

  const userResponse = await $fetch('/api/navigate')

  if (to.path === '/dashboard' && userResponse == null) {
    return navigateTo('/')
  }

  if ((to.path === '/' || to.path === '/sign-up') && userResponse != null) {
    return navigateTo('/dashboard')
  }
})
