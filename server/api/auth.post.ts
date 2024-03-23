import { auth, usersColRef } from '../../firebase'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut
} from 'firebase/auth'
import { setDoc, doc } from 'firebase/firestore'
import { z } from 'zod'

const userSchema = z.object({
  email: z.string().email(),
  password: z.string(),
  repeatPassword: z.string().nullable(),
  path: z.literal('/').or(z.literal('/sign-up'))
})

const login = async ({ email, password }: z.infer<typeof userSchema>) => {
  await signInWithEmailAndPassword(auth, email, password)
}

const register = async ({ email, password }: z.infer<typeof userSchema>) => {
  const registerResponse = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  )

  if (registerResponse == null) throw new Error()

  await setDoc(doc(usersColRef, registerResponse.user.uid), {})
  await signOut(auth)
}

const setPopupMessage = (path: '/' | '/sign-up', errorMessage: string = '') => {
  if (errorMessage !== '') {
    const isCustomMessage =
      errorMessage.includes('auth/wrong-password') ||
      errorMessage.includes('auth/invalid-credential')

    return isCustomMessage
      ? 'The user name or password are incorrect'
      : 'Ooops, something went wrong. Try again later.'
  }

  const successMessages = {
    '/': 'You logged in successfully',
    '/sign-up': 'You signed up successfully'
  }

  return successMessages[path]
}

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const isUserDataOk = userSchema.safeParse(body)

  if (!isUserDataOk.success)
    return {
      ok: false,
      message: setPopupMessage('/', 'wrong-data')
    }

  const validatedBody = isUserDataOk.data
  const submitFn = validatedBody.repeatPassword == null ? login : register

  try {
    await submitFn(validatedBody)

    return {
      ok: true,
      message: setPopupMessage(validatedBody.path)
    }
  } catch (err) {
    return {
      ok: false,
      message: setPopupMessage(validatedBody.path, err.message)
    }
  }
})
