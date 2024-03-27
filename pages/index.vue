<template>
  <div>
    <auth-template :authSchema="authSchema" />
  </div>
</template>

<script setup lang="ts">
import { z } from 'zod'
import { emailSchema, passwordSchema } from '../schemas/authSchema'

const authSchema = z.intersection(emailSchema, passwordSchema)
const route = useRoute()
const router = useRouter()

definePageMeta({
  middleware: ['navigate']
})

if (process.client) {
  router.push({
    path: route.path,
    query: {}
  })
}

onMounted(() => {
  if (process.client && 'authenticated' in route.query) {
    const popupStore = usePopupStore()
    popupStore.showPopup(
      'Error: Only authenticated users can reach the requested page'
    )
  }
})
</script>
