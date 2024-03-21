<template>
  <div>
    <p>Dashboard</p>
    <button @click="logout">Log Out</button>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: ['navigate']
})

useDark()

const logout = async () => {
  const response = await $fetch('/api/auth')

  if (response) navigateTo('/')
}
</script>
