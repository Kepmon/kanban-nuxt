<template>
  <p
    role="alert"
    data-popup="confirmation"
    class="popup-text"
    :class="popupStore.popupMessage.includes('Success:') && 'opacity-0 scale-0'"
  >
    {{ popupStore.popupMessage }}
  </p>
</template>

<script setup lang="ts">
const popupStore = usePopupStore()
</script>

<style lang="postcss" scoped>
.popup-text {
  @apply fixed inset-0 bottom-auto px-4 py-10 mx-auto w-[min(90%,25rem)];
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
