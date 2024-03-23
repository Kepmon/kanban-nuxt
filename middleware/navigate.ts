const handlePopup = () => {
  const popupStore = usePopupStore()
  popupStore.isPopupShown = true
  popupStore.shouldPopupBeFocused = true

  setTimeout(() => {
    popupStore.isPopupShown = false
    popupStore.shouldPopupBeFocused = false
  }, popupStore.durationOfPopupShowing)
}

export default defineNuxtRouteMiddleware(async (to, from) => {
  const pathChangesForPopup = [
    to.path === '/dashboard' && from.path === '/',
    to.path === '/' && from.path === '/dashboard',
    to.path === '/' && from.path === '/sign-up'
  ]

  if (process.client && pathChangesForPopup.some((pathChange) => pathChange)) {
    handlePopup()
  }

  const userResponse = await $fetch('/api/navigate')

  if (to.path === '/dashboard' && userResponse == null) {
    return navigateTo('/')
  }

  if ((to.path === '/' || to.path === '/sign-up') && userResponse != null) {
    return navigateTo('/dashboard')
  }
})
