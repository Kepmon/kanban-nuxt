<template>
  <div class="pb-8">
    <transition name="privacy-policy">
      <privacy-policy
        v-if="isPrivacyPolicyShown"
        @close-popup="isPrivacyPolicyShown = false"
        :animationCondition="isPrivacyPolicyShown"
      />
    </transition>

    <transition name="popup">
      <confirmation-popup
        v-if="isPopupShown"
        :isResponseError="isResponseError"
        :errorMessage="errorMessage"
      />
    </transition>

    <theme-toggle />

    <main class="auth-main mt-14">
      <logo-icon class="mb-4 scale-125 sm:scale-150 border-none" />
      <form @submit.prevent="onSubmit" class="form">
        <header class="xs:text-lg first-letter:uppercase">
          <h2>{{ currentPath.action }}</h2>
        </header>

        <auth-input label="Email" name="email" type="email" />
        <auth-input label="Password" name="password" type="password" />
        <auth-input
          v-if="path === '/sign-up'"
          label="Repeat Password"
          name="repeatPassword"
          type="password"
        />

        <button
          class="regular-button purple-class"
          :aria-disabled="
            form.meta.value.valid === false || buttonLoading ? true : false
          "
        >
          {{ buttonLoading ? 'Loading...' : currentPath.action }}
        </button>

        <p class="text-center">
          {{ currentPath.question }}
          <nuxt-link :to="currentPath.goTo" class="purple-text">
            {{ currentPath.linkText }}
          </nuxt-link>
        </p>
      </form>

      <div class="flex flex-wrap justify-center text-sm text-center leading-5">
        <span v-if="path === '/sign-up'"
          >By clicking 'Sign up' you agree to</span
        >&nbsp;
        <button @click="isPrivacyPolicyShown = true" class="purple-text">
          Privacy Policy
        </button>
      </div>
    </main>
    <slot />
  </div>
</template>

<script setup lang="ts">
import { routesSchema } from '~/types/routePaths'
import LogoIcon from '~/components/svgs/LogoIcon.vue'
import AuthInput from '~/components/inputs/AuthInput.vue'
import {
  isPopupShown,
  isResponseError,
  handleResponse
} from '../composables/responseHandler'
import { toTypedSchema } from '@vee-validate/zod'
import { z } from 'zod'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const isDark = useDark()
const isPrivacyPolicyShown = ref(false)

const availablePaths = {
  '/': {
    action: 'Log in',
    goTo: 'sign-up',
    question: "Don't have an account?",
    linkText: 'Create one'
  },
  '/sign-up': {
    action: 'Sign up',
    goTo: '/',
    question: 'Already have an account?',
    linkText: 'Log in'
  }
}

const route = useRoute()
const path = route.path
const currentPath = ref(availablePaths[path as keyof typeof availablePaths])

const authFormSchema = z
  .object({
    email: z
      .string({
        required_error: "Can't be empty"
      })
      .email({ message: 'Must be a valid email' }),
    password: z
      .string({
        required_error: "Can't be empty"
      })
      .min(8, { message: 'Must be at least 8 characters long' }),
    repeatPassword: z.string().optional()
  })
  .superRefine((schemaObj, ctx) => {
    if (path === '/sign-up' && schemaObj.repeatPassword === undefined) {
      ctx.addIssue({
        code: 'too_small',
        type: 'string',
        minimum: 8,
        inclusive: true,
        path: ['repeatPassword'],
        message: "Can't be empty",
        fatal: true
      })

      return z.NEVER
    }

    if (
      path === '/sign-up' &&
      schemaObj.repeatPassword !== schemaObj.password
    ) {
      ctx.addIssue({
        code: 'custom',
        path: ['repeatPassword'],
        message: "Passwords don't match"
      })
    }
  })

const form = useForm({
  validationSchema: toTypedSchema(authFormSchema)
})

const errorMessage = ref('')
const buttonLoading = ref(false)

const onSubmit = form.handleSubmit(async (values) => {
  buttonLoading.value = true

  const response = await $fetch('/api/auth', {
    method: 'POST',
    body: {
      email: values.email,
      password: values.password,
      repeatPassword: 'repeatPassword' in values ? values.repeatPassword : null
    }
  })

  if (!response.ok) {
    errorMessage.value = response.responseError
  }

  buttonLoading.value = false
  checkForCurrentPath(response.ok)
})

const checkForCurrentPath = (response: boolean) => {
  const route = useRoute()
  const pathValidation = routesSchema.safeParse(route.path)

  const currentPath = pathValidation.success ? pathValidation.data : undefined
  handleResponse(response, currentPath, buttonLoading)
}
</script>

<style lang="postcss" scoped>
.form {
  @apply grid gap-6 relative p-6 w-[90%] sm:w-[480px];
  @apply rounded-md bg-white dark:bg-gray-700;
}

.purple-text {
  @apply block mx-auto relative w-max text-purple-400 cursor-pointer;
  @apply after:absolute after:-bottom-1 after:left-0 after:h-[3px];
  @apply after:w-full after:bg-purple-400 after:scale-x-0;
  @apply hover:after:scale-x-100 focus-visible:after:scale-x-100;
  @apply after:origin-left after:transition-transform after:duration-300 outline outline-transparent;
}

.privacy-policy-enter-from,
.privacy-policy-leave-to {
  @apply opacity-0;
}

.privacy-policy-enter-active,
.privacy-policy-leave-active {
  @apply transition-opacity duration-500;
}
</style>
