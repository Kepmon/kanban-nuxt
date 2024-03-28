<template>
  <div>
    <transition name="popup">
      <confirmation-popup
        v-if="popupStore.isPopupShown && popupStore.popupMessage !== ''"
      />
    </transition>

    <NuxtPage />
  </div>
</template>

<script setup lang="ts">
const popupStore = usePopupStore()
</script>
