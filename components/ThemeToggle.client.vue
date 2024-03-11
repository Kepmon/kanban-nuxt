<template>
  <div
    class="flex items-center justify-center gap-x-6 px-6 py-3 mx-auto w-max bg-white dark:bg-gray-700 rounded-b-3xl"
  >
    <img src="/img/icon-light-theme.svg" alt="" />
    <button
      @click="() => toggleDark()"
      :regularButton="false"
      :aria-label="`Click here to switch the theme from ${
        isDark ? 'dark' : 'light'
      } to ${isDark ? 'light' : 'dark'}`"
      class="toggle-theme purple-class"
    >
      <transition-group name="theme-toggle">
        <div
          key="theme-toggle"
          class="w-[14px] h-[14px] bg-white rounded-full"
          :class="{ 'ml-auto': isDark }"
        ></div>
      </transition-group>
    </button>
    <img src="/img/icon-dark-theme.svg" alt="" />
  </div>
</template>

<script setup lang="ts">
const isDark = useDark()
const toggleDark = useToggle(isDark)
</script>

<style lang="postcss" scoped>
.theme-toggle-move {
  @apply transition-all duration-300;
}

.toggle-theme {
  --padding-x: 0.5rem;
  --padding-y: 0.25rem;
  --width: 2rem;
  @apply box-content rounded-xl;
  @apply px-[var(--padding-x)] py-[var(--padding-y)] w-[var(--width)];
}
</style>
