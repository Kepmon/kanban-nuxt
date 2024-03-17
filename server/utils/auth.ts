import { signOut } from 'firebase/auth'
import { auth } from '~/firebase'

export const logout = async () => {
  try {
    await signOut(auth)
    return true
  } catch (err) {
    return false
  }
}
