<template>
  <auth-template :authSchema="authSchema" />
</template>

<script setup lang="ts">
import { z } from 'zod'
import {
  emailSchema,
  passwordSchema,
  repeatPasswordSchema
} from '../schemas/authSchema'

const authSchema = z
  .intersection(emailSchema, passwordSchema)
  .and(repeatPasswordSchema)
  .superRefine((schema, context) => {
    if (schema.repeatPassword !== schema.password) {
      context.addIssue({
        code: 'custom',
        path: ['repeatPassword'],
        message: "Passwords don't match"
      })
    }
  })
</script>
