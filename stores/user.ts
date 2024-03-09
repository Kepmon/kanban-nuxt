export const useUserStore = defineStore('user', () => {
  const userID = ref<null | string>(null)

  return {
    userID
  }
})