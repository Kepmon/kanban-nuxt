export const useUserStore = defineStore('user', () => {
  const userID = ref<null | string>(null)
  const passwordToDeleteAccount = ref('')

  return {
    userID,
    passwordToDeleteAccount
  }
})