import { auth, usersColRef } from '../firebase'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut
} from 'firebase/auth'
import { setDoc, doc } from 'firebase/firestore'

type UserData = {
  email: string
  password: string
  repeatPassword: null | string
}

const login = async ({ email, password }: UserData) => {
  return await signInWithEmailAndPassword(auth, email, password)
}

const register = async ({ email, password }: UserData) => {
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

  const submitFn = body.repeatPassword == null ? login : register

  try {
    await submitFn(body)

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
