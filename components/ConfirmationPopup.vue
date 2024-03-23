<template>
  <p
    id="confirmation-popup"
    ref="confirmationPopup"
    tabindex="-1"
    data-popup="confirmation"
    class="popup-text"
  >
    {{ popupStore.popupMessage }}
  </p>
</template>

<script setup lang="ts">
const popupStore = usePopupStore()
const confirmationPopup = ref<HTMLParagraphElement | null>(null)

onMounted(() => {
  if (popupStore.shouldPopupBeFocused && confirmationPopup.value != null) {
    confirmationPopup.value.focus()

    setTimeout(() => {
      confirmationPopup.value?.blur()
    }, popupStore.durationOfPopupShowing)
  }
})
</script>

<style lang="postcss" scoped>
.popup-text {
  @apply fixed inset-0 bottom-auto py-10 mx-auto w-[min(90%,25rem)];
  @apply translate-y-8 text-center text-gray-900 bg-red-400 rounded-xl z-[100];
}

.popup-enter-from,
.popup-leave-to {
  @apply -translate-y-[1000px];
}

.popup-enter-active,
.popup-leave-active {
  @apply transition-transform duration-1000;
}
</style>
