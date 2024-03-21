import { z } from 'zod'

export const routesSchema = z.enum(['/', '/sign-up', '/dashboard'])
export type Routes = z.infer<typeof routesSchema>
