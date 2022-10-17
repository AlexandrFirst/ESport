import { INSTEAD_STRING } from '@constants/app'
import { Nullable } from '@interfaces/nullable'

export const validateStr = (str: Nullable<string>, instead = INSTEAD_STRING) => {
  return str ?? instead
}
