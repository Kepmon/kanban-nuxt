import { auth, usersColRef } from '../firebase'
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
  repeatPassword: z.string().nullable()
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

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  const isUserDataOk = userSchema.safeParse(body)

  if (!isUserDataOk.success)
    return {
      ok: false,
      responseError: 'wrong-data'
    }

  const validatedBody = isUserDataOk.data
  const submitFn = validatedBody.repeatPassword == null ? login : register

  try {
    await submitFn(validatedBody)

    return {
      ok: true,
      responseError: ''
    }
  } catch (err) {
    return {
      ok: false,
      responseError: 'sth-went-wrong'
    }
  }
})
