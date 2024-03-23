export const usePopupStore = defineStore('popup', () => {
  const isPopupShown = ref(false)
  const durationOfPopupShowing = ref(3000)
  const popupMessage = ref('')
  const shouldPopupBeFocused = ref(false)

  return {
    isPopupShown,
    durationOfPopupShowing,
    popupMessage,
    shouldPopupBeFocused
  }
})
