import { INSTEAD_STRING } from '@constants/app'
import { IUser } from '@interfaces/app-user'

export const getDisplayName = (user: Partial<IUser> | null, instead = INSTEAD_STRING) => {
  if (!user || (!user.name && !user.lastName)) return instead
  return `${user.name ?? ''} ${user.lastName ?? ''}`.trim()
}
