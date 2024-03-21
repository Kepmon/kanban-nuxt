import { routesSchema } from '~/types/routePaths'

export const checkPathType = (path: string) => {
  const pathParseResponse = routesSchema.safeParse(path)

  return pathParseResponse.success ? pathParseResponse.data : '/'
}
