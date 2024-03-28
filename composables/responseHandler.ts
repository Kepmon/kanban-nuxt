import type { Routes } from '../types/routePaths'

export const handleResponse = (
  response: boolean,
  currentPath?: Routes,
  loading?: Ref<boolean>
) => {
  if (response && currentPath != null) {
    const pathToGo = {
      '/sign-up': '/',
      '/': '/dashboard',
      '/dashboard': '/'
    }

    setTimeout(async () => {
      await navigateTo(pathToGo[currentPath])
    }, 0)
  }

  setTimeout(() => {
    if (loading != null) {
      loading.value = false
    }
  }, 3000)
}
