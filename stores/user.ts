export const useUserStore = defineStore('user', () => {
  const userID = ref<null | string>(null)
  const passwordToDeleteAccount = ref('')
  const deleteAccountError = ref('')

  return {
    userID,
    passwordToDeleteAccount,
    deleteAccountError
  }
})