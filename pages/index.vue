<template>
  <div>
    <auth-template :authSchema="authSchema" />
  </div>
</template>

<script setup lang="ts">
import { z } from 'zod'
import { emailSchema, passwordSchema } from '../schemas/authSchema'

const authSchema = z.intersection(emailSchema, passwordSchema)

definePageMeta({
  middleware: ['navigate']
})
</script>
