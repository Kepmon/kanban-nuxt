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

  if (process.server) {
    const userResponse = await useFetch('/api/userID')

    if (to.path === '/dashboard' && userResponse == null) {
      return from.path === to.path
        ? navigateTo('/')
        : navigateTo(navigateToObj('/'), {
            redirectCode: 307
          })
    }

    if ((to.path === '/' || to.path === '/sign-up') && userResponse != null) {
      if (from.path === to.path) return navigateTo('/dashboard')

      return navigateTo(navigateToObj('/dashboard'), {
        redirectCode: 307
      })
    }
  }
})
