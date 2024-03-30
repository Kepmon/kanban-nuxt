import { logout } from '../utils/auth'

export default defineEventHandler(async (event) => {
  const response = await logout()
  deleteCookie(event, 'userID')

  return response
})
