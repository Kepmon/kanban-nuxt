export const useUserStore = defineStore('user', () => {
  const userID = ref<null | string>(null)
  const deleteAccountError = ref('')

  return {
    userID,
    deleteAccountError
  }
})
