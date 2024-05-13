export const usePopupStore = defineStore('popup', () => {
  const isPopupShown = ref(false)
  const durationOfPopupShowing = ref(3000)
  const popupMessage = ref('')

  const showPopup = (message?: string) => {
    isPopupShown.value = true

    if (message != null) {
      popupMessage.value = message
    }

    setTimeout(() => {
      isPopupShown.value = false
      popupMessage.value = ''
    }, durationOfPopupShowing.value)
  }

  return {
    isPopupShown,
    popupMessage,
    showPopup
  }
})
