export default defineNuxtRouteMiddleware(async (to) => {
  const navigateToObj = (path: '/' | '/dashboard') => ({
    path,
    query: {
      authenticated: path === '/' ? 'false' : 'true'
    }
  })

  if (process.server) {
    const { data: userResponse } = await useFetch('/api/userID')

    if (to.path === '/dashboard' && userResponse.value == null) {
      return navigateTo(navigateToObj('/'), {
        redirectCode: 307
      })
    }

    if (
      (to.path === '/' || to.path === '/sign-up') &&
      userResponse.value != null
    ) {
      return navigateTo(navigateToObj('/dashboard'), {
        redirectCode: 307
      })
    }
  }
})
