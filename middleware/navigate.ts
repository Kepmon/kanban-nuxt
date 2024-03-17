export default defineNuxtRouteMiddleware(async (to) => {
  const userResponse = await $fetch('/api/navigate')

  if (to.path === '/dashboard' && userResponse == null) {
    return navigateTo('/')
  }

  if ((to.path === '/' || to.path === '/sign-up') && userResponse != null) {
    return navigateTo('/dashboard')
  }
})
