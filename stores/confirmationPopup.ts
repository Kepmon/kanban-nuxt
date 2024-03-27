export const usePopupStore = defineStore('popup', () => {
  const isPopupShown = ref(false)
  const durationOfPopupShowing = ref(3000)
  const popupMessage = ref('')
  const shouldPopupBeFocused = ref(false)

  const showPopup = (message?: string) => {
    isPopupShown.value = true
    shouldPopupBeFocused.value = true

    if (message != null) {
      popupMessage.value = message
    }

    setTimeout(() => {
      isPopupShown.value = false
      shouldPopupBeFocused.value = false
    }, durationOfPopupShowing.value)
  }

  return {
    isPopupShown,
    durationOfPopupShowing,
    popupMessage,
    shouldPopupBeFocused,
    showPopup
  }
})
