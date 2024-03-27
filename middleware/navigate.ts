export default defineNuxtRouteMiddleware(async (to, from) => {
  const navigateToObj = (path: '/' | '/dashboard') => ({
    path,
    query: {
      authenticated: path === '/' ? 'false' : 'true'
    }
  })

  const pathChangesForPopup = [
    to.path === '/dashboard' && from.path === '/',
    to.path === '/' && from.path === '/dashboard',
    to.path === '/' && from.path === '/sign-up'
  ]

  if (process.client && pathChangesForPopup.some((pathChange) => pathChange)) {
    const popupStore = usePopupStore()
    popupStore.showPopup()
  }

  const userResponse = await $fetch('/api/userID')

  if (to.path === '/dashboard' && userResponse == null) {
    return navigateTo(navigateToObj('/'), {
      redirectCode: 307
    })
  }

  if ((to.path === '/' || to.path === '/sign-up') && userResponse != null) {
    return navigateTo(navigateToObj('/dashboard'), {
      redirectCode: 307
    })
  }
})
