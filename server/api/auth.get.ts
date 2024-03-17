import { logout } from '../utils/auth'

export default defineEventHandler(async () => await logout())
