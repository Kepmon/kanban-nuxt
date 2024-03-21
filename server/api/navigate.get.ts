import { auth } from '../../firebase'

export default defineEventHandler(() => auth.currentUser?.uid)
